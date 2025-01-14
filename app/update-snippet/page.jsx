"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import Template from "@components/Template";

const EditSnippet = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false); // To check if it's client-side rendering
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    language: "",
    title: "",
    snippet: "",
    tag: "",
    purpose: "",
  });

  useEffect(() => {
    setIsClient(true); // Make sure it's only running on the client
  }, []);

  useEffect(() => {
    if (!isClient) return; // Skip execution if not client

    const getSnippetDetails = async () => {
      const snippetId = new URLSearchParams(window.location.search).get("id");
      if (!snippetId) return;

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

    getSnippetDetails();
  }, [isClient, session?.user.id]);

  const editSnippet = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const snippetId = new URLSearchParams(window.location.search).get("id");
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

  if (!isClient) return null; // Return null if not client side yet

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
