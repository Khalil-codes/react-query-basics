import { FormEvent } from "react";
import Input from "./Input";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, Post } from "../services/posts";

const CreatePost = () => {
  const client = useQueryClient();
  const createPostMutation = useMutation<
    Post,
    Error,
    Pick<Post, "title" | "body">
  >({
    mutationFn: createPost,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["posts"], exact: true });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const payload = {
      title: values.get("title") as string,
      body: values.get("body") as string,
    };

    createPostMutation.mutate(payload, {
      onSuccess: () => {
        e.currentTarget.reset();
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input label="Title" name="title" placeholder="Enter Title" required />
        <Input label="Body" name="body" placeholder="Enter Body" required />
        <Button type="submit" disabled={createPostMutation.isPending}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
