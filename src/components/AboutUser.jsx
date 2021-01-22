import React from "react";
import {bindActionCreators} from "redux";
import userActionsCreators from "../actions/user";
import {connect} from "react-redux";

class AboutUser extends React.Component{


    componentDidMount() {
        let error = localStorage.getItem("error_401");
        if (!error){
            this.props.actions.fetchUser();
        }
        else {
            this.props.actions.refreshToken();
            this.props.actions.fetchUser();
        }
    }

    render() {
        return (
            <>
                <h3>Информация о пользователе</h3>
                <table className={"table table-bordered table-striped"}>
                    <tbody>
                    <tr>
                        <td>id пользователя</td>
                        <td>{this.props.user.user.client_id}</td>
                    </tr>
                    <tr>
                        <td>Имя</td>
                        <td>{this.props.user.user.name}</td>
                    </tr>
                    <tr>
                        <td>Фамилия</td>
                        <td>{this.props.user.user.surname}</td>
                    </tr>
                    <tr>
                        <td>Телефон</td>
                        <td>{this.props.user.user.phone}</td>
                    </tr>
                    </tbody>

                </table>
            </>


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

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(AboutUser);


export default Wrapped;