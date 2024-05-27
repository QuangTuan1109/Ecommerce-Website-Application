import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegisterUser.scss';
import vietnamData from './vietnam-data.json';
import axios from '../../axios'

import { handleAvatarUpload, handleAvatarDelete } from '../../method/handleMethod';
import CustomPopup from '../../components/CustomPopup';

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
            cities: [],
            popupType: '',
            onConfirm: null
        };
    }

    componentDidMount() {
        // Get list of provinces from imported JSON data
        const provinces = vietnamData.provinces.map(province => province.name);
        this.setState({ provinces });
    }

    handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/v1/signup', {
                Fullname: this.state.Fullname,
                Image: this.state.Image,
                Address: this.state.Address,
                Sex: this.state.Sex,
                Nation: this.state.Nation,
                DOB: this.state.DOB,
                ProvinceOrCity: `${this.state.City} - ${this.state.Province}`,
                Phone: this.state.Phone,
                Email: this.state.Email,
                Password: this.state.Password
            });
            this.showPopup('Your account registered successfully!', 'successful', this.handleSuccess);
        } catch (error) {
            this.showPopup('Failed to signup.', 'error', this.handleFailure);
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

    handleImageChange = async (event) => {
        const avt = this.state.Image
        const deletePreviousImage = async (imageSrc) => {
            if (imageSrc) {
                try {
                    const startIndex = imageSrc.indexOf('/o/') + 3;
                    const storagePath = imageSrc.substring(startIndex);
                    await handleAvatarDelete(storagePath, () => {
                        this.setState({ Image: ''});
                    }, 'delete-avt');
                } catch (error) {
                    console.error('Error deleting previous image:', error);
                }
            }
        };

        await deletePreviousImage(avt);

        handleAvatarUpload(event, (imageUrls) => {
            const imageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

            this.setState({ Image: imageUrl });
        }, (error) => {
            console.error('Error uploading image:', error);
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleCancel = () => {
        const { basicData, detailData, sellData, deliveryData, otherData } = this.state;
        const hasData = basicData || detailData || sellData || deliveryData || otherData;

        if (!hasData) {
            this.props.history.goBack();
        } else {
            this.showPopup('Are you sure you want to cancel?', 'confirm', this.confirmCancel);
        }
    }

    handleSuccess = () => {
        this.closePopup();
        this.props.history.push('/');
    }

    handleFailure = () => {
        this.closePopup();
    }

    confirmCancel = () => {
        this.closePopup();
        this.props.history.goBack();
    }

    showPopup = (message, type, onConfirm = null) => {
        this.setState({
            popupVisible: true,
            popupMessage: message,
            popupType: type,
            onConfirm: onConfirm
        });
    }

    closePopup = () => {
        this.setState({
            popupVisible: false,
            popupMessage: '',
            popupType: '',
            onConfirm: null
        });
    }

    render() {
        const { popupVisible, popupMessage, popupType, onConfirm } = this.state;

        return (
            <div className='register-container'>
                <div className='form-container'>
                    <div className='form-section'>
                        <h2>Register</h2>
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
                                <button type='submit' onClick={this.handleRegister}>Register</button>
                            </div>
                        </form>
                        {popupVisible && (
                            <CustomPopup
                                message={popupMessage}
                                type={popupType}
                                onClose={this.closePopup}
                                onConfirm={onConfirm}
                            />
                        )}
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
