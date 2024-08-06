import Base from "./components/Base";
import Post from "./components/Post";
import PostList from "./components/PostList";
import PaginatedPostList from "./components/PaginatedPostList";
import InfinitePosts from "./components/InfinitePosts";

function App() {
  return (
    <main className="container max-w-xl mx-auto my-4 flex flex-col gap-4">
      <h1 className="font-bold text-3xl p-4 border rounded text-center">
        React Query
      </h1>
      <Base title={"Basic Usage"} component={<PostList limit={10} />} />
      <Base
        title="Dependent Queries using enabled property"
        component={<Post id={1} />}
      />
      <Base title="Paginated Queries" component={<PaginatedPostList />} />
      <Base title="Infinite Scrolling" component={<InfinitePosts />} />
    </main>
  );
}

export default App;
