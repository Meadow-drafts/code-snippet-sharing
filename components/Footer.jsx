import React from "react";

const Footer = () => {
  return (
    <footer className=" max-w-7xl mx-auto relative z-10 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <p href="https://flowbite.com/" className="">
          <span className="self-center text-2xl orange_gradient font-semibold whitespace-nowrap ">
            Snipe
          </span>
        </p>
        <hr className="my-6 border-gray-200 sm:mx-auto " />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Shirley
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
