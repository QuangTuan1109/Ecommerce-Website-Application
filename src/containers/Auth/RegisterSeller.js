import React, { Component } from 'react';
import { connect } from 'react-redux';
import vietnamData from './vietnam-data.json';
import axios from '../../axios'

class RegisterSeller extends Component {
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

    handleRegister = async () => {
        try {
            const response = await axios.patch('http://localhost:5000/api/v1/signup-seller', {
                Fullname: this.state.Fullname,
                Image: this.state.Image,
                Address: this.state.Address,
                Phone: this.state.Phone,
                Email: this.state.Email,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }});
            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Error registering:', error.response.data.error.message);
        }
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
    }

    render() {
        return (
            <div className='register-container'>
                <div className='form-container'>
                    <div className='form-section'>
                        <h2>Register Seller Channel</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <input type='file' id='image' className='input-file' onChange={this.handleImageChange} />
                                <label htmlFor='image' className='image-label'>
                                    <div className='image-upload-avt'>
                                        {!this.state.Image && <span>Upload Avatar</span>}
                                        {this.state.Image && <img src={this.state.Image} alt='Uploaded' className='uploaded-image' />}
                                    </div>
                                </label>
                            </div>
                            <div className='form-group'>
                                <input type='text' name='Fullname' value={this.state.Fullname} onChange={this.handleChange} placeholder='Shop name' required />
                            </div>
                            <div className='form-group'>
                                <input type='text' name='Address' value={this.state.Address} onChange={this.handleChange} placeholder='Address' />
                            </div>
                            <div className='form-group'>
                                <input type='text' name='Phone' value={this.state.Phone} onChange={this.handleChange} placeholder='Phone' required />
                            </div>
                            <div className='form-group'>
                                <input type='email' name='Email' value={this.state.Email} onChange={this.handleChange} placeholder='Email' required />
                            </div>
                            <div className='form-group'>
                                <button type='submit' onClick={this.handleRegister}>Register</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSeller);
