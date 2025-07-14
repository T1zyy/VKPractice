import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectToChat = (chatId, onMessage) => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/chat/${chatId}`, (message) => {
            onMessage(JSON.parse(message.body));
        });
    });
};

export const sendMessage = (chatId, messageObj) => {
    if (stompClient?.connected) {
        stompClient.send("/app/chat.send", {}, JSON.stringify(messageObj));
    }
};
