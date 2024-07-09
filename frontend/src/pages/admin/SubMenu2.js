import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-buttons/js/buttons.colVis';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { getNavmenu, getSubMenu1, getSubMenu2 } from '../../redux/NavMenu/navmenu.action';
import { baseURL } from '../../variable';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function SubMenu2() {
  const dispatch = useDispatch();
  const submenu2 = useSelector(state => state.navbarMenu.submenu2)
  const [dataLoaded, setDataLoaded] = useState(false);
  const location = useLocation();
  const { item,menuName } = location.state || {};
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [display, setDisplay] = useState('');
  const [subMenu2Name, setSubMenu2Name] = useState('');
  const [sequenceNo, setSequenceNo] = useState('');
  const [subMenu2Desc, setSubMenu2Desc] = useState('');
  const [icon, setIcon] = useState(null);
  const [iconFileName, setIconFileName] = useState(''); // New state for file name
  const [encSubMenu2Id,setEncSubMenu2Id] = useState('');
//   const [navMenuName,setNavMenuName] = useState('');
console.log(item);
console.log("menu name",menuName);

  useEffect(() => {
    if (item) {
      dispatch(getSubMenu2(item.encSubMenu1Id));
      
    }

  }, [dispatch]);

  useEffect(() => {
    if (submenu2.length > 0) {
      setDataLoaded(true);
    }
  }, [submenu2]);

  useEffect(() => {
    if (dataLoaded) {
      $(document).ready(function () {
        if (!$.fn.DataTable.isDataTable('#example1')) {
          $("#example1").DataTable({
            "responsive": true,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
          }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
        }
      });
    }
  }, [dataLoaded]);

  const navigate = useNavigate();

  const handleAddMenu = () => {
    // navigate('/admin/add-navbar-menu');
    setSubMenu2Name('');
    setSequenceNo('');
    setSubMenu2Desc('');
    setDisplay('');
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    setShowUpdateModal(true);
    setEncSubMenu2Id(item.encSubMenu2Id);
    setSubMenu2Name(item.sub_menu_2_name);
    setSequenceNo(item.sequence_no);
    setSubMenu2Desc(item.sub_menu_2_desc);
    setDisplay(item.show_status)
  };

//   const handleSubMenu = (item) => {
//     navigate('/admin/sub-menu-1', { state: { item } });
//   }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete ${item.sub_menu_2_name}?`,
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
        const response = await axios.delete(`${baseURL}sub-menu-2-delete/${item.encSubMenu2Id}`);

        if (response.status === 200) {
          Swal.fire(
            'Deleted!',
            response.data.message,
            'success'
          );
          // Refresh the nav menu list
          dispatch(getSubMenu2(item.encSubMenu1Id));
        } else {
          Swal.fire(
            'Error!',
            'There was a problem deleting the menu item.',
            'error'
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'There was a problem deleting the menu item.',
          'error'
        );
      }
    }
  };

  const handleSubMenu2Change = (event) => {
    setSubMenu2Name(event.target.value);
  };

  const handleSequenceChange = (event) => {
    setSequenceNo(event.target.value);
  };

  const handleSubMenu2DescriptionChange = (value) => {
    setSubMenu2Desc(value);
  };

  const handleMenuIconChange = (event) => {
    const file = event.target.files[0];
    setIcon(file);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   

    const formData = new FormData();
    formData.append('encSubMenu1Id', item.encSubMenu1Id);
        formData.append('subMenu2Name', subMenu2Name);
        formData.append('sequenceNo', sequenceNo);
        formData.append('subMenu2Desc', subMenu2Desc);
        formData.append('display', display);

        try {
          // Make the POST request using Axios
          const response = await axios.post(`${baseURL}new-sub-menu-2`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log('API response:', response.data);
          dispatch(getSubMenu2(item.encSubMenu1Id));
          setShowAddModal(false);
          // Add any additional logic after a successful API call
      } catch (error) {
          console.error('API error:', error);
  
          // Handle errors or show error messages to the user
      }

  };

  const handleUpdate =async(e) =>{
    console.log("form Data",
        "encSubMenu1Id",item.encSubMenu1Id,
        "encSubMene2Id",encSubMenu2Id
    )
    e.preventDefault();
    const formData = new FormData();
        formData.append('encSubMenu1Id', item.encSubMenu1Id);
        formData.append('encSubMenu2Id',encSubMenu2Id);
        formData.append('subMenu2Name', subMenu2Name);
        formData.append('sequenceNo', sequenceNo);
        formData.append('subMenu2Desc', subMenu2Desc);
        formData.append('display', display);
console.log("form data",formData)
        try {
          // Make the POST request using Axios
          const response = await axios.post(`${baseURL}update-sub-menu-2`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log('API response:', response.data);
          dispatch(getSubMenu2(item.encSubMenu1Id));
          setShowUpdateModal(false);
          // Add any additional logic after a successful API call
      } catch (error) {
          console.error('API error:', error);
  
          // Handle errors or show error messages to the user
      }
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{item.sub_menu_1_name}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to='/admin/home'>Home</Link></li>
                <li className="breadcrumb-item active"><Link to='/admin/nav-menu'>Navbar menu</Link></li>
                <li className="breadcrumb-item active">{menuName}</li>
                <li className="breadcrumb-item active">{item.sub_menu_1_name}</li>
                {/* <li className="breadcrumb-item active"><Link to='/admin/nav-menu'></Link></li> */}

                {/* <li className="breadcrumb-item active">{item.n_menu_name}</li> */}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h3 className="card-title">Sub Menu 2</h3>
                  <div className="ml-auto">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddMenu}>Add Sub Menu 2</button>
                  </div>
                </div>
                <div className="card-body">
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submenu2 && submenu2.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.sub_menu_2_name}</td>
                          <td>
                            <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                            {/* <button className="btn btn-sm btn-primary ml-2" onClick={() => handleSubMenu(item)}>Assign Submenu 2</button> */}
                            <button className="btn btn-sm btn-danger ml-2" onClick={() => handleDelete(item)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`modal fade ${showAddModal ? 'show' : ''}`} id="modal-lg" style={{ display: showAddModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Assign Sub Menu 1</h4>
              <button type="button" className="close" onClick={() => setShowAddModal(false)} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <form onSubmit={handleSubmit}>
                <div class="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="sequenceNo">Sub Menu 2 Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sequenceNo"
                      value={subMenu2Name}
                      onChange={handleSubMenu2Change}
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="sequenceNo">Sequence No</label>
                    <input
                      type="text"
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
                      value={subMenu2Desc}
                      onChange={handleSubMenu2DescriptionChange}
                      theme="snow"
                      style={{ height: '60%',whiteSpace: 'pre-wrap' }}
                      required
                    />
                  </div>
                </div>
                {/* <div className="form-group">
                  <label htmlFor="icon">Upload Sub Mneu 1 Icon</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="icon"
                    onChange={handleMenuIconChange}
                    required
                  />
                </div> */}
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
                <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)} data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
              </form>
            </div>
            <div className="modal-footer justify-content-between">
              {/* <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)} data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">Save changes</button> */}
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
              <h4 className="modal-title">Update Sub Menu 1</h4>
              <button type="button" className="close" onClick={() => setShowUpdateModal(false)} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <form onSubmit={handleUpdate}>
                <div class="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="sequenceNo">Sub Menu 1 Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sequenceNo"
                      value={subMenu2Name}
                      onChange={handleSubMenu2Change}
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="sequenceNo">Sequence No</label>
                    <input
                      type="text"
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
                      value={subMenu2Desc}
                      onChange={handleSubMenu2DescriptionChange}
                      theme="snow"
                      style={{ height: '60%',whiteSpace: 'pre-wrap' }}
                      required
                    />
                  </div>
                </div>
                {/* <div className="form-row">
                                            <div className="form-group col-md-5">
                                            <label htmlFor="currentIcon">Current Menu Icon</label>
                                            <p id="currentIcon">{iconFileName}</p>
                                        </div>
                <div className="form-group col-md-7">
                  <label htmlFor="icon">Upload New Sub Menu 2 Icon</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="icon"
                    onChange={handleMenuIconChange}
                    
                  />
                </div>
                </div> */}
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
                <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-default" onClick={() => setShowUpdateModal(false)} data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
              </form>
            </div>
            <div className="modal-footer justify-content-between">
              {/* <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)} data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">Save changes</button> */}
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

export default SubMenu2;
