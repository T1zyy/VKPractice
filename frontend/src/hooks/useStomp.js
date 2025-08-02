import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function useStomp(onMessage, chatId) {
    const clientRef = useRef(null);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            onConnect: () => {
                client.subscribe(`/topic/chat/${chatId}`, (message) => {
                    onMessage(JSON.parse(message.body));
                });
            },
            reconnectDelay: 5000,
        });

        client.activate();
        clientRef.current = client;

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, [chatId, onMessage]);

    const sendMessage = (msg) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/chat.send',
                body: JSON.stringify(msg),
            });
        }
    };

    return sendMessage;
}