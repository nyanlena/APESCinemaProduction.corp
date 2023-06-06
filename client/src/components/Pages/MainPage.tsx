import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Img from '/mainPage.png';
import { useAppSelector } from '../../features/redux/store';

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
  const user = useAppSelector((store) => store.user);

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
          APES - сервис для работников киноиндустрии, здесь вы можете найти свой идеальный каст,
          общаться с коллегами, вести съемки!
        </motion.p>
        {/* <motion.button
          custom={3}
          variants={textAnimation}
          size="large"
          style={{ borderRadius: '10px', backgroundColor: 'blue', color: 'white' }}
        >
          <a href="/signup">Регистрация</a>
        </motion.button> */}
        {user.status === 'guest' && (
          <ButtonGroup aria-label="Basic example" className="m-5">
            <Button variant="outline-primary">
              <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
                Регистрация
              </Link>
            </Button>
            <Button variant="outline-primary">
              <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                Авторизация
              </Link>
            </Button>
          </ButtonGroup>
        )}
      </article>
      <div>
        <motion.img src={Img} alt="hero" custom={4} variants={textAnimation} />
      </div>
    </motion.section>
  );
}
