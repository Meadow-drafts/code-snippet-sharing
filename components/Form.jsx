import Link from "next/link";
import Editor from "@monaco-editor/react";
import Select from "react-select";


const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full flex-center flex-col mb-8">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{type} Snippet</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing snippets with the world and let your
        imagination run wild with.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-5 w-full glassmorphism"
      >
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
          <div>
            <span className="font-satoshu font-semibold text-base text-gray-700">
              Title {` `}
            </span>
            <input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="Snippet title"
              className="form_input"
            />
          </div>
          <div>
            <span className="font-satoshu font-semibold text-base text-gray-700">
              Purpose {` `}
            </span>
            <input
              value={post.purpose}
              onChange={(e) => setPost({ ...post, purpose: e.target.value })}
              placeholder="Write the purpose of your snippet here.."
              className="form_input"
            />
          </div>
          <div>
            <span className="font-satoshu font-semibold text-base ">
              Language
            </span>
            <Select
              defaultValue={post.language}
              onChange={(e) => setPost({ ...post, language: e.value })}
              options={languages}
              placeholder="Select Language for you code snippet"
              isSearchable
            />
          </div>
          <div>
            <span className="font-satoshu font-semibold text-base text-gray-700">
              Tag {` `}
              <span className="font-normal text-xs">
                (#fetch, #hooks, #utils)
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              placeholder="tag"
              className="form_input"
            />
          </div>
          <div>
            <span className="col-span-2 font-satoshu font-semibold text-base text-gray-700">
              Your Code Snippet
            </span>
            <Editor
              height="30vh"
              width='73vw'
              language={post.language || "javascript"}
              value={post.snippet}
              theme="vs-dark"
              onChange={(value) => setPost({ ...post, snippet: value })}
              options={{
                selectOnLineNumbers: true,
                automaticLayout: true,
                lineNumbers: "on",
                suggest: {
                  showColors: true,
                  snippetsPreventQuickSuggestions: false,
                },
                formatOnPaste: true,
                formatOnType: true,
                trimAutoWhitespace: true,
                quickSuggestions: {
                  other: "inline",
                  comments: true,
                  strings: true,
                },
              }}
              className="mt-2"
              required
            />
          </div>
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="border border-red-500 hover:bg-red-500 hover:text-white rounded-full px-5 py-1.5 text-primary text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-secondary hover:bg-transparent border hover:border-secondary hover:text-primary rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
const languages = [
  { value: "typescript", div: "TypeScript" },
  { value: "javascript", div: "JavaScript" },
  { value: "css", div: "CSS" },
  { value: "less", div: "LESS" },
  { value: "scss", div: "SCSS" },
  { value: "json", div: "JSON" },
  { value: "html", div: "HTML" },
  { value: "xml", div: "XML" },
  { value: "php", div: "PHP" },
  { value: "c#", div: "C#" },
  { value: "c++", div: "C++" },
  { value: "razor", div: "Razor" },
  { value: "markdown", div: "Markdown" },
  { value: "diff", div: "Diff" },
  { value: "java", div: "Java" },
  { value: "vb", div: "VB" },
  { value: "coffeescript", div: "CoffeeScript" },
  { value: "handlebars", div: "Handlebars" },
  { value: "batch", div: "Batch" },
  { value: "pug", div: "Pug" },
  { value: "f#", div: "F#" },
  { value: "lua", div: "Lua" },
  { value: "powershell", div: "Powershell" },
  { value: "python", div: "Python" },
  { value: "ruby", div: "Ruby" },
  { value: "sass", div: "SASS" },
  { value: "r", div: "R" },
  { value: "objective-c", div: "Objective-C" },
];

export default Form;
