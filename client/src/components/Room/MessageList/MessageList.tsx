import { useEffect, useRef } from 'react'
import MessageItem from './MessageItem'

type MessageListProps = {
    log: any
    messages: {

    }[]
    removeMessage: (message: string) => void
}

export default function MessageList({ log, messages, removeMessage }: MessageListProps) {
    // иммутабельная ссылка на элемент для отображения системных сообщений
    const logRef = useRef
}