import Api from './Api';

import {
    BackendResponse,
    User,
    SignInInfo,
    SignInResult,
    SignOutResult
} from '@ffknob/elastic-apm-demo-shared';

export const signIn = (signInInfo: SignInInfo): Promise<User> => {
    const endpoint = '/users/signin';
    return new Promise<User>((resolve, reject) => resolve());
    /*
  return Api.post<BackendResponse<LoginResult>>(endpoint, loginInfo)
    .then(({ data }: any) => {
      if (data.data) {
        return data.data;
      } else {
        throw new Error(
          'An error has occured trying to get logging the user in'
        );
      }
    })
    .catch((err: any) => {
      throw err.response.data;
    });
    */
};

export const signOut = (user: User): Promise<User> => {
    const endpoint = '/users/signout';
    return new Promise<User>((resolve, reject) => resolve());
    /*
  return Api.post<BackendResponse<LogoutResult>>(endpoint, null, {
    headers: { Authorization: 'Bearer ' + user.token },
  })
    .then(({ data }: any) => data.data)
    .catch((err: any) => {
      throw err.response.data;
    });
    */
};

export default { signIn, signOut };
