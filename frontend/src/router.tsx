import { createBrowserRouter } from "react-router-dom";
import Chat from './pages/Chat';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AdvertisementCreate from './pages/AdvertisementCreate';

export const router = createBrowserRouter([
    { path: "/search", element: <Search /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/chat/:chatId", element: <Chat /> },
    { path: "/new", element: <AdvertisementCreate /> },
]);