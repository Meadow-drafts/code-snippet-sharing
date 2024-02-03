'use client'
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'
import { set } from 'mongoose'

const PromptCardList = ({data, handleTagClick}) =>{
  return(
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState();
  const [searchResults, setSearchResults] = useState();


  const fetchPosts =  async() => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  };
  
  useEffect(() => {
   fetchPosts();
   console.log({posts})
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e)
    console.log({searchText})
    if (searchText === ''){
      fetchPosts();
    }else{
      const results = posts.filter(
        (post) => 
        post?.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post?.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post?.creator?.username.toLowerCase().includes(searchText.toLowerCase()) 
        
        );
        setPosts(results);
        console.log({results});
    }
   
  }


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className='search_input peer'
          />
      </form>

      <PromptCardList
      data={posts || searchResults}
      handleTagClick={() => {}}

      />
    </section>
  )
}

export default Feed
