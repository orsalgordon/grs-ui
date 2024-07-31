import axios from "axios";

const REST_API_EVENT_URL = 'http://localhost:8080/rest/v1/event';

export const eventList = (hostId) => axios.get(REST_API_EVENT_URL + '/' + hostId);

export const createEvent = (event) => axios.post(REST_API_EVENT_URL, event);

export const fetchEventById = (eventId) => axios.get(REST_API_EVENT_URL + '/' + eventId + '/gifts');

export const updateEvent = (eventId, event) => axios.patch(REST_API_EVENT_URL + '/' + eventId, event);

export const deleteEvent = (eventId) => axios.delete(REST_API_EVENT_URL + '/' + eventId);