import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // or your preferred HTTP client
import { useDispatch, useSelector } from 'react-redux';
import { getServiceSb2 } from '../../redux/Service/service.action';


function ServiceSubMenu2Page() {

    const location = useLocation();
    const encSubMenu2Id = location.state?.encSubMenu2Id;
    console.log(encSubMenu2Id);
    const dispatch = useDispatch();
   const servicesSB2 = useSelector(state => state.services.servicesSB2Content);
    const navigate = useNavigate();

    useEffect(() => {
      if (encSubMenu2Id) {
         dispatch(getServiceSb2(encSubMenu2Id));
      } else {
        console.error('No encSubMenu1Id provided');
      }
    }, [encSubMenu2Id, location.state, dispatch]);

    const handleInquireNow = () => {
      // Handle the inquire now button click event
    };
    
  return (
    <div>
    <div className="inner-page" style={{ marginBottom: '80px' }}>
      <div className="slider-item" style={{ backgroundImage: 'url("/Industries/images/hero_2.jpg")' }}>
        <div className="container" data-aos="fade-up">
          <div className="row slider-text align-items-center justify-content-center">
            <div className="col-md-8 text-center col-sm-12 element-animated pt-5">
              <h1 className="pt-5"><span>Basic Engineering Packages</span></h1>
              <p className="mb-5 w-75 pl-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container mt-4" data-aos="fade-up">
      {servicesSB2 && servicesSB2.length > 0 ? (
        servicesSB2.map(service => (
          <div className="row" key={service.id}>
            <div className="col-md-6 mb-4">
              <img src={`http://127.0.0.1:8000/storage/${service.images[0].service_img_path}`} className="img-fluid" alt={service.service_name} />
            </div>
            <div className="col-md-6 mb-4">
              <div className="about-text">
                <h2>{service.service_name}</h2>
                <div
                  className="mb-5 lead"
                  style={{ color: '#6c757d', fontSize: '1.4rem' }}
                  dangerouslySetInnerHTML={{ __html: service.service_desc }}
                />
                <button
                  className="btn px-3 py-3"
                  style={{ 
                    backgroundColor: '#fd5f00', 
                    borderColor: '#fd5f00', 
                    color: '#fff' // White text color for the button
                  }}
                  onClick={handleInquireNow}
                >
                  INQUIRE NOW
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No services available for SB1.</p>
      )}
    </div>
    </div>
  )
}

export default ServiceSubMenu2Page
