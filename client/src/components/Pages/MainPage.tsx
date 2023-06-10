import React from 'react';
import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import Img from '/mainPage.png';
import GreenGal from '/greengal.png';
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

const textAnimationTwo = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 1 },
  }),
};

const featureAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

export default function MainPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        style={{ display: 'flex', alignItems: 'center', gap: '20px', height: '100vh' }}
      >
        <article>
          <motion.h1 custom={1} variants={textAnimation}>
            Добро пожаловать на наш сайт!
          </motion.h1>
          <motion.p custom={2} variants={textAnimation}>
            APES - сервис для работников киноиндустрии, здесь вы можете найти свой идеальный каст,
            общаться с коллегами, вести съемки!
          </motion.p>
          {user.status === 'guest' && (
            <ButtonGroup aria-label="Basic example" className="m-5">
              <motion.div custom={3} variants={textAnimation}>
                <Button variant="outline-primary">
                  <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
                    Регистрация
                  </Link>
                </Button>
              </motion.div>
              <motion.div custom={3} variants={textAnimation}>
                <Button variant="outline-primary">
                  <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                    Авторизация
                  </Link>
                </Button>
              </motion.div>
            </ButtonGroup>
          )}
        </article>
        <div>
          <motion.img src={Img} alt="logo" custom={4} variants={textAnimation} />
        </div>
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30vh' }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <motion.h2 custom={4} variants={textAnimationTwo}>
            Очень рады видеть вас на нашем сайте!
          </motion.h2>
          <motion.p custom={5} variants={textAnimationTwo}>
            Наша команда разработчиков создала удобную платформу для киноделов и продакшена.
          </motion.p>
        </div>
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40vh',
          marginBottom: '100px',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            margin: '50px',
            flexWrap: 'nowrap',
          }}
        >
          <motion.div
            variants={featureAnimation}
            custom={6}
            style={{
              width: '300px',
              height: '200px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              overflow: 'visible',
              position: 'relative',
              padding: '20px',
            }}
          >
            <div className="avatar-container">
              <img
                src={GreenGal}
                className="avatar"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '-50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '20px',
                }}
              />
            </div>
            <div className="content" style={{ marginTop: '40px', textAlign: 'center' }}>
              <p>Надежный и удобный сайт</p>
            </div>
          </motion.div>
          <motion.div
            variants={featureAnimation}
            custom={7}
            style={{
              width: '300px',
              height: '200px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              overflow: 'visible',
              position: 'relative',
              padding: '20px',
            }}
          >
            <div className="avatar-container">
              <img
                src={GreenGal}
                className="avatar"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '-50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '20px',
                }}
              />
            </div>
            <div className="content" style={{ marginTop: '40px', textAlign: 'center' }}>
              <p>Крутое коммьюнити</p>
            </div>
          </motion.div>
          <motion.div
            variants={featureAnimation}
            custom={8}
            style={{
              width: '300px',
              height: '200px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              overflow: 'visible',
              position: 'relative',
              padding: '20px',
            }}
          >
            <div className="avatar-container">
              <img
                src={GreenGal}
                className="avatar"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '-50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '20px',
                }}
              />
            </div>
            <div className="content" style={{ marginTop: '40px', textAlign: 'center' }}>
              <p>Многофункциональный</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}
