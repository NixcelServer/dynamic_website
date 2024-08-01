import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNavmenu, getSubMenu1, getSubMenu2 } from '../../redux/NavMenu/navmenu.action';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { baseURL } from '../../variable';
import { useNavigate } from 'react-router-dom';

function AddService() {
    const dispatch = useDispatch();
    const [serviceName, setServiceName] = useState('');
    const [selectedMenuId, setSelectedMenuId] = useState('');
    const [selectedSubMenu1Id, setSelectedSubMenu1Id] = useState('');
    const [selectedSubMenu2Id, setSelectedSubMenu2Id] = useState('');
    const [serviceDesc,setServiceDesc] = useState('');
    const [display,setDisplay] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [logoFile, setLogoFile] = useState(null);
    const [fileName, setFileName] = useState('Choose file');
    const navigate = useNavigate();


    const navmenu = useSelector(state => state.navbarMenu.navmenu);
    const submenu1 = useSelector(state => state.navbarMenu.submenu1);
    const submenu2 = useSelector(state => state.navbarMenu.submenu2);

    useEffect(() => {
        dispatch(getNavmenu());
    }, [dispatch]);

    const handleNameChange = (event) => {
        setServiceName(event.target.value);
    };

    const handleMenuChange = (event) => {
        const selectedMenuId = event.target.value;
        console.log(selectedMenuId)
        setSelectedMenuId(selectedMenuId);

        if (selectedMenuId) {
            dispatch(getSubMenu1(selectedMenuId));
            setSelectedSubMenu1Id('');
            setSelectedSubMenu2Id('');
        } else {
            setSelectedSubMenu1Id('');
            setSelectedSubMenu2Id('');
        }
    };

    const handleSubMenu1Change = (event) => {
        const selectedSubMenu1Id = event.target.value;
        setSelectedSubMenu1Id(selectedSubMenu1Id);
        if (selectedSubMenu1Id) {
            dispatch(getSubMenu2(selectedSubMenu1Id));
            setSelectedSubMenu2Id('');
        } else {
            setSelectedSubMenu2Id('');
        }
    };

    const handleSubMenu2Change = (event) => {
        setSelectedSubMenu2Id(event.target.value);
    };

    const handleServiceDescChange = (value) => {
        setServiceDesc(value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        // Handle form submission logic here

        //  // Create a FormData object
         const formData = new FormData();
         formData.append('serviceName', serviceName);
         formData.append('encNavMenuId', selectedMenuId);
         formData.append('encSubMenu1Id', selectedSubMenu1Id);
         formData.append('encSubMenu2Id', selectedSubMenu2Id);
         formData.append('serviceDesc', serviceDesc);
         formData.append('serviceImgs[]', logoFile);
         formData.append('display', display);
         //formData.append('link', menuLink);  // Include the menu link

         formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            // Make the POST request using Axios
            const response = await axios.post(`${baseURL}new-service`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API response:', response.data);
            navigate('/admin/services')
    
            // Add any additional logic after a successful API call
        } catch (error) {
            console.error('API error:', error);
    
            // Handle errors or show error messages to the user
        }
    };

    const handleFileChange = (e) => {
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

    return (
        <div>
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Services</h3>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="sequenceNo">Service Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="sequenceNo"
                                                        value={serviceName}
                                                        onChange={handleNameChange}
                                                        placeholder="Enter Service Name"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="selectMenu">Select Navbar Menu</label>
                                                    <select
                                                        className="form-control"
                                                        id="selectMenu"
                                                        value={selectedMenuId}
                                                        onChange={handleMenuChange}
                                                        required
                                                    >
                                                        <option value="">-- Select Menu --</option>
                                                        {navmenu.map(item => (
                                                            <option key={item.encNavMenuId} value={item.encNavMenuId}>
                                                                {item.n_menu_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            {submenu1.length > 0 && (
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="selectSubMenu1">Select Sub Menu 1</label>
                                                        <select
                                                            className="form-control"
                                                            id="selectSubMenu1"
                                                            value={selectedSubMenu1Id}
                                                            onChange={handleSubMenu1Change}
                                                            required
                                                        >
                                                            <option value="">-- Select Sub Menu 1 --</option>
                                                            {submenu1.map(item => (
                                                                <option key={item.encSubMenu1Id} value={item.encSubMenu1Id}>
                                                                    {item.sub_menu_1_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {submenu2.length > 0 && (
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="selectSubMenu2">Select Sub Menu 2</label>
                                                            <select
                                                                className="form-control"
                                                                id="selectSubMenu2"
                                                                value={selectedSubMenu2Id}
                                                                onChange={handleSubMenu2Change}
                                                                
                                                            >
                                                                <option value="">-- Select Sub Menu 2 --</option>
                                                                {submenu2.map(item => (
                                                                    <option key={item.encSubMenu2Id} value={item.encSubMenu2Id}>
                                                                        {item.sub_menu_2_name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                             <div className="form-group">
                                            <label htmlFor="navMenuDesc">Service Description</label>
                                            <div style={{ height: '120px', overflowY: 'auto' }}>
                                                <ReactQuill
                                                    value={serviceDesc}
                                                    onChange={handleServiceDescChange}
                                                    theme="snow"
                                                    style={{ height: '60%' }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="companyLogo">Service Image</label>
                        <input
                          type="file"
                          className="form-control-file d-none"
                          id="companyLogo"
                          accept="image/*"
                          onChange={handleFileChange}
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
        </div>
    );
}

export default AddService;
