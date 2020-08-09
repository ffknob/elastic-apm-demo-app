import React from 'react';

import { useAuth } from '../../shared/hooks';

import { Page } from '../../shared/layout/Page';

import './SocialSignIn.scss';

const SocialSignIn: React.FC = () => {
    const { socialSignInPage } = useAuth();

    return (
        <Page pageTitle="Sign In" full={true}>
            {socialSignInPage && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: socialSignInPage.toString()
                    }}></div>
            )}
        </Page>
    );
};

export default SocialSignIn;
