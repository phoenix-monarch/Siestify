import instance from "./instance";

const StreamingQuery = async (id) => {
  const { data } = await instance.get("/song/getStreaming", { params: { id } });

  return data.data;
};

export default StreamingQuery;
