{
  /* <Row>
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
      </Row> */
}
