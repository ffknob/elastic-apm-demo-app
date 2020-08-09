import React from 'react';

import { useAuth } from '../../shared/hooks';

import { Page } from '../../shared/layout/Page';

import './SocialSignIn.scss';
import { Redirect } from 'react-router-dom';

const SocialSignIn: React.FC = () => {
    const { socialSignInPage } = useAuth();

    //return (
    //    <Page pageTitle="Sign In">
    //        {socialSignInPage && (
    //            <div
    //                dangerouslySetInnerHTML={{
    //                    __html: socialSignInPage.toString()
    //                }}></div>
    //        )}
    //    </Page>
    //);

    return (
        (socialSignInPage && (
            <div
                dangerouslySetInnerHTML={{
                    __html: socialSignInPage.toString()
                }}></div>
        )) || <Redirect to="/" />
    );
};

export default SocialSignIn;
