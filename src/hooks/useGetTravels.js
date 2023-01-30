import useAsync from './useAsync';
import useToken from './useToken';
import * as travelsApi from '../api/travelsApi';

export default function useGetTravels() {
  const token = useToken();

  const {
    data: travels,
    loading: travelsLoading,
    error: travelsError,
    act: getTravels,
  } = useAsync(() => travelsApi.getTravels(token));

  return {
    travels,
    travelsLoading,
    travelsError,
    getTravels
  };
}
//
