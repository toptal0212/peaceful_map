import "dotenv/config";

export default ({ config }: any) => {
  return {
    ...config,
    extra: {
      MAPBOXTOKEN: process.env.MAPBOXTOKEN,
      ORSMTOKEN: process.env.ORSMTOKEN,
    },
  };
};