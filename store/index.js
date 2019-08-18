export const state = () => ({
  userId: 1
});

export const getters = () => ({
  getUserId: state => state.userId,
});

