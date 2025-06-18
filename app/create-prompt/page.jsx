"use client";
import { useState } from "react";
import { useSession } from "next-auth/react"; //which user is currently logged in
import { useRouter } from "next/navigation";
import Form from "@components/Form";
// import Lottie from "lottie-react";
import CreateAnimation from "../../public/assets/lottie/CreatePost.json";
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tags: [] });
  const style = {
    width: 600,
  };

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tags: post.tags,
          userId: session?.user.id,
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
    <div className="flex flex-row gap-10">
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
      {/* <Lottie animationData={CreateAnimation} style={style} /> */}
    </div>
  );
};

export default CreatePrompt;
