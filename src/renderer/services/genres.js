import instance from "./instance";

const GenresHomeQuery = async () => {
  const { data } = await instance.get("/hub/getHome");

  return data.data;
};

export default GenresHomeQuery;
