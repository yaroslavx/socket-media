import { SERVER_URI, USER_KEY } from '../constants';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import storage from '../utils/storage';
import { TUser } from '../types/UserTypes';
import { TMessage } from '../types/MessageType';

export default function useChat() {
  // извлекаем данные пользователя из локального хранилища
  const user = storage.get(USER_KEY);

  const [users, setUsers] = useState<TUser[]>([]);
  const [messages, setMessages] = useState([]);
  const [log, setLog] = useState(null);

  // иммутабельное состояние для сокета
  const { current: socket } = useRef(
    io(SERVER_URI, {
      // отправляем идентификатор комнаты и имя пользователя на сервер
      query: {
        roomId: user.roomId,
        userName: user.userName,
      },
    })
  );

  // регистрируем обработчики
  useEffect(() => {
    // сообщаем о подключении нового пользователя
    socket.emit('user:add', user);

    // запрашиваем сообщения из БД
    socket.emit('message:get');

    // обрабатываем получение системного сообщения
    socket.on('log', (log) => {
      setLog(log);
    });

    // обрабатываем получение обновленного списка пользователей
    socket.on('user_list:update', (users) => {
      setUsers(users);
    });

    // обрабатываем получение обновленного списка сообщений
    socket.on('message_list:update', (messages) => {
      setMessages(messages);
    });
  }, []);

  // метод для отправки сообщения
  const sendMessage: (message: TMessage) => void = (message) => {
    socket.emit('message:add', message);
  };

  // метод для удаления сообщения
  const removeMessage: (message: TMessage) => void = (message) => {
    socket.emit('message:remove', message);
  };

  return { users, messages, log, sendMessage, removeMessage };
}
