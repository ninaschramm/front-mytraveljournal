import useAsync from './useAsync';
import useToken from './useToken';
import * as travelsApi from '../api/travelsApi';

export default function useGetTravelById() {
  const token = useToken();

  const {
    data: travels,
    loading: travelsLoading,
    error: travelsError,
    act: getTravelById,
  } = useAsync((tripId) => travelsApi.getTravelById(token, tripId));

  return {
    travels,
    travelsLoading,
    travelsError,
    getTravelById
  };
}
//
