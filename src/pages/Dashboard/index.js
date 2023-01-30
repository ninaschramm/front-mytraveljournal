import styled from 'styled-components';
import Card from '../../components/Card';
import CardBox from '../../components/CardBox';
import { useState, useEffect } from 'react';
import useGetTravels from '../../hooks/useGetTravels';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AddButton from '../../components/AddButton';
import Form from '../../components/Form';
import useAddTravel from '../../hooks/useAddTravel';
import { FaTrash } from 'react-icons/fa';
import useRemoveTravel from '../../hooks/useRemoveTravel';

export default function Dashboard() { 

  const { getTravels } = useGetTravels();
  const { addTravel } = useAddTravel();
  const { removeTravel } = useRemoveTravel();
  const [travelList, setTravelList] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const travels = await getTravels();    
      setTravelList(travels);
    }
    try {      
    fetchData();
    }
    catch(err) {
      toast("Ops, something went wrong")
    }
  }, [refresh]);
  
  const navigate = useNavigate();

  const handleClick = (target) => {
    const id = target.id;
    navigate(`/dashboard/${id}`);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStartDateError('');
    setEndDateError('');
  };

  const validateDates = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      setStartDateError('Invalid start date format');
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      setEndDateError('Invalid end date format');
      return false;
    }
    return true;
  };

  async function handleSubmit(e){
    e.preventDefault();
    if (!validateDates()) {
      toast('The dates should be in format YYYY-MM-DD')
      return;
    }
    const data = {
      title,
      startDate,
      endDate
    }
    try {
      await addTravel(data);
      toast("Travel added")
    }
    catch(err) {
      toast(err.message)
    }
    setStartDate('');
    setEndDate('');
    setTitle('');
    setRefresh(!refresh)
    handleCloseModal();
  };

  async function deleteTravel(target) {
    try {
      await removeTravel(target.id)
      setRefresh(!refresh);
    }
    catch(err) {
      toast(err.message)
    }
  }

  return (
    <> 
    { showModal ?
      <Card>
        <h1>Trip Information:</h1>
        <Form onSubmit={handleSubmit}>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            {startDateError && <div style={{ color: 'red' }}>{startDateError}</div>}
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            {endDateError && <div style={{ color: 'red' }}>{endDateError}</div>}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <button type="submit">Submit</button>
            <button onClick={handleCloseModal}>Close</button>
          </Form>
      </Card> :
       <Card>     
       <h1>My Travel Journal</h1>  
       <Container>
       {travelList && travelList.map((travel, index) => 
       <CardBox key={index} id={travel.id} onClick={(e) => handleClick(e.target)}>
         {travel.title} <FaTrash id={travel.id} onClick={(e) => deleteTravel(e.currentTarget)}/>
       </CardBox>
       )}
       </Container>     
       <AddButton onClick={handleOpenModal}>Add Trip</AddButton>
     </Card>     
    }
     
    </>
  );
}


{/* <Card>
<h1>My Travel Journal</h1>  
<Container>
<Link to="/signin">
  <CardBox reservation={false}>My Journal</CardBox>
</Link>    
<Link to="/signin">
  <CardBox reservation={true}>My Reservations</CardBox>
</Link>          
</Container>          
</Card>      */}

const Container = styled.div`
  width: 320px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  overflow-y: auto;
  max-height: 250px;
`;