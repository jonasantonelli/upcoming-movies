import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Upcoming from './containers/Upcoming/Upcoming.jsx';
import Details from './containers/Details/Details.jsx';
import NotFound from './containers/NotFound.jsx';

import './App.scss';

const ROUTES = {
    UPCOMING: '/upcoming',
    DETAILS: '/details/:id'
};

class App extends Component {
    render() {

        return (
            <main role="main" className="app">
                <Route render={({location}) => (
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/" component={() => <Redirect to={{pathname: ROUTES.UPCOMING}} />} />
                        <Route key="upcoming" path={ROUTES.UPCOMING} component={Upcoming} />
                        <Route key="details" path={ROUTES.DETAILS} component={Details} />
                        <Route key="notfound" path="*" component={NotFound} />
                    </Switch>
                    )}
                />
            </main>
        );
    }
}

export default withRouter(App);
