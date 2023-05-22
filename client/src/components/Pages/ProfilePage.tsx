import React, { useEffect, useMemo, useState } from 'react';
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
import { ProgressBar } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import { changeProfileThunk, profileThunk } from '../../features/redux/profile/profileThunk';
// import Accordion from 'react-bootstrap/Accordion';

function ProfilePage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const oneUser = useAppSelector((store) => store.oneProfile.oneUser);

  useEffect(() => {
    dispatch(profileThunk(Number(id)));
    dispatch(changeProfileThunk({ oneUser, id }));
  }, []);

  /// /// Что-то со стейтами/////////
  const [educationVisible, setEducationVisible] = useState(false);
  const [educationValue, setEducationValue] = useState('');
  // const [educationSavedValue, setEducationSavedValue] = useState(oneUser.education);//

  const [experienceVisible, setExperienceVisible] = useState(false);
  const [experienceValue, setExperienceValue] = useState('');
  // const [experienceSavedValue, setExperienceSavedValue] = useState(oneUser.experience);

  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutValue, setAboutValue] = useState('');
  // const [aboutSavedValue, setAboutSavedValue] = useState(oneUser.aboutMe);

  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState('');
  // const [portfolioSavedValue, setPortfolioSavedValue] = useState(oneUser.portfolioLink);
  /// ///////что-то с изменениями закончилось///////

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
    let progress = 20;
    if (oneUser.education) progress += 20;
    if (oneUser.experience) progress += 20;
    if (oneUser.aboutMe) progress += 20;
    if (oneUser.portfolioLink) progress += 20;
    return progress;
  }
  useMemo(() => {
    const completion = calculateProgress();
  }, [oneUser.education, oneUser.experience, oneUser.aboutMe, oneUser.portfolioLink]);
  useEffect(() => {
    const completion = calculateProgress();
    setProfileCompletion(completion);
  }, [oneUser.education, oneUser.experience, oneUser.aboutMe, oneUser.portfolioLink]);

  const handleOpenEducationInput = (): void => {
    setEducationVisible(true);
  };
  /// /////////////////////////////////////////////////////////////

  const handleSaveEducationInput = (): void => {
    changeProfileThunk(oneUser);
    setEducationVisible(false);
    setEducationValue('');
  };

  const handleOpenExperienceInput = (): void => {
    setExperienceVisible(true);
  };

  const handleSaveExperienceInput = (): void => {
    changeProfileThunk(oneUser);
    setExperienceVisible(false);
    setExperienceValue('');
    calculateProgress();
  };

  const handleOpenAboutInput = (): void => {
    setAboutVisible(true);
  };

  const handleSaveAboutInput = (): void => {
    changeProfileThunk(oneUser);
    setAboutVisible(false);
    setAboutValue('');
  };

  const handleOpenPortfolioInput = (): void => {
    setPortfolioVisible(true);
  };

  const handleSavePortfolioInput = (): void => {
    changeProfileThunk(oneUser);
    setPortfolioVisible(false);
    setPortfolioValue('');
  };

  return (
    <>
      <Row className="mt-3 p-2">
        <Col sm={3}>
          {/* Фото профиля */}
          <div style={{ position: 'relative' }}>
            <Image
              src={oneUser.img !== null ? oneUser.img : 'https://via.placeholder.com/400'}
              alt="Your Image"
              fluid
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseEnter}
              style={{ width: '400px', height: '400px' }}
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
                  src={oneUser.img !== null ? oneUser.img : 'https://via.placeholder.com/800'}
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
          <h6>Основная информация:</h6>
          <>
            <p> Город: {oneUser.city !== null ? oneUser.city : 'Город не указан'}</p>
            <p> Возраст: {oneUser.age !== null ? oneUser.age : 'Возраст не указан'}</p>
            <p> Должность: {oneUser.categoryId}</p>
          </>
          {/* Прогресс-бар */}
          {calculateProgress() >= 0 && calculateProgress() < 100 ? (
            <Row>
              <p>Продолжите заполнять Ваш профиль, чтобы Вами заинтересовались.</p>
              <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
            </Row>
          ) : (
            'Ваш профиль заполнен!'
          )}
        </Col>
        {/* конец блока основная информация */}
        {/* Кнопки  настроек и лайка */}
        <Col sm={1}>
          {Number(id) === 1 && (
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
                <Dropdown.Item href="http://localhost:5173/profile/setting">
                  Избранные
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-3">Что-то по приколу</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          {Number(id) !== 1 && (
            <Button
              variant="outline-secondary"
              style={{
                border: 'none',
              }}
            >
              <FcLike style={{ fontSize: '35px' }} />
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <h5>Дополнительная информация:</h5>

        <Card className="mt-1">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>Образование</Card.Title>
              {!educationVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenEducationInput}
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
              <Modal show={educationVisible} onHide={() => setEducationVisible(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Образование</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    autoFocus
                    type="text"
                    value={educationValue}
                    onChange={(e) => setEducationValue(e.target.value)}
                    placeholder={oneUser.education ? `${oneUser.education}` : `Добавьте информацию`}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setEducationVisible(false)}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSaveEducationInput}>
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
              {!experienceVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenExperienceInput}
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
              <Modal show={experienceVisible} onHide={() => setExperienceVisible(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Опыт работы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    autoFocus
                    type="text"
                    value={experienceValue}
                    onChange={(e) => setExperienceValue(e.target.value)}
                    placeholder={
                      oneUser.experience ? `${oneUser.experience}` : `Добавьте информацию`
                    }
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setExperienceVisible(false)}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSaveExperienceInput}>
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
              {!aboutVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenAboutInput}
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
            {aboutVisible && (
              <Modal show={aboutVisible} onHide={() => setAboutVisible(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>О себе</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    as="textarea"
                    autoFocus
                    value={aboutValue}
                    onChange={(e) => setAboutValue(e.target.value)}
                    rows={3}
                    placeholder={
                      oneUser.aboutMe ? `${oneUser.aboutMe}` : `Расскажите немного о себе`
                    }
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setAboutVisible(false)}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSaveAboutInput}>
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
              {!portfolioVisible && (
                <Button
                  variant="outline-secondary"
                  onClick={handleOpenPortfolioInput}
                  style={{
                    border: 'none',
                  }}
                >
                  <BsFillPencilFill />
                </Button>
              )}
            </div>
            <Card.Text>
              {oneUser.portfolioLink ? `${oneUser.portfolioLink}` : 'Добавьте ссылку на портфолио'}
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
                    value={portfolioValue}
                    onChange={(e) => setPortfolioValue(e.target.value)}
                    placeholder={
                      oneUser.portfolioLink ? `${oneUser.portfolioLink}` : `Добавьте ссылку`
                    }
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setPortfolioVisible(false)}>
                    Закрыть
                  </Button>
                  <Button variant="success" onClick={handleSavePortfolioInput}>
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
              {oneUser.linkTg ? <Link to={oneUser.linkTg}>Telegramm</Link> : 'Telegramm не указан'}
            </li>
            <li>
              <FaWhatsapp /> {oneUser.linkWA ? `${oneUser.linkWA}` : 'WhatsApp не указан'}
            </li>
            <li>
              <BsInstagram />{' '}
              {oneUser.linkInst ? (
                <Link to={oneUser.linkInst}>Instagramm</Link>
              ) : (
                'Instagramm не указан'
              )}
            </li>
          </ul>
        </Col>
        <Col sm={9}>
          <h3>Проекты</h3>
          <Row className="mt-3">
            <p>Название проекта 1</p>
            <p>Название проекта 2</p>
            <p>Название проекта 3</p>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default React.memo(ProfilePage);
