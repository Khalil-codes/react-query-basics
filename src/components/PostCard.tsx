import { Post } from "../services/posts";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div
      className="border p-2 bg-blue-400/30 rounded odd:bg-red-500/30"
      key={post.id}
    >
      {post.id} - {post.title}
    </div>
  );
};

export default PostCard;
