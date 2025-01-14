import Feed from "@components/Feed";
import Template from "@components/Template";
import Text from "@components/TextAnimate";

const Home = () => {
  return (
    <Template>
      <section className="relative w-full flex-center flex-col">
        <div className="flex  justify-between w-full">
          <img
            className="hidden md:block w-[40%] h-auto object-cover transform -translate-y-8 "
            src="/assets/images/clipboard.png"
            alt="hero 1"
          />
          
          <div className="flex-1 text-center relative md:z-10">
            <h1 className="head_text">
              <Text />
              <span className="orange_gradient">Snippets</span>
            </h1>
            <p className="desc">
              Snippet is a tool for the modern world to discover, create, and share creative code snippets.
            </p>
          </div>

          <img
            className="hidden md:blockw-[30%] h-auto object-cover transform translate-y-32 "
            src="/assets/images/hero.png"
            alt="hero 2"
          />
        </div>

        <Feed />
      </section>
    </Template>
  );
};

export default Home;
