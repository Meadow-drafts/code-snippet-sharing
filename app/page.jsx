import Feed from "@components/Feed";
import Template from "@components/Template";
import Text from "@components/TextAnimate";
import Image from "next/image";

const Home = () => {
  return (
    <Template>
      <section className="relative w-full flex-center flex-col">
        <div className="justify-center">
          <h1 className="head_text">
            Discover & Share <span className="orange_gradient">Snippets</span>
          </h1>
          <p className="desc">
            Snippet is a tool for the modern world to discover, create, and
            share creative code snippets.
          </p>
        </div>

        <Feed />
      </section>
    </Template>
  );
};

export default Home;
