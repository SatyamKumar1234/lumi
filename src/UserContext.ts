import { createContext } from 'react';

export interface UserContextType {
    userName: string;
    setUserName: (name: string) => void;
    backgroundImage: string | null;
    setBackgroundImage: (uri: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
    userName: 'User',
    setUserName: () => { },
    backgroundImage: null,
    setBackgroundImage: () => { },
});
