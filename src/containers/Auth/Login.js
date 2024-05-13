import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import axios from '../../axios'
import { customerLoginSuccess } from '../../store/actions';


import logo from '../../assets/images/logo-website.png'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
            isShowPassword: false
        }
    }

    handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/signin', {
                Email: this.state.Email,
                Password: this.state.Password
            });
            
            if (response.success) {
                localStorage.setItem('accessToken', response.token);
                this.props.customerLoginSuccess()
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
    

    handelOnchangeUsername = (event) => {
        this.setState({
            Email: event.target.value
        })
    }

    handelOnchangePassword = (event) => {
        this.setState({
            Password: event.target.value
        })
    }

    handelShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' 
                             className='form-control' 
                             placeholder='Enter your username'
                             value={this.state.Email}
                             onChange={(event) => this.handelOnchangeUsername(event)}
                             />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Enter your password' 
                                onChange={(event) => this.handelOnchangePassword(event)}/>
                                <span onClick={() => this.handelShowHidePassword()}>
                                    <i class={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={this.handleLogin}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i class="fab fa-google google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
                <div className='intro-container'>
                    <div className='intro-content'>
                        <div className='col-12 logo-image'>
                            <img src={logo} alt={'logo'}/>
                        </div>
                        <div className='col-12 intro-text'>
                            <span>E-shopping is an e-commerce website that is loved by most of the countries in the world today.
                                 In addition to the usual shopping functions, E-shopping also develops a number of other functions to increase the user experience.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        customerLoginSuccess: () => dispatch(customerLoginSuccess()), 
        customerLoginFail: () => dispatch(actions.customerLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
