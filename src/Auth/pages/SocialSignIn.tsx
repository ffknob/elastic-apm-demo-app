import React from 'react';

import { useAuth } from '../../shared/hooks';

import { Page } from '../../shared/layout/Page';

import './SocialSignIn.scss';

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
        <div
            dangerouslySetInnerHTML={{
                __html: socialSignInPage ? socialSignInPage.toString() : ''
            }}></div>
    );
};

export default SocialSignIn;
