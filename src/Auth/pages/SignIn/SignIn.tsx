import React from 'react';

import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

import { Page } from '../../../shared/layout';

import { SignInForm } from '../../components';

import './SignIn.scss';

export interface SignInProps {
    onFinish?: () => void;
}

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
    const { onFinish } = props;

    return (
        <Page pageTitle="Sign In">
            <EuiFlexGroup justifyContent="spaceAround">
                <EuiFlexItem grow={false}>
                    <SignInForm onFinish={onFinish} />
                </EuiFlexItem>
            </EuiFlexGroup>
        </Page>
    );
};

export default SignIn;
