import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/Card';
import CardBox from '../../components/CardBox';
import useGetTravelById from '../../hooks/useGetTravelById';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { FaBackward } from 'react-icons/fa';

export default function Home() {

	const [travelInfo, setTravelInfo] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const { getTravelById } = useGetTravelById();
	const { tripId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const travel = await getTravelById(tripId);    
			setTravelInfo(travel);
			setStartDate(dayjs(travel.startsAt).format('DD/MM/YYYY'))
			setEndDate(dayjs(travel.endsAt).format('DD/MM/YYYY'))
		  }
		  try {      
		  fetchData();
		  }
		  catch(err) {
			toast("Ops, something went wrong")
		  }
	}, [])

	const handleClick = (target) => {
		if (target.id === "0") {
			navigate(`journal`);
		}
		else if (target.id === "1") {
			navigate(`reservations`);
		}
		else {
			toast("Ops, something went wrong here")
			navigate(`/dashboard`)
		}
	  };

	return (
		<Card>
			{ travelInfo ? 
			<>
				<h1>My Travel Journal</h1>  
				<div><h2>{travelInfo.title}</h2>	
  				{'\n'}	
				{startDate} - {endDate}</div>
				<Container>
					<CardBox id={0} onClick={(e) => handleClick(e.currentTarget)}>My Journal</CardBox>
					<CardBox id={1} onClick={(e) => handleClick(e.currentTarget)}>My Reservations</CardBox>
				</Container>  
				<Link to='/dashboard'>< FaBackward /> Voltar</Link>
			</>			
			  :
			"Ops, parece que você tentou acessar um endereço errado."      }
		</Card>    
	);
}

const Container = styled.div`
  width: 320px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  overflow-y: auto;
  height: 250px;

  a {
	font-size: 16px;
	margin-top: 10px;
  }
`;