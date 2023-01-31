import useAsync from './useAsync';
import useToken from './useToken';
import * as reservationsApi from '../api/reservationsApi';

export default function useRemoveReservation() {
  const token = useToken();

  const {
    data: reservations,
    loading: reservationsLoading,
    error: reservationsError,
    act: removeReservation,
  } = useAsync((tripId, body) => reservationsApi.removeReservation(token, tripId, body));

  return {
    reservations,
    reservationsLoading,
    reservationsError,
    removeReservation
  };
}
//
