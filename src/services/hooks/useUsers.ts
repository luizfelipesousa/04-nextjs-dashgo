import { useQuery, QueryClient } from "react-query";
import { api } from "../api";

export const queryClient = new QueryClient();

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GetUserProps = {
  total: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUserProps> {
  const { data, headers } = await api.get("users", {
    params: {
      page,
    },
  });

  const total = Number(headers["x-total-count"]);

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    total,
    users,
  };
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 60 * 10 * 1000,
  });
}
