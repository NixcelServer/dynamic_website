import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import countrydata from '../../CountryState.json';
import { baseURL } from '../../variable';

const UpdateCompanyAddress = () => {
    const [display, setDisplay] = useState('');
    const [errors, setErrors] = useState({});
    const [states, setStates] = useState([]);
    const location = useLocation();
    const { item } = location.state || {};
    console.log(item);
    const [formValues, setFormValues] = useState({
        addressName: '',
        country: '',
        state: '',
        city: '',
        houseNo: '',
        area: '',
        pincode: '', // Added pincode to formValues
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // dispatch(getNavmenu());
    }, [dispatch]);


    useEffect(() => {
        if (item) {
            setFormValues(prevFormValues => ({
                ...prevFormValues,
                addressName: item.address_name || '',
                country: item.country || '',
                state: item.state || '',
                city: item.city_village || '',
                houseNo: item.house_no || '',
                area: item.area || '',
                pincode: item.pincode || '',
                encCmpAddressId: item.encCmpAddressId || '',
            }));
            
            const selectedCountryData = countrydata.find(country => country.country_name === item.country);
            if (selectedCountryData) {
                setStates(selectedCountryData.states);
            } else {
                setStates([]);
            }
            
        }
    }, [item]);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        const selectedCountryData = countrydata.find(country => country.country_name === selectedCountry);

        if (selectedCountryData) {
            setStates(selectedCountryData.states);
            setFormValues({ ...formValues, country: selectedCountry, state: '' });
        } else {
            setStates([]);
            setFormValues({ ...formValues, country: '', state: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formValues);
        const formData = new FormData();
        Object.keys(formValues).forEach(key => {
            formData.append(key, formValues[key]);
        });
        formData.append('display', display);

        try {
            const response = await axios.post(`${baseURL}update-company-address`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/admin/company-address');
        } catch (error) {
            console.error('API error:', error);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Company Address</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="addressName">Address Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="addressName"
                                                    name="addressName"
                                                    value={formValues.addressName}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-3">
                                                <label htmlFor="houseNo">Plot No. / House No.</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="houseNo"
                                                    name="houseNo"
                                                    value={formValues.houseNo}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter house number"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="area">Street / Area</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="area"
                                                    name="area"
                                                    value={formValues.area}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter area"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="city">City</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="city"
                                                    name="city"
                                                    value={formValues.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter city"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="country">Country</label>
                                                <select
                                                    className="form-control"
                                                    id="country"
                                                    name="country"
                                                    value={formValues.country}
                                                    onChange={handleCountryChange}
                                                    required
                                                >
                                                    <option value="">-- Select Country --</option>
                                                    {countrydata.map(item => (
                                                        <option key={item.country_name} value={item.country_name}>{item.country_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label htmlFor="state">State</label>
                                                <select
                                                    className="form-control"
                                                    id="state"
                                                    name="state"
                                                    value={formValues.state}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">-- Select State --</option>
                                                    {states.map(state => (
                                                        <option key={state.state_id} value={state.state_name}>{state.state_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="pincode">Pin Code</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="pincode"
                                                    name="pincode"
                                                    value={formValues.pincode}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter pin code"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="mr-2">Display this menu on website:</label>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    id="displayYes"
                                                    name="displayMenu"
                                                    className="form-check-input"
                                                    value="yes"
                                                    checked={display === 'yes'}
                                                    onChange={(e) => setDisplay(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="displayYes" className="form-check-label mr-3">Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    id="displayNo"
                                                    name="displayMenu"
                                                    className="form-check-input"
                                                    value="no"
                                                    checked={display === 'no'}
                                                    onChange={(e) => setDisplay(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="displayNo" className="form-check-label">No</label>
                                            </div>
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateCompanyAddress;
