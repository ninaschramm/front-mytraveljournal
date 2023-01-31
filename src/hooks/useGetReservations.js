import useAsync from './useAsync';
import useToken from './useToken';
import * as reservationsApi from '../api/reservationsApi';

export default function useGetReservations() {
  const token = useToken();

  const {
    data: reservations,
    loading: reservationsLoading,
    error: reservationsError,
    act: getReservations,
  } = useAsync((tripId) => reservationsApi.getReservations(token, tripId));

  return {
    reservations,
    reservationsLoading,
    reservationsError,
    getReservations
  };
}
//
