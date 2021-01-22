import React from "react";
import {bindActionCreators} from "redux";
import userActionsCreators from "../actions/user";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

class Auth extends React.Component{
    constructor() {
        super();
    }

    render() {
        if (this.props.user.isTryToLogin) {
            return <p>Попытка залогиниться...</p>
        } else if (this.props.user.isLoggedIn) {
            console.log("Успешно авторизовался");
            return <Redirect to="/"/>
        } else if (this.props.user.errMsg) {
            alert("Ошибка, проверьте правильность ввода данных");
            this.props.actions.clearState();
        }
        return (
            <div>
                <h3>Авторизация</h3>
                <p>Если у Вас еще нет аккаунта, <Link to={"/signup/"}>зарегистрируйтесь</Link></p>
                <form className={"form"}>
                    <div className="form-group">
                        <label>Email адрес</label>
                        <input type="email" className="form-control" onChange={event => {
                            this.props.actions.saveUserLoginValue(event.target.value);
                        }}
                               aria-describedby="emailHelp" placeholder="Email"/>
                        <small className="form-text text-muted">Ваш email является Вашим логином</small>
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" onChange={event => {
                            this.props.actions.saveUserPasswordValue(event.target.value);
                        }}
                               placeholder="Пароль"/>
                    </div>
                    <button className="btn btn-primary" onClick={event => {
                        this.props.actions.onLogin();
                    }}>Авторизоваться
                    </button>
                </form>
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

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Auth);


export default Wrapped;