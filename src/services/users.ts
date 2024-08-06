import axios from "./axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const getUsers = async (limit: number = 5) => {
  const { data } = await axios.get<User[]>("/posts/", {
    params: { _limit: limit },
  });

  return data;
};

export const getUser = async (id: number) => {
  const { data } = await axios.get<User>(`/users/${id.toString()}`);

  return data;
};
