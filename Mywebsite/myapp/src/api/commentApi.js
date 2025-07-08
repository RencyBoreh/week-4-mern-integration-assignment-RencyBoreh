import API from '../api';

export const addComment = async (skillId, text) => {
  const res = await API.post(`/comments/${skillId}`, { text });
  return res.data;
};

export const getComments = async (skillId) => {
  const res = await API.get(`/comments/${skillId}`);
  return res.data;
};
