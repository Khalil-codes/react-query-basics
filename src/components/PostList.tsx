import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/posts";

interface Props {
  limit?: number;
}

const PostList = ({ limit = 5 }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(limit),
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="font-bold text-xl">Post List</h1>
      <hr className="my-4" />
      <ol className="list-decimal mx-5">
        {data?.map((post) => (
          <li>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostList;
