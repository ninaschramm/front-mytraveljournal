import api from './api';

export async function signUp(email, password, username, confirmPassword) {
  const response = await api.post('/signup', { email, password, username, confirmPassword });
  return response.data;
}
//
