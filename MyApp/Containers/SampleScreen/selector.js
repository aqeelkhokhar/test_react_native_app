export const SampleSelector = state => {
  const loading = state.sample?.loading;
  const Data = state.sample?.data;
  return {
    loading,
    Data,
  };
};
