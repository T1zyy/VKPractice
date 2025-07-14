import { useEffect, useRef } from 'react';

export default function useSocket(url) {
    const socket = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => socket.current.close();
    }, [url]);

    return socket;
}