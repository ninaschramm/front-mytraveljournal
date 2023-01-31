import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/Card';
import CardBox from '../../components/CardBox';
import useGetTravelById from '../../hooks/useGetTravelById';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export default function Home() {

	const [travelInfo, setTravelInfo] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const { getTravelById } = useGetTravelById();
	const { tripId } = useParams();

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

	return (
		<Card>
			{ travelInfo ? 
			<>
				<h1>My Travel Journal</h1>  
				<h2>{travelInfo.title}</h2>				
				{startDate} - {endDate}
				<Container>
					<CardBox reservation={false}>My Journal</CardBox>
					<CardBox reservation={true}>My Reservations</CardBox>
				</Container>  
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
  max-height: 250px;
`;