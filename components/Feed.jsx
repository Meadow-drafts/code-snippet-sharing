"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SnippetCard from "./SnippetCard";
import SkeletonCard from "./SkeletonCard";

const SnippetCardList = ({ data, handleTagClick, loading, error }) => {
  if (loading) {
    return (
      <div className="mt-16 snippet_layout">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 text-center text-gray-500">
        <p>Oops! Something went wrong. Please try again later.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-16 text-center text-gray-500">
        <p>No snippets found. Try adjusting your search or check back later.</p>
      </div>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="mt-16 snippet_layout">
      {data.map((post, index) => (
        <motion.div
          key={post?._id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <SnippetCard post={post} handleTagClick={handleTagClick} />
        </motion.div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Debounce state
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/snippet", { cache: "force-cache" });
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setPosts(data);
      setSearchResults(data); // Initialize searchResults with all posts
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Update debouncedSearchText after a delay
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchText(searchText), 300);
    return () => clearTimeout(handler); // Cleanup timeout on unmount or searchText change
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearchText === "") {
      setSearchResults(posts); // Reset to all posts
    } else {
      const results = posts.filter((post) =>
        ["snippet", "language", "title", "tag", "creator.username"]
          .map((field) => post[field]?.toLowerCase().includes(debouncedSearchText.toLowerCase()))
          .some(Boolean)
      );
      setSearchResults(results);
    }
  }, [debouncedSearchText, posts]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <SnippetCardList
        data={searchResults}
        handleTagClick={() => {}}
        loading={loading}
        error={error}
      />
    </section>
  );
};

export default Feed;
