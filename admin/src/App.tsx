import React from 'react';
import {Route, Switch} from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import HackathonsPage from "./pages/HackathonsPage";
import {GlobalStyles} from "./components/global-styles";
import NotFoundPage from "./pages/errors/NotFoundPage";
import {PAGES} from "./routes";
import HackathonDetailPage from "./pages/HackathonDetailPage";
import {UsersPage} from './pages/UsersPage';
import UserDetailPage from "./pages/UserDetailPage";
import HackathonEditPage from "./pages/HackathonEditPage";
import {UserEditPage} from './pages/UserEditPage';
import HackathonCreatePage from './pages/HackathonCreatePage';
import withAuth from "./components/withAuth";
import {TagsPage} from "./pages/TagsPage";

const App = () => {
    return (
        <>
            <GlobalStyles/>
            <Switch>
                <Route exact={true} path={PAGES.home} component={withAuth(Home)}/>
                <Route exact={true} path={PAGES.users} component={withAuth(UsersPage)}/>
                <Route exact={true} path={PAGES.userDetails.template} component={withAuth(UserDetailPage)}/>;
                <Route exact={true} path={PAGES.userEdit.template} component={withAuth(UserEditPage)}/>
                <Route exact={true} path={PAGES.auth} component={Auth}/>
                <Route exact={true} path={PAGES.hackathons} component={withAuth(HackathonsPage)}/>
                <Route exact={true} path={PAGES.hackCreate} component={withAuth(HackathonCreatePage)}/>
                <Route exact={true} path={PAGES.hackUpdate.template} component={withAuth(HackathonEditPage)}/>
                <Route exact={true} path={PAGES.hackDetails.template} component={withAuth(HackathonDetailPage)}/>
                <Route exact={true} path={PAGES.tags} component={withAuth(TagsPage)}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </>
    );
}

export default App;
