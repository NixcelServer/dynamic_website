import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../redux/Product/product.action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../variable';
import Swal from 'sweetalert2';
import { getAdminProjects } from '../../redux/Project/project.action';


function AdminProject() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  const projects = useSelector(state => state.projects.adminProjects);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  useEffect(() => {
    // dispatch(getNavmenu());
    dispatch(getAdminProjects());
  }, [dispatch]);

//   useEffect(() => {
//     if (projects.length > 0) {
//       setDataLoaded(true);
//     }
//   }, [projects]);

  
    const handleAddProject = () =>{
      navigate('/admin/add-project');
    }
    const handleEdit = (item) => {
      navigate('/admin/edit-product', { state: { item } });

    }

    const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete ${item.project_name}?`,
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
        const response = await axios.delete(`${baseURL}delete-project/${item.encProdId}`);

        if (response.status === 200 ) {
          Swal.fire(
            'Deleted!',
            response.data.message,
            'success'
          );
          // Refresh the nav menu list
          dispatch(getProductDetails());
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
            <h1>Projects</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Projects</li>
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
                <h3 className="card-title">Projects</h3>
                <div className="ml-auto">
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddProject}>Add Project</button>
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
                    {projects && projects.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.project_name}</td>
                        <td>
                          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>Edit</button>
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
  )
}

export default AdminProject