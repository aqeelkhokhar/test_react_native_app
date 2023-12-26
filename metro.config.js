module.exports = (async () => {
  return {
    resolver: {
      sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'], // for gluestack ui support
    },
    resetCache: true,
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  };
})();
