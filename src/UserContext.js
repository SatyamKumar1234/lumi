import { createContext } from 'react';
export const UserContext = createContext({
    userName: 'User',
    setUserName: () => { },
    backgroundImage: null,
    setBackgroundImage: () => { },
});
