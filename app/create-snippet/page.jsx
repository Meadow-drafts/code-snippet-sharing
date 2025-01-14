"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import Template from "@components/Template";

const CreateSnippet = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    language: "",
    title: "",
    snippet: "",
    tag: "",
    purpose: "",
  });

  const createSnippet = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/snippet/new", {
        method: "POST",
        body: JSON.stringify({
          language: post.language,
          title: post.title,
          snippet: post.snippet,
          userId: session?.user.id,
          tag: post.tag,
          purpose: post.purpose,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <Template>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createSnippet}
      />
    </Template>
  );
};

export default CreateSnippet;
