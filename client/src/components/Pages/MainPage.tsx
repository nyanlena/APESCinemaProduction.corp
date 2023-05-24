import React from 'react';
import { motion } from 'framer-motion';
import Img from '/work.jpg';
import { Button, ButtonGroup } from 'react-bootstrap';

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 1 },
  }),
};

export default function MainPage(): JSX.Element {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
    >
      <article>
        <motion.h1 custom={1} variants={textAnimation}>
          Добро пожаловать на наш сайт!
        </motion.h1>
        <motion.p custom={2} variants={textAnimation}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet explicabo eligendi
          maiores, numquam enim quidem non ex ipsum. Asperiores, autem!
        </motion.p>
        {/* <motion.button
          custom={3}
          variants={textAnimation}
          size="large"
          style={{ borderRadius: '10px', backgroundColor: 'blue', color: 'white' }}
        >
          <a href="/signup">Регистрация</a>
        </motion.button> */}
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-primary">
            <a href="/signup">Регистрация</a>
          </Button>
          <Button variant="outline-primary">
            <a href="/login">Авторизация</a>
          </Button>
        </ButtonGroup>
      </article>
      <div>
        <motion.img src={Img} alt="hero" custom={4} variants={textAnimation} />
      </div>
    </motion.section>
  );
}
