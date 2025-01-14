"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import Template from "@components/Template";

const EditSnippet = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const snippetId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    language: "",
    title: "",
    snippet: "",
    tag: "",
    purpose: "",
  });

  useEffect(() => {
    const getSnippetDetails = async () => {
      const response = await fetch(`/api/snippet/${snippetId}`);
      const data = await response.json();

      setPost({
        language: data.language,
        title: data.title,
        snippet: data.snippet,
        userId: session?.user.id,
        tag: data.tag,
        purpose: data.purpose,
      });
    };
    if (snippetId) getSnippetDetails();
  }, [snippetId]);

  const editSnippet = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    if (!snippetId) return alert("Snippet ID not found");

    try {
      const response = await fetch(`/api/snippet/${snippetId}`, {
        method: "PATCH",
        body: JSON.stringify({
          snippet: post.snippet,
          purpose: post.purpose,
          language: post.language,
          title: post.title,
          tag: post.tag,
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

  return (
    <Template>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editSnippet}
      />
    </Template>
  );
};

export default EditSnippet;
