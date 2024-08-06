import axios from "./axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = async (limit: number = 5) => {
  const { data } = await axios.get<Post[]>("/posts/", {
    params: { _limit: limit, _sort: "title" },
  });

  return data;
};

export const getPost = async (id: number) => {
  const { data } = await axios.get<Post>(`/posts/${id.toString()}`);

  return data;
};

export const getPaginatedPosts = async (
  page: number = 1,
  limit: number = 3
) => {
  const { data, headers } = await axios.get<Post[]>("/posts/", {
    params: { _page: page, _limit: limit },
  });

  const total = parseInt(headers["x-total-count"]);
  const hasNext = page * limit <= total;

  return {
    totalPages: Math.ceil(total / limit),
    nextPage: hasNext ? page + 1 : undefined,
    prevPage: page > 1 ? page - 1 : undefined,
    posts: data,
  };
};

export const createPost = async (body: Pick<Post, "body" | "title">) => {
  const { data } = await axios.post<Post>("/posts/", { ...body, userId: 2 });

  return data;
};
