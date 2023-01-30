import useAsync from './useAsync';
import useToken from './useToken';
import * as travelsApi from '../api/travelsApi';

export default function useRemoveTravel() {
  const token = useToken();

  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    act: removeTravel,
  } = useAsync((tripId) => travelsApi.removeTravel(token, tripId));

  return {
    travel,
    travelLoading,
    travelError,
    removeTravel
  };
}
//
