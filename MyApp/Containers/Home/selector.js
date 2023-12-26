export const HomeSelector = state => {
  const loading = state.home.loading;
  const Data = state.home.data;
  return {
    loading,
    Data,
  };
};
