import React, { useState, useCallback } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

import { Header } from './shared/layout/Header';
import { Body } from './shared/layout/Body';
import { Footer } from './shared/layout/Footer';
import { Home } from './Home/pages';
import { SocialSignIn } from './Auth/pages';

import Simulation from './Simulation/pages/Simulation';

import AppContext from './shared/context/AppContext';
import AuthContext from './shared/context/AuthContext';

import { useAuth } from './shared/hooks';
import { useLoading } from './shared/hooks';

import './App.scss';

const App: React.FC = () => {
    const { isLoading, loading } = useLoading();
    const {
        user,
        setUser,
        isSignedIn,
        setIsSignedIn,
        socialSignInLocation,
        setSocialSignInLocation,
        signIn,
        signOut,
        socialSignIn
    } = useAuth();

    return (
        <React.Fragment>
            <AppContext.Provider
                value={{
                    isLoading,
                    loading
                }}>
                <AuthContext.Provider
                    value={{
                        user,
                        isSignedIn,
                        setUser,
                        setIsSignedIn,
                        socialSignInLocation,
                        setSocialSignInLocation,
                        signIn,
                        signOut,
                        socialSignIn
                    }}>
                    <Router>
                        <Route>
                            <EuiFlexGroup direction="column">
                                <EuiFlexItem grow={false}>
                                    <Header />
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <Switch>
                                        <Body>
                                            <Route path="/" exact>
                                                <Home />
                                            </Route>
                                            <Route path="/simulate" exact>
                                                <Simulation />
                                            </Route>
                                            <Route path="/signin/social" exact>
                                                <SocialSignIn />
                                            </Route>
                                            <Redirect to="/" />
                                        </Body>
                                    </Switch>
                                </EuiFlexItem>
                                <EuiFlexItem grow={false}>
                                    <Footer />
                                </EuiFlexItem>
                            </EuiFlexGroup>
                        </Route>
                    </Router>
                </AuthContext.Provider>
            </AppContext.Provider>
        </React.Fragment>
    );
};

export default App;
