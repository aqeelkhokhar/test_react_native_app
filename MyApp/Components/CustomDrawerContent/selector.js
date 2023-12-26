export const DrawerSelector = state => {
  const loading = state.drawer?.loading;
  const Data = state.drawer?.data;
  const token = state.drawer?.token;
  return {
    loading,
    Data,
    token,
  };
};
