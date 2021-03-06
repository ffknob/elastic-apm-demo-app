import React from 'react';

import {
    EuiPage,
    EuiPageBody,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiPageContent,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiPageContentBody,
    EuiTitle
} from '@elastic/eui';

import './Page.scss';

export interface PageProps {
    pageTitle?: string;
    contentTitle?: string;
    pageAbilities?: React.ReactNode;
    contentAbilities?: React.ReactNode;
    children?: React.ReactNode;
    full?: boolean;
}

const Page: React.FC<PageProps> = (props: PageProps) => {
    const {
        pageTitle,
        contentTitle,
        pageAbilities,
        contentAbilities,
        children,
        full
    } = props;

    const euiPage: React.ReactElement = (
        <EuiPage>
            <EuiPageBody component="div">
                <EuiPageHeader>
                    <EuiPageHeaderSection>
                        <EuiTitle size="l">
                            <h1>{pageTitle}</h1>
                        </EuiTitle>
                    </EuiPageHeaderSection>
                    <EuiPageHeaderSection>{pageAbilities}</EuiPageHeaderSection>
                </EuiPageHeader>
                <EuiPageContent>
                    <EuiPageContentHeader>
                        <EuiPageContentHeaderSection>
                            <EuiTitle>
                                <h2>{contentTitle}</h2>
                            </EuiTitle>
                        </EuiPageContentHeaderSection>
                        <EuiPageContentHeaderSection>
                            {contentAbilities}
                        </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiPageContentBody
                        children={children}></EuiPageContentBody>
                </EuiPageContent>
            </EuiPageBody>
        </EuiPage>
    );

    const page: React.ReactNode = children;

    return <>{full ? page : euiPage}</>;
};

export default Page;
