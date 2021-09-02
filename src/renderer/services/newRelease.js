import instance from "./instance";

const NewReleaseQuery = async () => {
  const { data } = await instance.get("/chart/getNewReleaseChart");

  return data.data;
};

export default NewReleaseQuery;
