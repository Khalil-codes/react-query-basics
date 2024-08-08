import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedPosts, Post } from "../services/posts";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Page {
  posts: Post[];
  prevPage?: number;
  nextPage?: number;
}

const InfiniteScrolling = () => {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["posts", { infinite: true, scroll: true }],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: ({ pageParam = 1 }) => {
      console.log({ pageParam });
      return getPaginatedPosts(pageParam as number, 10);
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("Component in View. Loading next posts");
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className="font-bold text-xl">Infinite Scrolling (auto load)</h1>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mb-4">
        {data?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>
      <div ref={ref}>
        {isFetchingNextPage
          ? "Loading"
          : !hasNextPage
          ? "You have reached the end"
          : ""}
      </div>
    </div>
  );
};

export default InfiniteScrolling;
