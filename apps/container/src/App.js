import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import Header from './components/Header';
import { gql, useMutation } from "@apollo/client";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const SIGNIN = gql`
    mutation Signin($email: String!, $password: String!){
        signin(credentials: {
            email: $email,
            password: $password
        }){
            userErrors {
                message
            }
            token
        }
    }
`;

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [signin, { data, loading }] = useMutation(SIGNIN);

    const handleClick = ($email, $password) => {
        signin({
            variables: {
                email: $email,
                password: $password
            }
        })
    };

    const [ error, setError ] = useState(null);
    useEffect(() => {
        if(data){
            if(data.signin.userErrors.length){
                setError(data.signin.userErrors[0].message);
            }
            if(data.signin.token){
                localStorage.setItem("token", data.signin.token);
                setIsSignedIn(true);
            }
        }
    });

    useEffect(() => {
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={ handleClick } />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy}></Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};