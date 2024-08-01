import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { baseURL } from '../../variable';
import axios from 'axios';
import { getNavmenu } from '../../redux/NavMenu/navmenu.action';
import { useDispatch, useSelector } from 'react-redux';
import { navbarReducer } from '../../redux/NavMenu/navmenu.reducer';
import { useNavigate } from 'react-router-dom';


const dropdownMenu = [
    { id: 1, label: 'About Us', link: '/web/about-us' },
    { id: 2, label: 'Home', link:'/' },
    { id: 3, label: 'Products', link:'/web/products' },
    { id: 4, label: 'Services', link:'/web/services' },
    { id: 5, label: 'Contact Us', link:'/web/contact-us' },
    { id: 6, label: 'Projects', link:'/web/projects' }

];

function AdminAddNavbar() {
    const [navbarName, setNavbarName] = useState('');
    const [navMenuDesc, setNavMenuDesc] = useState('');
    const [sequenceNo, setSequenceNo] = useState('');
    const [icon, setIcon] = useState(null);
    const [bgImg, setBgImg] = useState(null);
    const [display,setDisplay] = useState('');
    const [menuLink, setMenuLink] = useState('');
    const dispatch = useDispatch();
    const navmenu = useSelector(state => state.navbarMenu.navmenu);
    //console.log("navmenu",navmenu);
    const navigate = useNavigate();


    useEffect(() => {  
        console.log("in use effect");  
        dispatch(getNavmenu());
      }, []);


    const handleMenuChange = (event) => {
        const selectedMenu = dropdownMenu.find(item => item.label === event.target.value);
        if (selectedMenu) {
            setNavbarName(selectedMenu.label);
            setMenuLink(selectedMenu.link);
        } else {
            setNavbarName('');
            setMenuLink('');
        }
    };

    const handleSequenceChange = (event) => {
        setSequenceNo(event.target.value);
    };

    const handleMenuDescriptionChange = (value) => {
        setNavMenuDesc(value);
    };

    const handleMenuIconChange = (event) => {
        const file = event.target.files[0];
        setIcon(file);
    };

    const handleBackgroundImageChange = (event) => {
        const file = event.target.files[0];
        setBgImg(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Create a FormData object
        const formData = new FormData();
        formData.append('navbarName', navbarName);
        formData.append('sequenceNo', sequenceNo);
        formData.append('navMenuDesc', navMenuDesc);
        formData.append('icon', icon);
        formData.append('bgImg', bgImg);
        formData.append('display', display);
        formData.append('link', menuLink);  // Include the menu link
    
        try {
            // Make the POST request using Axios
            const response = await axios.post(`${baseURL}new-nav-menu`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API response:', response.data);
            navigate('/admin/nav-menu')
    
            // Add any additional logic after a successful API call
        } catch (error) {
            console.error('API error:', error);
    
            // Handle errors or show error messages to the user
        }
    };

    const filteredMenu = dropdownMenu.filter(
        menu => !navmenu.some(nav => nav.n_menu_name === menu.label)
    );

    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Navbar Menu</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                                <label htmlFor="selectMenu">Select Menu</label>
                                                <select
                                                    className="form-control"
                                                    id="selectMenu"
                                                    value={navbarName}
                                                    onChange={handleMenuChange}
                                                    required
                                                >
                                                    <option value="">-- Select Menu --</option>
                                                    {filteredMenu.map(item => (
                                                        <option key={item.id} value={item.label}>
                                                            {item.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                {navbarName && (
                                                    <p>Selected Menu: {navbarName}</p>
                                                )}
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="sequenceNo">Sequence No</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="sequenceNo"
                                                    value={sequenceNo}
                                                    onChange={handleSequenceChange}
                                                    placeholder="Enter sequence number"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="navMenuDesc">Menu Description</label>
                                            <div style={{ height: '120px', overflowY: 'auto' }}>
                                                <ReactQuill
                                                    value={navMenuDesc}
                                                    onChange={handleMenuDescriptionChange}
                                                    theme="snow"
                                                    style={{ height: '60%' }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="icon">Upload Menu Icon</label>
                                            <input
                                                type="file"
                                                className="form-control-file"
                                                id="icon"
                                                onChange={handleMenuIconChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="bgImg">Upload Background Image</label>
                                            <input
                                                type="file"
                                                className="form-control-file"
                                                id="bgImg"
                                                onChange={handleBackgroundImageChange}
                                                required
                                            />
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
                                        </div>                                        </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminAddNavbar;
