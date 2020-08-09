import React, { useState, useEffect } from 'react';

import { EuiButtonEmpty, EuiPopover } from '@elastic/eui';

import { useAuth } from '../../../hooks';

import './UserAccountPopoverButton.scss';

export interface UserAccountPopoverButtonProps {
    isPopoverOpen: boolean;
    onPopoverOpen: () => void;
    onPopoverClose: () => void;
    signedInPopoverContent: React.ReactNode;
    notSignedInPopoverContent: React.ReactNode;
}

const UserAccountPopoverButton: React.FC<UserAccountPopoverButtonProps> = (
    props: UserAccountPopoverButtonProps
) => {
    const {
        isPopoverOpen: _isPopoverOpen,
        onPopoverOpen,
        onPopoverClose,
        signedInPopoverContent,
        notSignedInPopoverContent
    } = props;

    const {
        user,
        setUser,
        isSignedIn,
        setIsSignedIn,
        signIn,
        signOut
    } = useAuth();

    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(_isPopoverOpen);

    useEffect(() => setIsPopoverOpen(_isPopoverOpen), [_isPopoverOpen]);

    const openPopoverHandler = () => {
        setIsPopoverOpen(true);
        onPopoverOpen();
    };

    const closePopoverHandler = () => {
        setIsPopoverOpen(false);
        onPopoverClose();
    };

    const button = (
        <EuiButtonEmpty
            iconType="user"
            onClick={() =>
                isPopoverOpen ? closePopoverHandler() : openPopoverHandler()
            }></EuiButtonEmpty>
    );

    return (
        <EuiPopover
            ownFocus
            button={button}
            isOpen={isPopoverOpen}
            closePopover={() => closePopoverHandler()}
            anchorPosition="downRight">
            {isSignedIn ? signedInPopoverContent : notSignedInPopoverContent}
        </EuiPopover>
    );
};

export default UserAccountPopoverButton;
