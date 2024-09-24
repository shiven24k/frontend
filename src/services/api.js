import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await api.post('/caption', formData);
  return response.data;
};

export default api;