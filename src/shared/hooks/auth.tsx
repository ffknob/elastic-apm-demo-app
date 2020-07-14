import { useContext, useState, useCallback, useEffect } from 'react';

import {
    User,
    SignInInfo,
    BackendError
} from '@ffknob/elastic-apm-demo-shared';

import AuthContext from '../context/AuthContext';
import IAuthContext from '../interfaces/AuthContext';

import { AuthApi } from '../services/api';

import useLoading from './loading';

const useAuth = () => {
    const authContext: IAuthContext = useContext(AuthContext);

    const { loading } = useLoading();

    const [user, setUser] = useState<User | null>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    if (!user && !isSignedIn) {
        const userLocalStorage: string | null = localStorage.getItem('user');

        if (userLocalStorage) {
            let userStored = JSON.parse(userLocalStorage);

            if (
                userStored.token &&
                new Date(userStored.tokenExpirationDate) > new Date()
            ) {
                userStored = JSON.parse(userLocalStorage);

                setUser(userStored);
                setIsSignedIn(true);

                authContext.setUser(userStored);
                authContext.setIsSignedIn(true);
            } else {
                console.log('Removing stored user');
                localStorage.removeItem('user');
            }
        }
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    const signIn = useCallback(
        (signInInfo: SignInInfo): Promise<User> => {
            return new Promise<User>((resolve, reject) => {
                loading(true);

                AuthApi.signIn(signInInfo)
                    .then((user: User) => {
                        loading(false);

                        if (user) {
                            setIsSignedIn(true);
                            setUser(user);
                            authContext.setUser(user);
                            authContext.setIsSignedIn(true);
                        }

                        resolve(user);
                    })
                    .catch((err: BackendError<any>) => {
                        loading(false);

                        reject(err);
                    });
            });
        },
        [authContext, loading]
    );

    const signOut = useCallback((): Promise<User> => {
        return new Promise<User>((resolve, reject) => {
            loading(true);

            if (user && user.token) {
                AuthApi.signOut(user)
                    .then((user: User) => {
                        loading(false);

                        if (user) {
                            localStorage.removeItem('user');

                            setIsSignedIn(false);
                            setUser(null);
                            authContext.setIsSignedIn(false);
                            authContext.setUser(null);
                        }

                        resolve(user);
                    })
                    .catch((err: BackendError<any>) => {
                        loading(false);

                        reject(err);
                    });
            } else {
                loading(false);
                reject(new Error('User is not logged in'));
            }
        });
    }, [authContext, loading, user]);

    return { user, setUser, isSignedIn, setIsSignedIn, signIn, signOut };
};

export default useAuth;
