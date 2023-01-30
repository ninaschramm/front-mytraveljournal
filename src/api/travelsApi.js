import api from './api';

export async function getTravels(token) {
    const response = await api.get(`/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

export async function addTravel(token, body) {
    const response = await api.post(`/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
}
//