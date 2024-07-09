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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNavmenu } from '../redux/NavMenu/navmenu.action';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseURL } from '../variable';

function AdminNavMenu() {
  const dispatch = useDispatch();
  const navmenu = useSelector(state => state.navbarMenu.navmenu);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(getNavmenu());
  }, [dispatch]);

  useEffect(() => {
    if (navmenu.length > 0) {
      setDataLoaded(true);
    }
  }, [navmenu]);

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
    navigate('/admin/add-navbar-menu');
  };

  const handleEdit = (item) => {
    navigate('/admin/edit-navbar-menu', { state: { item } });
  };

  const handleSubMenu = (item) => {
      navigate('/admin/sub-menu-1',{state:{item}});
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete ${item.n_menu_name}?`,
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
        const response = await axios.delete(`${baseURL}nav-menu-delete/${item.encNavMenuId}`);

        if (response.status === 200 ) {
          Swal.fire(
            'Deleted!',
            response.data.message,
            'success'
          );
          // Refresh the nav menu list
          dispatch(getNavmenu());
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

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Navbar Menu</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Navbar menu</li>
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
                  <h3 className="card-title">Navbar Menu</h3>
                  <div className="ml-auto">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddMenu}>Add Navbar Menu</button>
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
                      {navmenu && navmenu.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.n_menu_name}</td>
                          <td>
                            <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="btn btn-sm btn-primary ml-2" onClick={() => handleSubMenu(item)}>Assign Submenu</button>
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
    </div>
  );
}

export default AdminNavMenu;
