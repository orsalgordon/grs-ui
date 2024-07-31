import axios from "axios";

const REST_API_HOST_URL = 'http://localhost:8080/rest/v1/host';

export const hostDetails = (hostId) => axios.get(REST_API_HOST_URL + '/' + hostId);

export const signIn = (host) => axios.post(REST_API_HOST_URL, host);

export const loginRequest = (request) => axios.post(REST_API_HOST_URL + '/login', request);
