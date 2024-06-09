import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api';

export const adminLogEmail = async (data) => {
  try {
    console.log(data);
    const response = await axios.post('/admin/login', data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404 && error.response?.data?.error === 'Admin not found') {
      alert('Нема такого адміністратора');
    } else {
      console.log('GET ADMIN ERROR');
      console.error(error);
    }
    throw error;
  }
};

