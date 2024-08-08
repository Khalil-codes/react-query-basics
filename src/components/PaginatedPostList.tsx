import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPaginatedPosts } from "../services/posts";
import Button from "./Button";
import PostCard from "./PostCard";

const PaginatedPostList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", "page", page],
    queryFn: () => getPaginatedPosts(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className="font-bold text-xl">Post List: Page: {page}</h1>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mb-4">
        {data?.posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setPage((p) => p - 1);
          }}
          disabled={!data?.prevPage}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            setPage((p) => p + 1);
          }}
          disabled={!data?.nextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginatedPostList;
