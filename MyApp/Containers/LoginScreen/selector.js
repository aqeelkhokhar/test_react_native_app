export const LoginScreenSelector = state => {
  const loading = state.login?.loading;
  const Data = state.login?.data;
  return {
    loading,
    Data,
  };
};
