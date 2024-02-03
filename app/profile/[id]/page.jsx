"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter, useSearchParams , usePathname } from "next/navigation";


import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();  
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { data: session } = useSession();  
const [userId, setUserId] = useState()
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const link = `${pathName}`
    console.log({link})
    const parts = link.split('/');
    const id = parts[parts.length - 1];
    setUserId(id);
    console.log('Extracted ID:', id);
  }, [searchParams])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
        console.log({data});
      setMyPosts(data);
    };

    if (userId) fetchPosts();
  }, [userId]);

//   const handleEdit = (post) => {
//     router.push(`/update-prompt?id=${post._id}`);
//   };

//   const handleDelete = async (post) => {
//     const hasConfirmed = confirm("Are you sure you want to delete this prompt");
//     if(hasConfirmed){
//         try{
//             await fetch(`/api/prompt/${post._id.toString()}`, {
//                 method: 'DELETE'
//             });

//             const filteredPosts = myPosts.filter((p) => p._id !== post._d);
//             setMyPosts(filteredPosts);
//         }catch(error){

//         }
//     }
//   };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
    //   handleEdit={handleEdit}
    //   handleDelete={handleDelete}
    />
  );
};

export default MyProfile;