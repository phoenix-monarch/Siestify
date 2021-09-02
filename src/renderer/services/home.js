import instance from "./instance";

const HomeQuery = async (page) => {
  const { data } = await instance.get("/home", { params: { page } });

  const { hasMore } = data.data;

  page = Number(page);

  return { ...data.data, nextPage: hasMore ? page + 1 : page };
};

export default HomeQuery;
