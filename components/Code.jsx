"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { Check, Copy } from "lucide-react";
import "../styles/editor.css";
import "../styles/prism-vsc-dark-plus.css";
import Image from "next/image";

export default function Code({ code, language }) {
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(code);
    navigator.clipboard.writeText(code);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-buttons">
          {/* <div className="title-button"></div>
          <div className="title-button"></div>
          <div className="title-button"></div> */}
          <p className="text-xs">{language}</p>
        </div>
      </div>
      <div className="editor_wrap relative">
        <div
          className="copy_btn absolute right-3 cursor-pointer"
          onClick={handleCopy}
        >
          {copied ? <Check className="cursor-pointer" size={14} /> : <Copy size={14} />}
        </div>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
