'use client'
import { motion } from "framer-motion";

function Text() {
  const text = "Discover & Share".split(" ");

  return (
    <div >
      {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i / 8
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </div>
  );
}

export default Text;
