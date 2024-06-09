import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api';

export const getAllClients = async () => {
    try {
        const response = await axios.get('/clients/all');
        return response.data;
    } catch (error) {
        console.log('GET ALL CLIENTS ERROR');
        console.error(error);
        throw error;
    }
};

export const clientLogEmail = async (data) => {
    try {
        console.log(data);
        const response = await axios.post('/clients/login', data);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404 && error.response?.data?.error === 'Client not found') {
            alert('Нема такого користувача');
        } else {
            console.log('GET CLIENT ERROR');
            console.error(error);
        }
        throw error;
    }
};

export const addClient = async (client) => {
    try {
        console.log(client);
        const response = await axios.post('/clients/new', client);
        return response.data;
    } catch (error) {
        if (error.response?.status === 409 && error.response?.data?.error === 'Email already exists') {
            alert('Емейл вже зайнятий');
        } else {
            console.log('ADD CLIENT ERROR');
            console.error(error);
            alert('Помилка в реєстрації');
        }
        throw error;
    }
};

export const getClientById = async (clientId) => {
    try {
        const response = await axios.get(`/clients/${clientId}`);
        return response.data;
    } catch (error) {
        console.log('GET CLIENT BY ID ERROR');
        console.error(error);
        throw error;
    }
};

export const getClientByEmail = async (email) => {
    try {
        const response = await axios.get(`/clients/email/${email}`);
        return response.data;
    } catch (error) {
        console.log('GET CLIENT BY EMAIL ERROR');
        console.error(error);
        throw error;
    }
};
