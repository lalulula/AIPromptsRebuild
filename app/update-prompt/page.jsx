"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; //which user is currently logged in
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
const EditPrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tags: [] });
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();

      setPost({ prompt: data.prompt, tags: data.tags });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) alert("Prompt with id not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
        }),
      });
      if (response.ok) {
        router.push("/"); //prev page
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
