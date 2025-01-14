"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Delete, Edit, PencilIcon, Trash} from 'lucide-react'

import Code from "./Code";

const SnippetCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();


  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

 


  return (
    <div className="snippet_card space-y-2">
      
      <p className="text-lg font-semibold capitalize text-primary">{post.title}</p>
      <p className="text-xs text-gray-500">{post.purpose}</p>
      <Code code={post.snippet} language={post.language}/>
 
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
      <div className="flex ap-5">
        <div
          className="flex-1 flex justify-end items-end gap-3 cursor-pointer text-xs"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={20}
            height={20}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-secondary pt-3">
          <p
            className="font-inter flex gap-1 items-center text-sm text-black-100 cursor-pointer"
            onClick={handleEdit}
          >
            <Edit size={18} className="text-green-500"/>
            Edit
          </p>
          <p
            className="font-inter flex gap-1 items-center text-sm text-black-100 cursor-pointer"
            onClick={handleDelete}
          >
            <Delete size={20} className="text-red-500" />
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default SnippetCard;
