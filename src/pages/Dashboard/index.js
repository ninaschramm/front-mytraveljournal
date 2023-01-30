import styled from 'styled-components';
import Card from '../../components/Card';
import CardBox from '../../components/CardBox';
import { useState, useEffect } from 'react';
import useGetTravels from '../../hooks/useGetTravels';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AddButton from '../../components/AddButton';
import Form from '../../components/Form';

export default function Dashboard() { 

  const { getTravels } = useGetTravels();
  const [travelList, setTravelList] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');

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
  }, []);
  
  const navigate = useNavigate();

  const handleClick = (target) => {
    const id = target.id;
    navigate(`/${id}`);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateDates()) {
      toast('The dates should be in format YYYY-MM-DD')
      return;
    }
    // Perform any actions you need with the form data
    setStartDate('');
    setEndDate('');
    setTitle('');
    handleCloseModal();
  };

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
       <CardBox key={index} id={travel.id} onClick={(e) => handleClick(e.currentTarget)}>
         {travel.title}
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