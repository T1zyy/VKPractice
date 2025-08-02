import { useEffect, useRef } from 'react';
import { IMessage, CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default function useStomp(onMessage: (msg: any) => void, topic: string) {
    const clientRef = useRef<CompatClient | null>(null);

    useEffect(() => {
        const socket = new SockJS('https://vkpractice-production.up.railway.app/ws');
        const client = Stomp.over(() => new SockJS('https://vkpractice-production.up.railway.app/ws'));
        client.debug = () => {};

        client.connect({}, () => {
            client.subscribe(`/topic/${topic}`, (message: IMessage) => {
                const body = JSON.parse(message.body);
                onMessage(body);
            });
        });

        clientRef.current = client;

        return () => {
            client.disconnect();
        };
    }, [topic]);

    const sendMessage = (msg: any) => {
        if (clientRef.current?.connected) {
            clientRef.current.send(`/app/${topic}`, {}, JSON.stringify(msg));
        }
    };

    return sendMessage;
}