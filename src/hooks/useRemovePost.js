import useAsync from './useAsync';
import useToken from './useToken';
import * as postsApi from '../api/postsApi';

export default function useRemovePost() {
  const token = useToken();

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    act: removePost,
  } = useAsync((tripId, body) => postsApi.removePost(token, tripId, body));

  return {
    posts,
    postsLoading,
    postsError,
    removePost
  };
}
//
