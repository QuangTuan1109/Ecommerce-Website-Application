import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegisterUser.scss';
import logo from '../../assets/images/logo-website.png';
import vietnamData from './vietnam-data.json';

class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Fullname: '',
            Image: '',
            Address: '',
            Sex: '',
            Nation: '',
            DOB: '',
            Province: '',
            City: '',
            Phone: '',
            Email: '',
            Password: '',
            confirmPassword: '',
            provinces: [],
            cities: []
        };
    }

    componentDidMount() {
        // Get list of provinces from imported JSON data
        const provinces = vietnamData.provinces.map(province => province.name);
        this.setState({ provinces });
    }

    handleProvinceChange = (event) => {
        const provinceName = event.target.value;
        // Find the selected province in the imported JSON data
        const selectedProvince = vietnamData.provinces.find(province => province.name === provinceName);
        // Get list of cities in the selected province
        const cities = selectedProvince ? selectedProvince.cities : [];
        this.setState({ cities, Province: provinceName });
    }

    handleCityChange = (event) => {
        this.setState({ City: event.target.value });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                Image: reader.result
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Dispatch action to submit registration data
        // Example: this.props.registerUser(this.state);
    }

    render() {
        return (
            <div className='register-container'>
                <div className='form-container'>
                    <div className='form-section'>
                        <h2>Register</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <input type='file' id='image' className='input-file' onChange={this.handleImageChange} />
                                <label htmlFor='image-avt' className='image-label'>
                                    <div className='image-upload-avt'>
                                        {!this.state.Image && <span>Upload Avatar</span>}
                                        {this.state.Image && <img src={this.state.Image} alt='Uploaded' className='uploaded-image' />}
                                    </div>
                                </label>
                            </div>

                            <div className='form-group'>
                                <input type='text' name='Fullname' value={this.state.Fullname} onChange={this.handleChange} placeholder='Fullname' required />
                            </div>
                            <div className='form-group'>
                                <input type='text' name='Address' value={this.state.Address} onChange={this.handleChange} placeholder='Address' />
                            </div>
                            <div className='form-group'>
                                <select name='Sex' value={this.state.Sex} onChange={this.handleChange} required>
                                    <option value=''>Sex</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <input type='text' name='Nation' value={this.state.Nation} onChange={this.handleChange} placeholder='Nation' />
                            </div>
                            <div className='form-group'>
                                <input type='date' name='DOB' value={this.state.DOB} onChange={this.handleChange} placeholder='Date of Birth' />
                            </div>
                            <div className='form-group'>
                                <select name='Province' value={this.state.Province} onChange={this.handleProvinceChange} required>
                                    <option value=''>Select Province</option>
                                    {this.state.provinces.map(province => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <select name='City' value={this.state.City} onChange={this.handleCityChange} required>
                                    <option value=''>Select City</option>
                                    {this.state.cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group'>
                                <input type='text' name='Phone' value={this.state.Phone} onChange={this.handleChange} placeholder='Phone' required />
                            </div>
                            <div className='form-group'>
                                <input type='email' name='Email' value={this.state.Email} onChange={this.handleChange} placeholder='Email' required />
                            </div>
                            <div className='form-group'>
                                <input type='password' name='Password' value={this.state.Password} onChange={this.handleChange} placeholder='Password' required />
                            </div>
                            <div className='form-group'>
                                <input type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleChange} placeholder='Confirm Password' required />
                            </div>
                            <div className='form-group'>
                                <button type='submit'>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
