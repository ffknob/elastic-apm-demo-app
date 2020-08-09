import React, { useState } from 'react';
import { useHistory } from 'react-router';

import {
    EuiFormFieldset,
    EuiFormRow,
    EuiFieldText,
    EuiButton,
    EuiFieldPassword,
    EuiSwitch,
    EuiHorizontalRule,
    EuiText,
    EuiLink
} from '@elastic/eui';

import { useAuth } from '../../../shared/hooks';

import './NotSignedInPopoverContent.scss';
import { SocialSignInProvider } from '@ffknob/elastic-apm-demo-shared';

export interface NotSignedInPopoverContentProps {
    onFinish: () => void;
}

const NotSignedInPopoverContent: React.FC<NotSignedInPopoverContentProps> = (
    props: NotSignedInPopoverContentProps
) => {
    const { signIn, socialSignIn } = useAuth();
    const history = useHistory();

    const { onFinish } = props;

    const [username, setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [keepMeSignedIn, setKeepMeSignedIn] = useState<boolean>(false);

    const signInButtonHandler = () => {};

    const socialSignInHandler = (provider: SocialSignInProvider) => {
        socialSignIn(provider)
            .then((html: HTMLDocument) => {
                onFinish();
                history.push('/signin/social');
            })
            .catch(err => console.log(err));
    };

    return (
        <EuiFormFieldset legend={{ children: 'Sign in' }}>
            <EuiFormRow>
                <EuiFieldText
                    icon="user"
                    onChange={e => setUsername(e.target.value)}
                />
            </EuiFormRow>
            <EuiFormRow>
                <EuiFieldPassword onChange={e => setPassword(e.target.value)} />
            </EuiFormRow>
            <EuiFormRow>
                <EuiSwitch
                    label="Keep me signed in"
                    checked={keepMeSignedIn}
                    onChange={e => setKeepMeSignedIn(e.target.checked)}
                />
            </EuiFormRow>
            <EuiFormRow>
                <EuiButton fill onClick={() => signInButtonHandler()}>
                    Sign In
                </EuiButton>
            </EuiFormRow>

            <EuiFormRow>
                <EuiText size="xs">
                    Doesn't have an account?{' '}
                    <EuiLink href="/signup">Sign up</EuiLink> here.
                </EuiText>
            </EuiFormRow>

            <EuiHorizontalRule />

            <EuiFormRow>
                <EuiButton
                    fill
                    fullWidth
                    style={{
                        backgroundColor: '#007BB6',
                        borderColor: '#007BB6'
                    }}
                    onClick={() => socialSignInHandler('linkedin')}>
                    Linked In
                </EuiButton>
            </EuiFormRow>
            <EuiFormRow>
                <EuiButton
                    fill
                    fullWidth
                    style={{
                        backgroundColor: '#DD4B39',
                        borderColor: '#DD4B39'
                    }}
                    onClick={() => socialSignInHandler('google')}>
                    Google
                </EuiButton>
            </EuiFormRow>
            <EuiFormRow>
                <EuiButton
                    fill
                    fullWidth
                    style={{ backgroundColor: 'black' }}
                    onClick={() => socialSignInHandler('github')}>
                    Github
                </EuiButton>
            </EuiFormRow>
        </EuiFormFieldset>
    );
};

export default NotSignedInPopoverContent;
