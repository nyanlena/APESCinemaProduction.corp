import React, { useEffect, useMemo, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
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
import { useNavigate, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
// import Accordion from 'react-bootstrap/Accordion';

function ProfilePage(): JSX.Element {
  const { id } = useParams();
  const war = 1; // это проверка на сессию
  const navigate = useNavigate();
  useEffect(() => {
    if (id && Number(id) === Number(war)) {
      navigate(`/profile/${war}`);
    }
  }, []);

  const [profileCompletion, setProfileCompletion] = useState(0);

  const [educationVisible, setEducationVisible] = useState(false);
  const [educationValue, setEducationValue] = useState('');
  const [educationSavedValue, setEducationSavedValue] = useState('');

  const [experienceVisible, setExperienceVisible] = useState(false);
  const [experienceValue, setExperienceValue] = useState('');
  const [experienceSavedValue, setExperienceSavedValue] = useState('');

  const [aboutVisible, setAboutVisible] = useState(false);
  const [aboutValue, setAboutValue] = useState('');
  const [aboutSavedValue, setAboutSavedValue] = useState('');

  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState('');
  const [portfolioSavedValue, setPortfolioSavedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function calculateProgress(): number {
    let progress = 0;
    if (educationSavedValue) progress += 25;
    if (experienceSavedValue) progress += 25;
    if (aboutSavedValue) progress += 25;
    if (portfolioSavedValue) progress += 25;
    return progress;
  }
  useMemo(() => {
    const completion = calculateProgress();
  }, [educationSavedValue, experienceSavedValue, aboutSavedValue, portfolioSavedValue]);
  useEffect(() => {
    const completion = calculateProgress();
    setProfileCompletion(completion);
  }, [educationSavedValue, experienceSavedValue, aboutSavedValue, portfolioSavedValue]);

  const handleOpenEducationInput = (): void => {
    setEducationVisible(true);
  };

  const handleSaveEducationInput = (): void => {
    setEducationSavedValue(educationValue);
    setEducationVisible(false);
    setEducationValue('');
  };

  const handleOpenExperienceInput = (): void => {
    setExperienceVisible(true);
  };

  const handleSaveExperienceInput = (): void => {
    setExperienceSavedValue(experienceValue);
    setExperienceVisible(false);
    setExperienceValue('');
    calculateProgress();
  };

  const handleOpenAboutInput = (): void => {
    setAboutVisible(true);
  };

  const handleSaveAboutInput = (): void => {
    setAboutSavedValue(aboutValue);
    setAboutVisible(false);
    setAboutValue('');
  };

  const handleOpenPortfolioInput = (): void => {
    setPortfolioVisible(true);
  };

  const handleSavePortfolioInput = (): void => {
    setPortfolioSavedValue(portfolioValue);
    setPortfolioVisible(false);
    setPortfolioValue('');
  };
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = (): void => {
    setShowModal(!showModal);
  };
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (): void => {
    setIsHovered(!isHovered);
  };

  return (
    <>
      <Row className="mt-3 p-2">
        <Col sm={3}>
          <div style={{ position: 'relative' }}>
            <Image
              src="https://via.placeholder.com/400"
              alt="Your Image"
              fluid
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseEnter}
            />

            <div
              style={{
                fontSize: '35px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                cursor: 'pointer',
                opacity: isHovered ? 1 : 0, // Изменяем прозрачность иконки при наведении
                transition: 'opacity 0.3s', // Добавляем плавный переход для плавного появления/исчезновения иконки
              }}
              onClick={handleToggleModal}
            >
              {/* Иконка может быть здесь */}
              <FiEye />
            </div>

            <Modal show={showModal} onHide={handleToggleModal} centered>
              <Modal.Body>
                <Image src="https://via.placeholder.com/800" alt="Your Image" fluid />
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
        </Col>
        <Col sm={8}>
          <h1>Имя Фамилия</h1>
          <h6>Основная информация:</h6>
          <>
            <p> Город: {1 === 0 ? 'Москва' : 'Город не указан'}</p>
            <p> Возраст: {1 === 0 ? '18' : 'Возраст не указан'}</p>
            <p> Должность: {1 === 0 ? '18' : 'Должность не указана'}</p>
          </>
          {calculateProgress() >= 0 && calculateProgress() < 100 ? (
            <Row>
              <p>Заполните Ваш профиль, чтобы Вами заинтересовались.</p>
              <ProgressBar now={calculateProgress()} label={`${calculateProgress()}%`} />
            </Row>
          ) : (
            'Ваш профиль заполнен!'
          )}
        </Col>
        <Col sm={1}>
          {war === 1 && (
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
          {war !== 1 && (
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
      {/* <Row>
        <h5>Дополнительная информация:</h5>
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Образование</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col sm={10}>
                  <p>
                    {educationSavedValue
                      ? `${educationSavedValue}`
                      : 'Добавьте информацию об образовании'}
                  </p>
                </Col>
                <Col sm={2}>
                  {!educationVisible && (
                    <Button variant="outline-secondary" onClick={handleOpenEducationInput}>
                      <BsFillPencilFill />
                    </Button>
                  )}
                </Col>
                {educationVisible && (
                  <Modal show={educationVisible} onHide={() => setEducationVisible(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Образование</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        type="text"
                        value={educationValue}
                        onChange={(e) => setEducationValue(e.target.value)}
                        placeholder={
                          educationSavedValue ? `${educationSavedValue}` : `Добавьте информацию`
                        }
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
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Опыт работы</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col sm={10}>
                  <p>
                    {experienceSavedValue
                      ? `${experienceSavedValue}`
                      : 'Добавьте информацию об опыте работы'}
                  </p>
                </Col>
                <Col sm={2}>
                  {!experienceVisible && (
                    <Button variant="outline-secondary" onClick={handleOpenExperienceInput}>
                      <BsFillPencilFill />
                    </Button>
                  )}
                </Col>
                {experienceVisible && (
                  <Modal show={experienceVisible} onHide={() => setExperienceVisible(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Опыт работы</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        type="text"
                        value={experienceValue}
                        onChange={(e) => setExperienceValue(e.target.value)}
                        placeholder={
                          experienceSavedValue ? `${experienceSavedValue}` : `Добавьте информацию`
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
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>О себе</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col sm={10}>
                  <p>{aboutSavedValue ? `${aboutSavedValue}` : 'Расскажите немного о себе'}</p>
                </Col>
                <Col sm={2}>
                  {!aboutVisible && (
                    <Button variant="outline-secondary" onClick={handleOpenAboutInput}>
                      <BsFillPencilFill />
                    </Button>
                  )}
                </Col>
                {aboutVisible && (
                  <Modal show={aboutVisible} onHide={() => setAboutVisible(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>О себе</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        as="textarea"
                        value={aboutValue}
                        onChange={(e) => setAboutValue(e.target.value)}
                        rows={3}
                        placeholder={
                          aboutSavedValue ? `${aboutSavedValue}` : `Расскажите немного о себе`
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
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Портфолио</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col sm={10}>
                  <p>
                    {portfolioSavedValue
                      ? `${portfolioSavedValue}`
                      : 'Добавьте ссылку на портфолио'}
                  </p>
                </Col>
                <Col sm={2}>
                  {!portfolioVisible && (
                    <Button variant="outline-secondary" onClick={handleOpenPortfolioInput}>
                      <BsFillPencilFill />
                    </Button>
                  )}
                </Col>
                {portfolioVisible && (
                  <Modal show={portfolioVisible} onHide={() => setPortfolioVisible(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Портфолио</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        type="text"
                        value={portfolioValue}
                        onChange={(e) => setPortfolioValue(e.target.value)}
                        placeholder={
                          portfolioSavedValue ? `${portfolioSavedValue}` : `Добавьте ссылку`
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
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row> */}
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
              {educationSavedValue
                ? `${educationSavedValue}`
                : 'Добавьте информацию об образовании'}
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
                    placeholder={
                      educationSavedValue ? `${educationSavedValue}` : `Добавьте информацию`
                    }
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
              {experienceSavedValue
                ? `${experienceSavedValue}`
                : 'Добавьте информацию об опыте работы'}
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
                      experienceSavedValue ? `${experienceSavedValue}` : `Добавьте информацию`
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
              {aboutSavedValue ? `${aboutSavedValue}` : 'Расскажите немного о себе'}
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
                      aboutSavedValue ? `${aboutSavedValue}` : `Расскажите немного о себе`
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
              {portfolioSavedValue ? `${portfolioSavedValue}` : 'Добавьте ссылку на портфолио'}
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
                    placeholder={portfolioSavedValue ? `${portfolioSavedValue}` : `Добавьте ссылку`}
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
              <BsFillEnvelopeAtFill /> email@example.com
            </li>
            <li>
              <BsFillTelephoneForwardFill /> +1234567890
            </li>
            <li>
              <FaTelegram /> @telegram
            </li>
            <li>
              <FaWhatsapp /> +1234567890
            </li>
            <li>
              <BsInstagram /> @instagram
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
