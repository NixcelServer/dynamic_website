import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHPSliderImgs } from '../../redux/HomePage/homepage.action';
import { baseURL, imgURL } from '../../variable';
import axios from 'axios';
import Swal from 'sweetalert2';


function HPSliderImgs() {
    const dispatch = useDispatch();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [heading, setHeading] = useState('');
    const [logoPreview, setLogoPreview] = useState(null);
    const [subheadings, setSubheadings] = useState(['']);
    const [logoFile, setLogoFile] = useState(null);
    const [fileName, setFileName] = useState('Choose file');
    const [encHPSliderImgId,setEncHPSliderImgId] = useState('');
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const hpSliderImgs = useSelector(state => state.hpSliderImgs.hpSliderImgs);
    console.log(hpSliderImgs);

    useEffect(() => {
        dispatch(getHPSliderImgs());
    }, [dispatch]);

    const handleAddImg = () => {
        setFileInputKey(Date.now());
        setLogoFile(null);
        setHeading('');
        setLogoPreview(null);
        setSubheadings(['']);
        setLogoFile(null);
        setFileName('Choose file');
        setShowAddModal(true);
    };

    const handleEditImg = (item) => {
        console.log(item);
        setFileInputKey(Date.now());
        setLogoFile(null);
       // Add your logic to handle editing an image here
       setEncHPSliderImgId(item.encHPSliderImgId);
        setHeading(item.heading);
        setSubheadings(item.subheadings.map(sub => sub.sub_heading));
        setFileName(item.slider_img_path ? item.slider_img_path.replace('Home Page/', '') : '')
        if (item.slider_img_path) {
            setLogoPreview(`${imgURL}${item.slider_img_path}`);
            // setFileName('Current logo');
          }
          setShowUpdateModal(true);
    };


    const handleDeleteImg = async (item) => {
        const result = await Swal.fire({
          title: `Are you sure you want to delete this image?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel'
        });
    
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`${baseURL}delete-hp-slider-imgs/${item.encHPSliderImgId}`);
    
            if (response.status === 200) {
              Swal.fire(
                'Deleted!',
                response.data.message,
                'success'
              );
              // Refresh the nav menu list
              dispatch(getHPSliderImgs());
            } else {
              Swal.fire(
                'Error!',
                'There was a problem deleting the image .',
                'error'
              );
            }
          } catch (error) {
            Swal.fire(
              'Error!',
              'There was a problem deleting the image.',
              'error'
            );
          }
        }
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

    const handleAddSubheading = () => {
        setSubheadings([...subheadings, '']);
    };

    const handleSubheadingChange = (index, value) => {
        const newSubheadings = [...subheadings];
        newSubheadings[index] = value;
        setSubheadings(newSubheadings);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bgImg', logoFile);
        formData.append('heading', heading);
        subheadings.forEach((subheading, index) => {
            formData.append(`subheadings[${index}]`, subheading);
        });

        try {
            console.log(`${baseURL}add-hp-sliders-imgs`);
            const response = await axios.post(`${baseURL}add-hp-sliders-imgs`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            console.log('Response:', response.data);
            dispatch(getHPSliderImgs());
            setShowAddModal(false);
            // Handle success or any further actions
        } catch (error) {
            console.error('Error:', error);
            setShowAddModal(false);
            // Handle error or display a message
        }
    };

    const handleUpdate = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('encHPSliderImgId', encHPSliderImgId);
        formData.append('bgImg', logoFile);
        formData.append('heading', heading);
        subheadings.forEach((subheading, index) => {
            formData.append(`subheadings[${index}]`, subheading);
        });

        try {
            console.log(`${baseURL}add-hp-sliders-imgs`);
            const response = await axios.post(`${baseURL}update-hp-slider-imgs`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            console.log('Response:', response.data);
            setShowUpdateModal(false);
            dispatch(getHPSliderImgs());
            // Handle success or any further actions
        } catch (error) {
            console.error('Error:', error);
            setShowAddModal(false);
            // Handle error or display a message
        }
    };

    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-3">
                            <div className="col text-right">
                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddImg}>
                                    Add New Image
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header d-flex p-0">
                                        <h3 className="card-title p-3">Home Page Slider Images</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <div className="row">
                                            {hpSliderImgs && hpSliderImgs.map((img) => (
                                                <div key={img.id} className="col-md-4 mb-4">
                                                    <div className="card h-100">
                                                        <img src={`${imgURL}${img.slider_img_path}`} className="card-img-top" alt={img.heading} />
                                                        <div className="card-body">
                                                            <h5 className="card-title"><strong>Heading:</strong> {img.heading}</h5>
                                                            <p className="card-text"><strong>Subheadings:</strong> {img.subheadings.map(sub => sub.sub_heading).join(', ')}</p>
                                                        </div>
                                                        <div className="card-footer">
                                                            <button type="button" className="btn btn-outline-warning btn-sm mr-2" onClick={() => handleEditImg(img)}>Edit</button>
                                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteImg(img)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* ./card */}
                            </div>
                            {/* /.col */}
                        </div>
                    </div>
                </section>
            </div>
            <div className={`modal fade ${showAddModal ? 'show' : ''}`} id="modal-lg" style={{ display: showAddModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Home Page Slider Image</h4>
                            <button type="button" className="close" onClick={() => setShowAddModal(false)} aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="companyLogo">Upload Image</label>
                                        <input
                                            type="file"
                                            className="form-control-file"
                                            id="companyLogo"
                                            accept="image/*"
                                            required
                                            key={fileInputKey}
                                            onChange={handleLogoChange}
                                        />
                                        {/* <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={fileName}
                                                
                                                readOnly
                                            />
                                            <div className="input-group-append">
                                                <label className="btn btn-outline-secondary" htmlFor="companyLogo">Browse</label>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="form-group col-md-6">
                                        {logoPreview && (
                                            <div className="mt-2">
                                                <img src={logoPreview} alt="Company Logo" style={{ width: '100px', height: '100px' }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="heading">Heading</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="heading"
                                            placeholder="Enter heading"
                                            value = {heading}
                                            onChange={(e) => setHeading(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="subheading">Sub Headings</label>
                                        <div className="row">
                                            {subheadings.map((subheading, index) => (
                                                <div key={index} className="col-md-3 mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={subheading}
                                                        onChange={(e) => handleSubheadingChange(index, e.target.value)}
                                                        placeholder="Enter subheading"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={handleAddSubheading}>
                                            + Add More Subheadings
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)} data-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
            {showAddModal && <div className="modal-backdrop fade show"></div>}

            <div className={`modal fade ${showUpdateModal ? 'show' : ''}`} id="modal-lg" style={{ display: showUpdateModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Update Home Page Slider Image</h4>
                            <button type="button" className="close" onClick={() => setShowUpdateModal(false)} aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            <form onSubmit={handleUpdate}>
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
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="heading">Heading</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="heading"
                                            placeholder="Enter heading"
                                            value = {heading}
                                            onChange={(e) => setHeading(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="subheading">Sub Headings</label>
                                        <div className="row">
                                            {subheadings.map((subheading, index) => (
                                                <div key={index} className="col-md-3 mb-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={subheading}
                                                        onChange={(e) => handleSubheadingChange(index, e.target.value)}
                                                        placeholder="Enter subheading"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={handleAddSubheading}>
                                            + Add More Subheadings
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" onClick={() => setShowUpdateModal(false)} data-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
            {showUpdateModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default HPSliderImgs;
