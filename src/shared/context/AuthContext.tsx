import { createContext } from 'react';

import { User, SignInInfo } from '@ffknob/elastic-apm-demo-shared';

import IAuthContext from '../interfaces/AuthContext';

const AuthContext = createContext<IAuthContext>({
    user: null,
    isSignedIn: false,
    setUser: (user: User | null) => {},
    setIsSignedIn: (isSignedIn: boolean) => {},
    signIn: (signInInfo: SignInInfo): Promise<User> => {
        return new Promise<User>((resolve, reject) => {});
    },
    signOut: (): Promise<User> => {
        return new Promise<User>((resolve, reject) => {});
    }
});

export default AuthContext;
