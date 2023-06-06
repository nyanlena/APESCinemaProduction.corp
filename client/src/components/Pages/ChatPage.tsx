import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../features/redux/store';
import {
  wsUserInProjectAction,
  wsAddMessageAction,
  wsSendMessageAction,
} from '../../features/redux/wsActions';
import { wsAddMessageThunk, wsSetMessagesThunk } from '../../features/redux/wsActions/wsThunk';

export default function ChatPage(): JSX.Element {
  const { id } = useParams();
  console.log(id);
  const dispatch = useAppDispatch();
  const soket = useAppSelector((store) => store.ws.status);

  const messages = useAppSelector((store) =>
    store.ws.messages.filter((el) => el.projectId === Number(id)),
  );

  useEffect(() => {
    if (id && soket) {
      dispatch(wsUserInProjectAction(Number(id)));
    }
  }, [soket]);

  const [messageInput, setMessageInput] = useState('');

  // useEffect(() => {
  //   dispatch(wsSetMessagesThunk(Number(id)));
  // }, [dispatch]);

  const addMessageHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { body } = Object.fromEntries(new FormData(e.currentTarget)) as { body: string };
    dispatch(wsSendMessageAction({ body, projectId: Number(id) }));
    e.currentTarget.reset();
    console.log('click');
    setMessageInput('');

    // dispatch();
  };
  return (
    <div
      className="chat-container"
      // style={{ border: '2px solid aqua', borderRadius: '20px', height: '500px', width: '350px' }}
    >
      Чат проекта
      <div className="chat-window">
        {messages?.map((el) => (
          <p key={el.body}>{el.body}</p>
        ))}
      </div>
      <Form className="chat-form" onSubmit={addMessageHandler}>
        <Input
          className="chat-input"
          type="text"
          name="body"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <Button className="chat-button" type="submit">
          Отправить
        </Button>
      </Form>
    </div>
  );
}
