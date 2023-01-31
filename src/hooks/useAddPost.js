import useAsync from './useAsync';
import useToken from './useToken';
import * as postsApi from '../api/postsApi';

export default function useAddPost() {
  const token = useToken();

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    act: addPost,
  } = useAsync((tripId, body) => postsApi.addPost(token, tripId, body));

  return {
    posts,
    postsLoading,
    postsError,
    addPost
  };
}
//
