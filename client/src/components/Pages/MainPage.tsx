import React from 'react';
import { motion } from 'framer-motion';
import Img from '/monkeyWithRice.jpg';

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export default function MainPage(): JSX.Element {
  return (
    <motion.section initial="hidden" whileInView="visible">
      <div>
        <img src={Img} alt="hero" />
      </div>
      <article>
        <motion.h1 custom={1} variants={textAnimation}>
          More than just shorter links
        </motion.h1>
        <motion.p custom={2} variants={textAnimation}>
          Build your brand's recognition and get detailed insights on how your links are performing.
        </motion.p>
        <motion.button custom={3} variants={textAnimation} size="large">
          Get Started
        </motion.button>
      </article>
    </motion.section>
  );
}
