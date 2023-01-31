import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/Card';
import PostCard from '../../components/PostCard';
import useGetTravelById from '../../hooks/useGetTravelById';
import { toast } from 'react-toastify';
import AddButton from '../../components/AddButton';
import Form from '../../components/Form';
import { FaTrash, FaBackward } from 'react-icons/fa';
import useGetReservations from '../../hooks/useGetReservations';
import useRemoveReservation from '../../hooks/useRemoveReservation';
import useAddReservation from '../../hooks/useAddReservation';
import * as Select from '@radix-ui/react-select';


export default function Reservations() {

	const { getReservations } = useGetReservations();
    const { getTravelById } = useGetTravelById();
    const { removeReservation } = useRemoveReservation();
    const { addReservation } = useAddReservation();
	const { tripId } = useParams();
    const [reservationsList, setReservationsList] = useState(null);
    const [travelInfo, setTravelInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [selectedReservationType, setSelectedReservationType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          const reservations = await getReservations(tripId);    
          setReservationsList(reservations);
          const travel = await getTravelById(tripId);    
		setTravelInfo(travel);
        }
        try {      
        fetchData();
        }
        catch(err) {
          toast("Ops, something went wrong")
        }
      }, [refresh]);

    const handleOpenModal = () => {
    setShowModal(true);
    };

    const handleCloseModal = () => {
    setShowModal(false);
    setCode('');
    setTitle('');
    };      

    async function handleSubmit(e){
    e.preventDefault();
        
        const data = {
          code,
          title,
          type: selectedReservationType
        }
        console.log(data)

        try {
          await addReservation(tripId, data);
          toast("Reservation added")
        }
        catch(err) {
          toast(err.message)
        }
        setRefresh(!refresh)
        handleCloseModal();
      };

    async function deleteReservation(target){
        const reservationId = target.id;        

        try {
            await removeReservation(tripId, reservationId)
            setRefresh(!refresh);
          }
          catch(err) {
            toast(err.message)
          }
    }

    const goBack = () => {
		navigate(-1);
	}
      
    const handleReservationTypeChange = (event) => {
        setSelectedReservationType(event.target.value);
    };

	return (        
		<Card>  
              { showModal ?      
                <>
                <h1>New reservation:</h1>
                <Form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title" />
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Reservation Code" />
                    <select required value={selectedReservationType} onChange={handleReservationTypeChange}>
                        <option value="" disabled selected>Select The Type of Reservation</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Transport">Transport</option>
                        <option value="Ticket">Ticket</option>
                        <option value="Other">Other</option>
                    </select>
                    <button type="submit">Submit</button>
                    <button onClick={handleCloseModal}>Close</button>
                </Form></>
          :          
                travelInfo && 
                <>
                    <h1>My Travel Journal</h1>  
                    <h2>{travelInfo.title}</h2>		
                    <Container>
                        {reservationsList && reservationsList.map((reservation, index) => 
                            <PostCard key={index} id={reservation.id}>
                                <div className='icon'>
                                    <FaTrash id={reservation.id} onClick={(e) => deleteReservation(e.currentTarget)}/>
                                </div>
                                <p>{reservation.code}</p>
                                <h3>{reservation.title}</h3>
                                <p>type: {reservation.type}</p>
                            </PostCard>
                        )}
                    </Container>
                    <AddButton onClick={handleOpenModal}>Add Reservation</AddButton>
                    <div onClick={goBack}>
                    < FaBackward /> Voltar
                    </div>
                </>			
                }
		</Card>    
	);
}

const Container = styled.div`
  width: 320px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 330px;
`