import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { baseURL, imgURL } from '../../variable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCmpDetails } from '../../redux/Company/company.action';
// 

function CompanyDetails() {
  const stepper1Ref = useRef(null);
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [fileName, setFileName] = useState('Choose file');
  const company = useSelector(state => state.companyDetails.company);
  const socialInfo = useSelector(state => state.companyDetails.socialInfo);

  //const submenu2 = useSelector(state => state.navbarMenu.submenu2)

  const [formValues, setFormValues] = useState({
    companyName: '',
    email: '',
    mobile: '',
    altMobile: '',
    landline: '',
    altLandline: '',
    instaURL:'',
    fbURL:'',
    linkedinURL:'',
    googleURL:'',
    website:''
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const stepper1Node = document.querySelector('#stepper1');
    stepper1Ref.current = new Stepper(stepper1Node);

     // Dispatch action to fetch company details
     dispatch(getCmpDetails());

    stepper1Node.addEventListener('show.bs-stepper', (event) => {
      console.warn('show.bs-stepper', event);
    });

    stepper1Node.addEventListener('shown.bs-stepper', (event) => {
      console.warn('shown.bs-stepper', event);
    });

    // Cleanup event listeners on unmount
    return () => {
      stepper1Node.removeEventListener('show.bs-stepper', () => {});
      stepper1Node.removeEventListener('shown.bs-stepper', () => {});
    };
  }, []);

  useEffect(() => {
    if (company && socialInfo) {
      setFormValues({
        companyName: company.c_name || '',
        email: company.c_email_id || '',
        mobile: company.c_mobile_no || '',
        altMobile: company.c_alt_mobile_no || '',
        landline: company.c_landline_no || '',
        altLandline: company.c_alt_landline_no || '',
        instaURL: socialInfo.instagram_url || '',
        fbURL: socialInfo.facebook_url || '',
        linkedinURL: socialInfo.linkedin_url || '',
        googleURL: socialInfo.google_url || '',
        website: company.c_website || '',
      });
      if (company.c_logo_path) {
        setLogoPreview(`${imgURL}${company.c_logo_path}`);
        // setFileName('Current logo');
      }
    }
  }, [company, socialInfo]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setLogoPreview(null);
      setFileName('Choose file');
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add form submission logic here
    if (validateForm()) {
        const formData = new FormData();
        formData.append('companyName', formValues.companyName);
        formData.append('email', formValues.email);
        formData.append('mobile', formValues.mobile);
        formData.append('altMobile', formValues.altMobile);
        formData.append('landline', formValues.landline);
        formData.append('altLandline', formValues.altLandline);
        formData.append('instaURL', formValues.instaURL);
        formData.append('fbURL', formValues.fbURL);
        formData.append('linkedinURL', formValues.linkedinURL);
        formData.append('googleURL', formValues.googleURL);
        formData.append('website', formValues.website);
        if (logoFile) {
          formData.append('logo', logoFile);
        }
    console.log('Form Submitted', formValues);
    

    try {
        // Make the POST request using Axios
        const response = await axios.post(`${baseURL}company-details`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        window.location.reload();
        console.log('API response:', response.data);
        // dispatch(getSubMenu1(item.encNavMenuId));
        // setShowAddModal(false);
        // Add any additional logic after a successful API call
      } catch (error) {
        console.error('API error:', error);
  
        // Handle errors or show error messages to the user
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.companyName) {
      newErrors.companyName = 'Company Name is required';
    }
    if (!formValues.email) {
      newErrors.email = 'Email Address is required';
    }
    if (!formValues.mobile || formValues.mobile.replace(/_/g, '').length !== 10) {
      newErrors.mobile = 'Mobile No should be 10 digits';
    }
    if (formValues.altMobile && formValues.altMobile.replace(/_/g, '').length !== 10) {
      newErrors.altMobile = 'Alt Mobile No should be 10 digits';
    }
    if (formValues.landline && formValues.landline.replace(/_/g, '').length !== 10) {
      newErrors.landline = 'Landline No should be 10 digits';
    }
    if (formValues.altLandline && formValues.altLandline.replace(/_/g, '').length !== 10) {
      newErrors.altLandline = 'Alt Landline No should be 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      stepper1Ref.current.next();
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-1">
            <h2>Company Details</h2>
            <form onSubmit={handleSubmit}>
              <div id="stepper1" className="bs-stepper">
                <div className="bs-stepper-header" style={{ marginBottom: '10px' }}>
                  <div className="step" data-target="#test-l-1">
                    <button type="button" className="btn step-trigger">
                      <span className="bs-stepper-circle">1</span>
                      <span className="bs-stepper-label">Basic Details</span>
                    </button>
                  </div>
                  <div className="line"></div>
                  <div className="step" data-target="#test-l-2">
                    <button type="button" className="btn step-trigger">
                      <span className="bs-stepper-circle">2</span>
                      <span className="bs-stepper-label">Social Info</span>
                    </button>
                  </div>
                </div>
                <div className="bs-stepper-content">
                  <div id="test-l-1" className="content">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="companyName"
                          name="companyName"
                          placeholder="Enter Company Name"
                          value={formValues.companyName}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.companyName && <small className="text-danger">{errors.companyName}</small>}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="email">Email Address:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-envelope" /></span>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={formValues.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="mobile">Mobile No:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">+91</span>
                          </div>
                          <InputMask
                            mask="9999999999"
                            maskChar=""
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter Mobile Number"
                            value={formValues.mobile}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="altMobile">Alt Mobile No:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">+91</span>
                          </div>
                          <InputMask
                            mask="9999999999"
                            maskChar=""
                            className="form-control"
                            id="altMobile"
                            name="altMobile"
                            placeholder="Enter Alternate Mobile Number"
                            value={formValues.altMobile}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.altMobile && <small className="text-danger">{errors.altMobile}</small>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="landline">Landline No:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">+91</span>
                          </div>
                          <InputMask
                            mask="9999999999"
                            maskChar=""
                            className="form-control"
                            id="landline"
                            name="landline"
                            placeholder="Enter Landline Number"
                            value={formValues.landline}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.landline && <small className="text-danger">{errors.landline}</small>}
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="altLandline">Alt Landline No:</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">+91</span>
                          </div>
                          <InputMask
                            mask="9999999999"
                            maskChar=""
                            className="form-control"
                            id="altLandline"
                            name="altLandline"
                            placeholder="Enter Alternate Landline Number"
                            value={formValues.altLandline}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.altLandline && <small className="text-danger">{errors.altLandline}</small>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="companyLogo">Company Logo</label>
                        <input
                          type="file"
                          className="form-control-file d-none"
                          id="companyLogo"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={fileName}
                            readOnly
                          />
                          <div className="input-group-append">
                            <label className="btn btn-outline-secondary" htmlFor="companyLogo">Browse</label>
                          </div>
                        </div>
                        {logoPreview && (
                          <div className="mt-2">
                            <img src={logoPreview} alt="Company Logo" style={{ width: '100px', height: '100px' }} />
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
                  </div>
                  <div id="test-l-2" className="content">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="instagramURL">Instagram URL</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fab fa-instagram"></i></span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="instagramURL"
                            name="instaURL"
                            placeholder="Enter Instagram URL"
                            value={formValues.instaURL}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="facebookURL">Facebook URL</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fab fa-facebook"></i></span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="facebookURL"
                            name="fbURL"
                            placeholder="Enter Facebook URL"
                            value={formValues.fbURL}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="googleURL">Google URL</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fab fa-google"></i></span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="googleURL"
                            name="googleURL"
                            placeholder="Enter Google URL"
                            value={formValues.googleURL}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="linkedinURL">LinkedIn URL</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fab fa-linkedin"></i></span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="linkedinURL"
                            name="linkedinURL"
                            placeholder="Enter LinkedIn URL"
                            value={formValues.linkedinURL}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="websiteURL">Website URL</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-globe"></i></span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="websiteURL"
                            name="website"
                            placeholder="Enter Website URL"
                            value={formValues.website}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="button" className="btn btn-primary" onClick={() => stepper1Ref.current.previous()}>Previous</button>
                      <button type="submit" className="btn btn-success">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
