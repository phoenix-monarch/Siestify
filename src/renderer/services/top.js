import instance from "./instance";

const TopQuery = async () => {
  const { data } = await instance.get("/top100");

  return data.data;
};

export default TopQuery;
