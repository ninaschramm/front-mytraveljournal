import useAsync from './useAsync';
import useToken from './useToken';
import * as postsApi from '../api/postsApi';

export default function useGetPosts() {
  const token = useToken();

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    act: getPosts,
  } = useAsync((tripId) => postsApi.getPosts(token, tripId));

  return {
    posts,
    postsLoading,
    postsError,
    getPosts
  };
}
//
