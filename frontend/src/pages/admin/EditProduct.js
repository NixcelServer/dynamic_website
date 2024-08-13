import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNavmenu, getSubMenu1, getSubMenu2 } from '../../redux/NavMenu/navmenu.action';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { baseURL, imgURL } from '../../variable';
import { useLocation, useNavigate } from 'react-router-dom';

function EditProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [prodName, setProdName] = useState('');
    const [encProdId, setEncProdId] = useState('');
    const [selectedMenuId, setSelectedMenuId] = useState('');
    const [selectedSubMenu1Id, setSelectedSubMenu1Id] = useState('');
    const [selectedSubMenu2Id, setSelectedSubMenu2Id] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [display, setDisplay] = useState('');
    const [logoPreviews, setLogoPreviews] = useState([null, null, null, null]);
    const [logoFiles, setLogoFiles] = useState([null, null, null, null]);
    const [removedImgIds, setRemovedImgIds] = useState([]); // Track removed image IDs

    const { item } = location.state || {};
    console.log(item);

    const navmenu = useSelector(state => state.navbarMenu.navmenu);
    const submenu1 = useSelector(state => state.navbarMenu.submenu1);
    const submenu2 = useSelector(state => state.navbarMenu.submenu2);

    useEffect(() => {
        dispatch(getNavmenu());
        if (item) {
            // Pre-fill form with existing product data
            setEncProdId(item.encProdId || '');
            setProdName(item.prod_name || '');
            setSelectedMenuId(item.encNavMenuId || '');
            setSelectedSubMenu1Id(item.encSubMenu1Id || '');
            setSelectedSubMenu2Id(item.encSubMenu2Id || '');
            setProdDesc(item.prod_desc || '');
            setDisplay(item.show_status || '');
            // Set image previews if available
            // Pre-fill images and ensure there are 4 slots
        const previews = item.images.map(img => `${imgURL}${img.prod_img_path}`);
        while (previews.length < 4) {
            previews.push(null);
        }
        const files = item.images.map(() => null); // Assuming you don't need to set files for existing images
        while (files.length < 4) {
            files.push(null);
        }
        setLogoPreviews(previews);
        setLogoFiles(files);
        }
    }, [dispatch, item]);

    const handleNameChange = (event) => setProdName(event.target.value);

    const handleMenuChange = (event) => {
        const selectedMenuId = event.target.value;
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

    const handleSubMenu2Change = (event) => setSelectedSubMenu2Id(event.target.value);

    const handleProdDescChange = (value) => setProdDesc(value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('encProdId',encProdId);
        formData.append('prodName', prodName);
        formData.append('encNavMenuId', selectedMenuId);
        formData.append('encSubMenu1Id', selectedSubMenu1Id);
        formData.append('encSubMenu2Id', selectedSubMenu2Id);
        formData.append('prodDesc', prodDesc);
         // Extract IDs of existing images
         const existingImgIds = item.images
         .filter(img => !removedImgIds.includes(img.encImgId))
         .map(img => img.encImgId); // Filter out removed images

     formData.append('existingProdImgIds', JSON.stringify(existingImgIds));

    // Include new files in formData
    logoFiles.forEach((file, index) => {
        if (file) formData.append(`prodImgs[${index}]`, file);
    });

    formData.forEach((value, key) => {
        console.log(key, value);
    });

    formData.append('display', display);
        try {
            const response = await axios.post(`${baseURL}update-product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API response:', response.data);
            navigate('/admin/products');
        } catch (error) {
            console.error('API error:', error);
        }
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        const updatedFiles = [...logoFiles];
        updatedFiles[index] = file;
        setLogoFiles(updatedFiles);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedPreviews = [...logoPreviews];
                updatedPreviews[index] = reader.result;
                setLogoPreviews(updatedPreviews);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        // Record removed image ID
        if (item && item.images[index]) {
            setRemovedImgIds([...removedImgIds, item.images[index].encImgId]);
        }

        const updatedPreviews = [...logoPreviews];
        updatedPreviews[index] = null;
        setLogoPreviews(updatedPreviews);

        const updatedFiles = [...logoFiles];
        updatedFiles[index] = null;
        setLogoFiles(updatedFiles);
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
                                <h3 className="card-title">Products</h3>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="sequenceNo">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="sequenceNo"
                                                value={prodName}
                                                onChange={handleNameChange}
                                                placeholder="Enter Product Name"
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
                                    <label htmlFor="navMenuDesc">Product Description</label>
                                    <div style={{ height: '120px', overflowY: 'auto' }}>
                                        <ReactQuill
                                            value={prodDesc}
                                            onChange={handleProdDescChange}
                                            theme="snow"
                                            style={{ height: '60%' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row">
                <label htmlFor="companyLogo">Add Images</label>
                {logoPreviews.map((preview, index) => (
                    <div className="form-group col-md-2 position-relative" key={index} style={{ padding: '0 2px', marginBottom: '0px' }}>
                        <label htmlFor={`companyLogo${index}`} className="d-block text-center" style={{ marginBottom: '0px' }}>
                            {preview ? (
                                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto' }}>
                                    <img src={preview} alt={`Product Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
                                    <button
                                        type="button"
                                        className="close"
                                        aria-label="Close"
                                        style={{
                                            position: 'absolute',
                                            top: '0px',
                                            right: '0px',
                                            background: 'red',
                                            color: 'white',
                                            borderRadius: '50%',
                                            border: 'none',
                                            width: '24px',
                                            height: '24px',
                                            fontSize: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            padding: '0',
                                            lineHeight: '16px'
                                        }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ) : (
                                <span className="btn btn-outline-secondary d-block" style={{ width: '100px', height: '100px', lineHeight: '100px', margin: '0 auto' }}>+</span>
                            )}
                        </label>
                        <input
                            type="file"
                            className="form-control-file d-none"
                            id={`companyLogo${index}`}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, index)}
                        />
                    </div>
                ))}
                                </div>






            <div className="form-group" style={{ marginTop: '25px' }}>
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
  )
}

export default EditProduct
