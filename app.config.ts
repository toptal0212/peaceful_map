import "dotenv/config";

export default ({ config }: any) => {
  return {
    ...config,
    extra: {
      MAPBOXTOKEN: process.env.MAPBOXTOKEN,
      OSRMTOKEN: process.env.OSRMTOKEN,
    },
  };
};