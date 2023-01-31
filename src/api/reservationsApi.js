import api from './api';

export async function getReservations(token, tripId) {
    const response = await api.get(`/reservations/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

export async function addReservation(token, tripId, body) {
    const response = await api.post(`/reservations/${tripId}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}

export async function removeReservation(token, tripId, reservationId) {
    const response = await api.delete(`/reservations/${tripId}/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
}