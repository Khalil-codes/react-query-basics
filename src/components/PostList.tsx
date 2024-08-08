import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/posts";
import PostCard from "./PostCard";

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
      <div className="flex flex-col gap-3">
        {data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
