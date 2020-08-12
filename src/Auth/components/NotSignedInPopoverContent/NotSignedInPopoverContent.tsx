import React, { useState } from 'react';

import { SignInForm } from '../../components';

import './NotSignedInPopoverContent.scss';

export interface NotSignedInPopoverContentProps {
    onFinish?: () => void;
}

const NotSignedInPopoverContent: React.FC<NotSignedInPopoverContentProps> = (
    props: NotSignedInPopoverContentProps
) => {
    const { onFinish } = props;

    return <SignInForm onFinish={onFinish} />;
};

export default NotSignedInPopoverContent;
