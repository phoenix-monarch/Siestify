import instance from "./instance";

const GenresHomeQuery = async () => {
  const { data } = await instance.get("/hub/getHome");

  return data.data;
};

export const GenresDetailsQuery = async (id) => {
  const { data } = await instance.get("/hub/getDetail", { params: { id } });

  return data.data;
};

export default GenresHomeQuery;
