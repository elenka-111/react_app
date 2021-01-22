import React from "react";
import {Link, Redirect} from "react-router-dom"
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import userActionsCreators from "../actions/user";



class Registration extends React.Component{
    constructor() {
        super();
    }


    render() {
        if (this.props.user.isUserCreating) {
            return <p>Регистрация.....</p>
        } else if (this.props.user.userCreateSuccess) {
            alert("Регистрация прошла успешно!");
            return <Redirect to='/login'/>
        } else if (this.props.user.errMsg) {
            alert("Ошибка, проверьте корректность ввода и попробуйте еще раз.");
            this.props.actions.clearState();
        }
        return (
            <>
                <h3>Регистрация нового пользователя</h3>
                <p>Если у Вас уже есть аккаунт, то
                    <Link to={"/login/"}> авторизуйтесь</Link></p>
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
                    <div className="form-group">
                        <label>Телефон в международном формате</label>
                        <input type="еуче" className="form-control" onChange={event => {
                            this.props.actions.saveUserPhoneValue(event.target.value);
                        }}
                               placeholder="+79999999999"/>
                    </div>
                    <div className="form-group">
                        <label>Пригласительный код</label>
                        <input type="text" className="form-control" onChange={event => {
                            this.props.actions.saveUserInvitedValue(event.target.value);
                        }}
                               placeholder="Пригласительный код"/>
                    </div>
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" className="form-control" onChange={event => {
                            this.props.actions.saveUserNameValue(event.target.value);
                        }}
                               placeholder="Имя"/>
                    </div>
                    <div className="form-group">
                        <label>Фамилия</label>
                        <input type="text" className="form-control" onChange={event => {
                            this.props.actions.saveUserSurnameValue(event.target.value);
                        }}
                               placeholder="Фамилия"/>
                    </div>
                    <div className="form-group">
                        <label>Код страны</label>
                        <input type="text" className="form-control" onChange={event => {
                            this.props.actions.saveUserCountryKeyValue(event.target.value);
                        }}
                               placeholder="Код страны"/>
                    </div>
                    <button className="btn btn-primary" onClick={event => {
                        this.props.actions.createUser();
                    }}>Зарегистрироваться
                    </button>
                </form>
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

const Wrapped = connect(mapStateToProps, mapDispatchToProps)(Registration);


export default Wrapped;