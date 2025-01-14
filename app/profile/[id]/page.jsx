"use client";

import { useEffect, useState } from "react";
import { useSearchParams , usePathname } from "next/navigation";


import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import Template from "@components/Template";



const MyProfile = ({searchParams:{name}}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [userId, setUserId] = useState()
  const [myPosts, setMyPosts] = useState([]);

  const [username, setUsername] = useState('')

  useEffect(() => {
    const link = `${pathName}`
    const parts = link.split('/');
    const id = parts[parts.length - 1];
    setUserId(id);
  }, [searchParams])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      console.log(data)
      setMyPosts(data);

      setUsername(myPosts[0]?.creator?.username)
      console.log(username)
    };

    if (userId) fetchPosts();
  }, [userId]);

  return (
    <Template>
      <Profile
        name={`${name ? name : '...'} `}
        desc={`Welcome to ${name}'s profile page. Share your exceptional snippets and inspire others with the power of your imagination`}
        data={myPosts}
      />

    </Template>
  );
};

export default MyProfile;