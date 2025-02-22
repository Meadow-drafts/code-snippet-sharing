"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Template from "@components/Template";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-snippet?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this snippet?");
    if(hasConfirmed){
        try{
            await fetch(`/api/snippet/${post._id.toString()}`, {
                method: 'DELETE'
            });

            const filteredPosts = myPosts.filter((p) => p._id !== post._d);
            setMyPosts(filteredPosts);
        }catch(error){

        }
    }
  };

  return (
    <Template>
      <Profile
        name='My Profile'
        desc='Welcome to your personalized profile page. Share your exceptional snippets and inspire others with the power of your imagination'
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Template>
  );
};

export default MyProfile;