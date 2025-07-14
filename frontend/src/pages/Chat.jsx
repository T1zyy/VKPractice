import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useStomp from '../hooks/useStomp';

export default function Chat() {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [typingUsers, setTypingUsers] = useState([]);

    const handleReceive = (msg) => {
        setMessages(prev => [...prev, msg]);
    };

    const handleTyping = (msg) => {
        if (msg.senderId !== 1) {
            setTypingUsers([msg.senderId]);
            setTimeout(() => setTypingUsers([]), 3000);
        }
    };

    const sendMessage = useStomp(handleReceive, chatId);
    const sendTyping = useStomp(() => {}, chatId + '/typing');

    useEffect(() => {
        fetch(`/chat/${chatId}?page=0`)
            .then(res => res.json())
            .then(data => setMessages(data.content || []));
    }, [chatId]);

    const handleSend = () => {
        sendMessage({
            chatId: parseInt(chatId),
            text: input,
            senderId: 1,
            recipientId: 2
        });
        setInput('');
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        sendTyping({ chatId: parseInt(chatId), senderId: 1, typing: true });
    };

    return (
        <div className="p-4">
            <div className="mb-4 max-h-[400px] overflow-y-auto">
                {messages.map((msg, idx) => (
                    <div key={idx} className="p-2 bg-gray-100 mb-2 rounded">{msg.text}</div>
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
                <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">Отправить</button>
            </div>
        </div>
    );
}