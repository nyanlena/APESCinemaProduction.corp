import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import {
  BsWrenchAdjustable,
  BsFillEnvelopeAtFill,
  BsFillTelephoneForwardFill,
  BsInstagram,
  BsFillPencilFill,
} from 'react-icons/bs';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { FiEye } from 'react-icons/fi';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import ProgressBar from 'react-bootstrap/ProgressBar';
import store, { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { changeProfileThunk, profileThunk } from '../../features/redux/profile/profileThunk';
import type { BackendChangeProfileType } from '../../types/profileActionType';

function ProfilePage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const oneUser = useAppSelector((store) => store.oneProfile.oneUser);
  const user = useAppSelector((store) => store.user as BackendChangeProfileType);

  //favorites
  const { favorites } = useAppSelector((store) => store.favorites);
  const isLiked = favorites.some((favorite) => favorite.toId === Number(id));
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    dispatch(profileThunk(Number(id)));
  }, []);

  // модальное окно с фотографией
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = (): void => {
    setShowModal(!showModal);
  };
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (): void => {
    setIsHovered(!isHovered);
  };
  /// /////////////////////////////////////////////////////////////

  /// прогресс бар///
  const [profileCompletion, setProfileCompletion] = useState(20);

  function calculateProgress(): number {
    let completion = 20;
    if (oneUser.education) completion += 20;
    if (oneUser.experience) completion += 20;
    if (oneUser.aboutMe) completion += 20;
    if (oneUser.userPortfolio) completion += 20;
    return completion;
  }

  useMemo(() => {
    const completion = calculateProgress();
    setProfileCompletion(completion);
  }, [oneUser.education, oneUser.experience, oneUser.aboutMe, oneUser.userPortfolio]);
  /// // конец прогресс - бара//////////
  useEffect(() => {
    setProfileCompletion(calculateProgress());
  }, [oneUser.education, oneUser.experience, oneUser.aboutMe, oneUser.userPortfolio]);
  /// /////////////////////////////////////////////////////////////
  /// /изменения профиля/////

  const [educationVisible, setEducationVisible] = useState(false);
  const handleOpenAndCloseEducationInput = (): void => {
    setEducationVisible(!educationVisible);
  };
  const [experienceVisible, setExperienceVisible] = useState(false);
  const handleOpenAndCloseExperienceInput = (): void => {
    setExperienceVisible(!experienceVisible);
  };
  const [aboutMeVisible, setAboutMeVisible] = useState(false);
  const handleOpenAndCloseAboutMeInput = (): void => {
    setAboutMeVisible(!aboutMeVisible);
  };
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const handleOpenAndClosePortfolioInput = (): void => {
    setPortfolioVisible(!portfolioVisible);
  };
  const [inputProfile, setInputProfile] = useState<BackendChangeProfileType>({
    id: oneUser.id,
    education: oneUser.education,
    experience: oneUser.experience,
    aboutMe: oneUser.aboutMe,
    userPortfolio: oneUser.userPortfolio,
  });

  useEffect(() => {
    setInputProfile(oneUser);
  }, [oneUser]);

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSaveProfileEducation = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(changeProfileThunk(inputProfile));
    handleOpenAndCloseEducationInput();
  };
  const handleSaveProfileExperience = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(changeProfileThunk(inputProfile));
    handleOpenAndCloseExperienceInput();
  };
  const handleSaveProfileAboutMe = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(changeProfileThunk(inputProfile));
    handleOpenAndCloseAboutMeInput();
  };
  const handleSaveProfilePortfolio = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(changeProfileThunk(inputProfile));
    handleOpenAndClosePortfolioInput();
  };
  /// /////////////////////////////////////////////////////////////
  console.log(inputProfile);

  // favorite

  // Обработчик нажатия кнопки

  const handleClick = async () => {
    if (isLiked) {
      const result = await dispatch(deleteFavoriteProfileThunk(Number(id)));
      setLiked(!result); // обновляем состояние на основе результата удаления
    } else {
      const result = await dispatch(addFavoriteProfileThunk(oneUser.id));
      setLiked(result); // обновляем состояние на основе результата добавления
    }
  };

  return (
    <>
      <Row className="mt-3 p-2">
        <Col sm={3}>
          {/* Фото профиля */}
          <div style={{ position: 'relative' }}>
            <Image
              src={oneUser.img !== null ? `http://localhost:3001/${oneUser.img}` : '/img/400.png'}
              alt="Your Image"
              fluid
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseEnter}
              style={{ width: '400px', height: '400px', borderRadius: '15px' }}
            />

            <Button
              variant="outline-secondary"
              style={{
                fontSize: '35px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                border: 'none',
                cursor: 'pointer',
                opacity: isHovered ? 1 : 0, // Изменяем прозрачность иконки при наведении
                transition: 'opacity 0.3s', // Добавляем плавный переход для плавного появления/исчезновения иконки
              }}
              onClick={handleToggleModal}
            >
              <FiEye />
            </Button>
            <Modal show={showModal} onHide={handleToggleModal} centered>
              <Modal.Body>
                <Image
                  src={
                    oneUser.img !== null ? `http://localhost:3001/${oneUser.img}` : '/img/800.png'
                  }
                  alt="Your Image"
                  fluid
                />
                <Button
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '30px',
                  }}
                  onClick={handleToggleModal}
                >
                  &times;
                </Button>
              </Modal.Body>
            </Modal>
          </div>
          {/* тут конец фото профиля */}
        </Col>
        {/* Основная информация */}
        <Col sm={8}>
          <h1>{`${oneUser.firstName} ${oneUser.lastName}`}</h1>
          <h4>{oneUser.patronymicname !== null ? oneUser.patronymicname : ''}</h4>
          <h6>Основная информация:</h6>

          <>
            <p> Город: {oneUser.city !== null ? oneUser.city : 'Город не указан'}</p>
            <p> Возраст: {oneUser.age !== null ? oneUser.age : 'Возраст не указан'}</p>
            <p> Должность: {oneUser.Category?.title}</p>
          </>
          {/* Прогресс-бар */}
          {Number(id) === (user ? user.id : 'Ошибка') &&
            (calculateProgress() >= 0 && calculateProgress() < 100 ? (
              <Row>
                <p>Продолжите заполнять Ваш профиль, чтобы Вами заинтересовались.</p>
                {/* <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} /> */}
                <ProgressBar animated now={calculateProgress()} label={`${calculateProgress()}%`} />
              </Row>
            ) : (
              'Ваш профиль заполнен!'
            ))}
        </Col>
        {/* конец блока основная информация */}
        {/* Кнопки  настроек и лайка */}
        <Col sm={1}>
          {Number(id) === (user ? user.id : 'Ошибка') && (
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-basic"
                style={{
                  border: 'none',
                }}
              >
                <BsWrenchAdjustable />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="http://localhost:5173/profile/setting">
                  Настройка
                </Dropdown.Item>
                <Dropdown.Item href="http://localhost:5173/profile/image">
                  Изменить фото профиля
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="http://localhost:5173/favorites">
                  Мои избранные
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {Number(id) !== (user ? user.id : 'Ошибка') && (
            <Button
              variant="outline-secondary"
              style={{
                border: 'none',
              }}
            >
              {liked ? '❤️' : '🤍'}
            </Button>
          )}
        </Col>
      </Row>

      <Row className="m-1 d-flex align-items-center">
        <h5>Дополнительная информация:</h5>

        <Card className="mt-1">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>Образование</Card.Title>
              {Number(id) === (user ? user.id : 'Ошибка') && !educationVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenAndCloseEducationInput}
                  style={{
                    border: 'none',
                  }}
                >
                  <BsFillPencilFill />
                </Button>
              )}
            </div>
            <Card.Text>
              {oneUser.education ? `${oneUser.education}` : 'Добавьте информацию об образовании'}
            </Card.Text>
            {educationVisible && (
              <Modal show={educationVisible} onHide={() => handleOpenAndCloseEducationInput()}>
                <Modal.Header closeButton>
                  <Modal.Title>Образование</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    autoFocus
                    type="text"
                    name="education"
                    value={inputProfile.education}
                    onChange={handleChangeProfile}
                    placeholder={
                      inputProfile.education ? `${inputProfile.education}` : `Добавьте информацию`
                    }
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleOpenAndCloseEducationInput()}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSaveProfileEducation}>
                    Сохранить
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Card.Body>
        </Card>

        <Card className="mt-1">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>Опыт работы</Card.Title>
              {Number(id) === (user ? user.id : 'Ошибка') && !experienceVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenAndCloseExperienceInput}
                  style={{
                    border: 'none',
                  }}
                >
                  <BsFillPencilFill />
                </Button>
              )}
            </div>
            <Card.Text>
              {oneUser.experience ? `${oneUser.experience}` : 'Добавьте информацию об опыте работы'}
            </Card.Text>
            {experienceVisible && (
              <Modal show={experienceVisible} onHide={() => handleOpenAndCloseExperienceInput()}>
                <Modal.Header closeButton>
                  <Modal.Title>Опыт работы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    autoFocus
                    type="text"
                    name="experience"
                    value={inputProfile.experience}
                    onChange={handleChangeProfile}
                    placeholder={
                      oneUser.experience ? `${oneUser.experience}` : `Добавьте информацию`
                    }
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleOpenAndCloseExperienceInput()}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSaveProfileExperience}>
                    Сохранить
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Card.Body>
        </Card>

        <Card className="mt-1">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>О себе</Card.Title>
              {Number(id) === (user ? user.id : 'Ошибка') && !aboutMeVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenAndCloseAboutMeInput}
                  style={{
                    border: 'none',
                  }}
                >
                  <BsFillPencilFill />
                </Button>
              )}
            </div>
            <Card.Text>
              {oneUser.aboutMe ? `${oneUser.aboutMe}` : 'Расскажите немного о себе'}
            </Card.Text>
            {aboutMeVisible && (
              <Modal show={aboutMeVisible} onHide={() => handleOpenAndCloseAboutMeInput()}>
                <Modal.Header closeButton>
                  <Modal.Title>О себе</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    as="textarea"
                    autoFocus
                    name="aboutMe"
                    value={inputProfile.aboutMe}
                    onChange={handleChangeProfile}
                    rows={3}
                    placeholder={
                      oneUser.aboutMe ? `${oneUser.aboutMe}` : `Расскажите немного о себе`
                    }
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleOpenAndCloseAboutMeInput()}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSaveProfileAboutMe}>
                    Сохранить
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Card.Body>
        </Card>

        <Card className="mt-1">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>Портфолио</Card.Title>
              {Number(id) === (user ? user.id : 'Ошибка') && !portfolioVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenAndClosePortfolioInput}
                  style={{
                    border: 'none',
                  }}
                >
                  <BsFillPencilFill />
                </Button>
              )}
            </div>
            <Card.Text>
              {oneUser.userPortfolio ? (
                <a href={oneUser.userPortfolio} style={{ textDecoration: 'none', color: 'purple' }}>
                  Портфолио
                </a>
              ) : (
                'Добавьте ссылку на портфолио'
              )}
            </Card.Text>

            {portfolioVisible && (
              <Modal show={portfolioVisible} onHide={() => setPortfolioVisible(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Портфолио</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    autoFocus
                    type="text"
                    name="userPortfolio"
                    value={inputProfile.userPortfolio}
                    onChange={handleChangeProfile}
                    placeholder={
                      oneUser.userPortfolio ? `${oneUser.userPortfolio}` : `Добавьте ссылку`
                    }
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleOpenAndClosePortfolioInput()}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSaveProfilePortfolio}>
                    Сохранить
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Card.Body>
        </Card>
      </Row>

      <Row className="mt-5 p-2">
        <Col sm={3}>
          <h3>Контакты</h3>
          <ul className="list-unstyled">
            <li>
              <BsFillEnvelopeAtFill /> {oneUser.email ? `${oneUser.email}` : 'Почта не указана'}
            </li>
            <li>
              <BsFillTelephoneForwardFill />{' '}
              {oneUser.phone ? `${oneUser.phone}` : 'Телефон не указан'}
            </li>
            <li>
              <FaTelegram />{' '}
              {oneUser.linkTg ? <Link to={oneUser.linkTg}>Telegramm</Link> : 'Telegram не указан'}
            </li>
            <li>
              <FaWhatsapp /> {oneUser.linkWA ? `${oneUser.linkWA}` : 'WhatsApp не указан'}
            </li>
            <li>
              <BsInstagram />{' '}
              {oneUser.linkInst ? (
                <Link to={oneUser.linkInst}>Instagramm</Link>
              ) : (
                'Instagram не указан'
              )}
            </li>
          </ul>
        </Col>
        {/* <Col sm={9}>
          <h3>Проекты</h3>
          <Row className="mt-3">
            <p>Название проекта 1</p>
            <p>Название проекта 2</p>
            <p>Название проекта 3</p>
          </Row>
        </Col> */}
      </Row>
    </>
  );
}
export default React.memo(ProfilePage);
