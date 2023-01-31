import api from './api';

export async function getPosts(token, tripId) {
    const response = await api.get(`/posts/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

export async function addPost(token, tripId, body) {
    const response = await api.post(`/posts/${tripId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}

export async function removePost(token, tripId, postId) {
    const response = await api.delete(`/posts/${tripId}/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}