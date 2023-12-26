export const GlobalSelector = state => {
  const loading = state.global.loading;
  return {
    loading,
  };
};
