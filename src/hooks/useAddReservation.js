import useAsync from './useAsync';
import useToken from './useToken';
import * as reservationsApi from '../api/reservationsApi';

export default function useAddReservation() {
  const token = useToken();

  const {
    data: reservations,
    loading: reservationsLoading,
    error: reservationsError,
    act: addReservation,
  } = useAsync((tripId, body) => reservationsApi.addReservation(token, tripId, body));

  return {
    reservations,
    reservationsLoading,
    reservationsError,
    addReservation
  };
}
//
