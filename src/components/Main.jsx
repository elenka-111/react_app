import React from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import userActionsCreators from "../actions/user";


import Header from "./Header";
import Footer from "./Footer";
import AboutUser from "./AboutUser"
import NotFound from "./NotFound"
import Registration from "./Registration"
import Auth from "./Auth"



class Main extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let access_token = localStorage.getItem("access_token");
        if (access_token){
            this.props.actions.userAlreadyLogin();
        }
    }

    render(){
        return (
            <div className={"wrap"}>
                <Header/>
                <div className={"container"}>
                    <div className={"content"}>
                        <Switch>
                            <Route
                                path="/"
                                exact
                                render={() => {
                                    if (!this.props.user.isLoggedIn){
                                        return (
                                                <Redirect to='/login'/>
                                            )
                                    }
                                    return (
                                        <AboutUser/>
                                    );
                                }}/>
                            <Route
                                path="/signup"
                                render={() => {
                                    if (this.props.user.isLoggedIn){
                                        return (
                                            <Redirect to='/'/>
                                        )
                                    }
                                    return (
                                        <Registration/>
                                    );
                                }}/>
                            <Route
                                path="/login"
                                render={() => {
                                    if (this.props.user.isLoggedIn){
                                        return (
                                            <Redirect to='/'/>
                                        )
                                    }
                                    return (
                                        <Auth/>
                                    );
                                }}/>

                            <Route
                                path='*'
                                component={NotFound}
                            />
                        </Switch>
                    </div>

                </div>
                <Footer/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ...state,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActionsCreators, dispatch),
    }
};

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Main);


export default Wrapped;