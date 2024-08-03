import axios from "axios";

const REST_API_GIFT_URL = 'http://localhost:8080/rest/v1/gift';

export const createGift = (gift) => axios.post(REST_API_GIFT_URL, gift);

export const fetchGift = (giftId) => axios.get(REST_API_GIFT_URL + '/' + giftId);

export const updateGift = (giftId, gift) => axios.patch(REST_API_GIFT_URL + '/' + giftId, gift);

export const deleteGift = (giftId) => axios.delete(REST_API_GIFT_URL + '/' + giftId);

export const updateGiftAvailability = (giftId, request) => axios.post(REST_API_GIFT_URL + '/' + giftId, request);