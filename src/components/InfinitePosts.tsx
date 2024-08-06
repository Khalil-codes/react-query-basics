import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedPosts, Post } from "../services/posts";
import Button from "./Button";

interface Page {
  posts: Post[];
  prevPage?: number;
  nextPage?: number;
}

const InfinitePosts = () => {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<Page, Error>({
    queryKey: ["posts", { infinite: true }],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: ({ pageParam = 1 }) => {
      console.log({ pageParam });
      return getPaginatedPosts(pageParam as number);
    },
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className="font-bold text-xl">Infinite Scrolling</h1>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mb-4">
        {data?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
            <div
              className="border p-2 border-blue-400 rounded odd:border-red-500"
              key={post.id}
            >
              {post.id} - {post.title}
            </div>
          ))}
        <Button
          onClick={() => {
            fetchNextPage();
          }}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InfinitePosts;
