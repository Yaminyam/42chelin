import client from './client';
import { getCookie } from '../../common/Cookie';

export const writeReview = (request) =>
  client.post(`/store/${request.storeID}/review`, request);

export const searchStore = ({ storeName, lastEvaluatedKey }) =>
  client.get(`store/search`, {
    params: {
      storeName: storeName,
      lastEvaluatedKey,
    },
  });

export const getStoreDetail = (request) =>
  client.get(`/store/${request.storeID}/`, {
    params: {
      clusterName: request.clusterName,
      storeAddress: request.storeAddress,
    },
  });

export const fetchRandomStore = () => client.get(`/store/random`);

export const toggleLikeStore = (request) => {
  const { clusterName, isLike } = request;
  return client.put(`/store/${request.storeID}/like`, {
    clusterName: clusterName,
    isLike: isLike,
  });
};
