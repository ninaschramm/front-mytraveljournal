import useAsync from './useAsync';
import useToken from './useToken';
import * as travelsApi from '../api/travelsApi';

export default function useAddTravel() {
  const token = useToken();

  const {
    data: travel,
    loading: travelLoading,
    error: travelError,
    act: addTravel,
  } = useAsync((body) => travelsApi.addTravel(token, body));

  return {
    travel,
    travelLoading,
    travelError,
    addTravel
  };
}
//
