import { useEffect, useRef } from 'react'
import { TMessage } from '../../../types/MessageType'
import MessageItem from './MessageItem'

type MessageListProps = {
    log: string | null
    messages: TMessage[]
    removeMessage: (message: TMessage) => void
}

export default function MessageList({ log, messages, removeMessage }: MessageListProps) {
    // иммутабельная ссылка на элемент для отображения системных сообщений
    const logRef = useRef<HTMLParagraphElement>(null)
    // иммутабельная ссылка на конец списка сообщений
    const bottomRef = useRef<HTMLParagraphElement>(null)

    // выполняем прокрутку к концу списка при добавлении нового сообщения
    // это может стать проблемой при большом количестве пользователей,
    // когда участники чата не будут успевать читать сообщения
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])

    // отображаем и скрываем системные сообщения
    useEffect(() => {
        if (log && logRef.current) {
            logRef.current.style.opacity = "0.8"
            logRef.current.style.zIndex = "1"

            const timerId = setTimeout(() => {
                if (logRef.current) {
                    logRef.current.style.opacity = "0"
                    logRef.current.style.zIndex = "-1"
                }
                clearTimeout(timerId)
            }, 1500)
        }
    }, [log])

    return <div className="container message">
        <h2>Messages</h2>
        <ul className='list messages'>
            <>
                {messages.map(message => {
                    <MessageItem
                        key={message.id}
                        message={message}
                        removeMessage={removeMessage} />
                })}
                <p ref={bottomRef}></p>
                <p ref={logRef} className='log'>{log}</p>
            </>
        </ul>
    </div>
}