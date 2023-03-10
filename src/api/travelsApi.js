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

export async function removeTravel(token, tripId) {
    const response = await api.delete(`/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
    });
    return response.data;
}

export async function getTravelById(token, tripId){
    const response = await api.get(`/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
//