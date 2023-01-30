import api from './api';

export async function getTravels(token) {
    const response = await api.get(`/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
//