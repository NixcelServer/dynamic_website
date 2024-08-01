import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { baseURL, imgURL } from '../../variable';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs } from '../../redux/Company/company.action';

function AboutUs() {

    const [aboutUsDesc,setAboutUsDesc] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [fileName, setFileName] = useState('Choose file');
    const dispatch = useDispatch();
    const aboutUs = useSelector(state => state.companyDetails.aboutUs);


    useEffect(() => {
        dispatch(getAboutUs());
    }, [dispatch]);

    

      useEffect(() => {
    if (aboutUs ) {
      setAboutUsDesc(aboutUs.cmp_desc);
      if (aboutUs.cmp_desc_img_path) {
        setLogoPreview(`${imgURL}${aboutUs.cmp_desc_img_path}`);
        // setFileName('Current logo');
      }
    }
  }, [aboutUs]);

    const handleAboutUsDescChange = (value) => {
        setAboutUsDesc(value);
    };

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
    const handleSubmit=async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('companyDesc',aboutUsDesc);
        formData.append('imgs',logoFile);

        try {
            // Make the POST request using Axios
            const response = await axios.post(`${baseURL}edit-about-us`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API response:', response.data);
            // navigate('/admin/nav-menu')
    
            // Add any additional logic after a successful API call
        } catch (error) {
            console.error('API error:', error);
    
            // Handle errors or show error messages to the user
        }
    }
  return (
    <div>
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                   
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">About Us</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-row">
                                    
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="navMenuDesc">About Us Description</label>
                                            <div style={{ height: '250px', overflowY: 'auto' }}>
                                                <ReactQuill
                                                    value={aboutUsDesc}
                                                    onChange={handleAboutUsDescChange}
                                                    theme="snow"
                                                    style={{ height: '60%' }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                       
                                        <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="companyLogo">Upload Image</label>
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
                                    </div>
                                    <div className="form-group col-md-6">
                                        {logoPreview && (
                                            <div className="mt-2">
                                                <img src={logoPreview} alt="Company Logo" style={{ width: '100px', height: '100px' }} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                       

                                        <div className="form-group text-right">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>                                        </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default AboutUs
