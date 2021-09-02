import instance from "./instance";

const AlbumQuery = async (id) => {
  const { data } = await instance.get("/playlist/getDetail", {
    params: { id },
  });

  return data.data;
};

export default AlbumQuery;
