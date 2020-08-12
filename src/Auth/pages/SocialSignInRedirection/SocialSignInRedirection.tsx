import React, { useEffect } from 'react';

import { EuiText, EuiLink } from '@elastic/eui';

import { useAuth } from '../../../shared/hooks';

import { Page } from '../../../shared/layout';

import './SocialSignInRedirection.scss';

const SocialSignInRedirection: React.FC = () => {
    const { socialSignInLocation } = useAuth();

    useEffect(() => redirectToSocialSignInLocation(), []);

    const redirectToSocialSignInLocation = () => {
        if (socialSignInLocation) {
            window.location.href = socialSignInLocation;
        }
    };

    return (
        <Page pageTitle="Social Sign In">
            <EuiText>
                Redirecting to Social Sign In URL.{' '}
                <EuiLink onClick={() => redirectToSocialSignInLocation()}>
                    Click here
                </EuiLink>{' '}
                if you don't get redirected.
            </EuiText>
        </Page>
    );
};

export default SocialSignInRedirection;
