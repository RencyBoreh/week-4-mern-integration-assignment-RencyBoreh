import API from '../api';

export const getAllSkills = async () => {
  const res = await API.get('/skills');
  return res.data;
};

export const addSkill = async (skillData) => {
  const res = await API.post('/skills', skillData);
  return res.data;
};

export const rateSkill = async (skillId, rating) => {
  const res = await API.post(`/skills/${skillId}/rate`, { rating });
  return res.data;
};
