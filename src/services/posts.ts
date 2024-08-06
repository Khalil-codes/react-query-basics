import axios from "./axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = async (limit: number = 5) => {
  const { data } = await axios.get<Post[]>("/posts/", {
    params: { _limit: limit },
  });

  return data;
};

export const getPost = async (id: number) => {
  const { data } = await axios.get<Post>(`/posts/${id.toString()}`);

  return data;
};

export const getPaginatedPosts = async (
  page: number = 1,
  limit: number = 10
) => {
  const { data } = await axios.get<Post[]>("/posts/", {
    params: { _page: page, _per_page: limit },
  });

  return data;
};

export const createPost = async (body: Pick<Post, "body" | "title">) => {
  const { data } = await axios.post<Post>("/posts/", body);

  return data;
};
