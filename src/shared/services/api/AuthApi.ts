import { from } from 'rxjs';
import { v4 as uuid } from 'uuid';

import Api from './Api';

import {
    User,
    Request,
    BackendSuccess,
    BackendError,
    BackendRedirect,
    BackendResponse,
    SignInInfo,
    GenericError,
    SocialSignInProvider
} from '@ffknob/elastic-apm-demo-shared';
import { AxiosResponse } from 'axios';

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

export const socialSignIn = (provider: SocialSignInProvider): Request<null> => {
    const endpoint = `/auth/${provider}`;

    const request: Request<null> = {
        id: uuid(),
        request: {
            method: 'POST',
            endpoint: endpoint,
            data: null
        },
        time: {
            start: new Date()
        }
    };

    request.response$ = from<Promise<BackendResponse>>(
        Api.post<null, BackendRedirect<any>>(request)
            .then(({ status, statusText, data: { location, data } }: any) => {
                const backendRedirect: BackendRedirect<any> = {
                    success: true,
                    statusCode: status,
                    statusMessage: `${statusText} (${statusText})`,
                    location,
                    data
                };

                return backendRedirect;
            })
            .catch(
                ({
                    response: {
                        status,
                        statusText,
                        data: { metadata, statusMessage, errors }
                    }
                }: any) => {
                    const backendError: BackendError<GenericError<any>> = {
                        success: false,
                        statusCode: status,
                        statusMessage: `${statusText} (${statusMessage})`
                    };

                    return backendError;
                }
            )
    );

    return request;
};

export default { signIn, signOut, socialSignIn };
