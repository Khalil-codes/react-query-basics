import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services/posts";
import { getUser } from "../services/users";

const Post = ({ id }: { id: number }) => {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["users", post?.userId],
    enabled: post?.userId != null,
    queryFn: () => getUser(post?.userId as number),
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="font-bold text-xl">{post?.title}</h1>
      <p>
        By:{" "}
        <b>
          {isUserLoading
            ? "Loading User"
            : userError
            ? "Error Occured while fetching user"
            : user?.name}
        </b>
      </p>
      <p>{post?.body}</p>
    </div>
  );
};

export default Post;
