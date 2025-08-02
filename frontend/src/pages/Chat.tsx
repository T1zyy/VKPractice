import { useParams } from 'react-router-dom';
import { useEffect, useState, ChangeEvent } from 'react';
import useStomp from '../hooks/useStomp';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';

interface Message {
    chatId: number;
    text: string;
    senderId: number;
    recipientId: number;
    createdAt?: string;
    read?: boolean;
}

interface TypingMessage {
    chatId: number;
    senderId: number;
    typing: boolean;
}

export default function Chat() {
    const { chatId } = useParams<{ chatId: string }>();
    const { userId } = useAuthStore(); // 💡 текущий пользователь
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [typingUsers, setTypingUsers] = useState<number[]>([]);
    const [recipientId, setRecipientId] = useState<number | null>(null); // 👈

    const sendMessage = useStomp(handleReceive, chatId || '');
    const sendTyping = useStomp(() => {}, `${chatId}/typing`);

    function handleReceive(msg: Message) {
        setMessages(prev => [...prev, msg]);
    }

    function handleTyping(msg: TypingMessage) {
        if (msg.senderId !== userId) {
            setTypingUsers([msg.senderId]);
            setTimeout(() => setTypingUsers([]), 3000);
        }
    }

    useEffect(() => {
        if (!chatId) return;

        api.get(`/chat/${chatId}?page=0`)
            .then(res => {
                const msgs: Message[] = res.data.content || [];
                setMessages(msgs);
                const other = msgs.find(m => m.senderId !== userId);
                if (other) setRecipientId(other.senderId);
            })
            .catch(err => console.error('Ошибка загрузки сообщений:', err));
    }, [chatId, userId]);

    const handleSend = () => {
        if (!chatId || !recipientId || !input.trim()) return;

        sendMessage({
            chatId: parseInt(chatId),
            text: input,
            senderId: userId,
            recipientId: recipientId,
        });

        setInput('');
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        if (chatId) {
            sendTyping({
                chatId: parseInt(chatId),
                senderId: userId,
                typing: true
            });
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 max-h-[400px] overflow-y-auto">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 mb-2 rounded ${msg.senderId === userId ? 'bg-green-100 text-right' : 'bg-gray-100 text-left'}`}
                    >
                        {msg.text}
                    </div>
                ))}
                {typingUsers.length > 0 && (
                    <p className="italic text-sm text-gray-400">Печатает...</p>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    className="border p-2 flex-grow rounded"
                    value={input}
                    onChange={handleInput}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}