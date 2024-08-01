import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../Industries/css/productcard.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceSb1 } from '../../redux/Service/service.action';
import InputMask from 'react-input-mask';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import { imgURL } from '../../variable';


function ServiceSubMenu1Page() {
  const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
  const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Services');
  const bgImgUrl = "/Industries/images/hero_2.jpg";
  const [imageLoaded, setImageLoaded] = useState(false);


  const location = useLocation();
  const encSubMenu1Id = location.state?.encSubMenu1Id;
  const dispatch = useDispatch();
  const serviceArray = useSelector(state => state.services.servicesSB1); // Renamed for clarity
  const service = serviceArray.length > 0 ? serviceArray[0] : {};
  
  const servicesSB2 = useSelector(state => state.services.servicesSB2);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const defaultImgUrl = '/path/to/default/image.jpg'; // Replace with your default image path
  const serviceImgUrl = service?.images && service.images.length > 0 ? `${imgURL}${service.images[0].service_img_path}` : defaultImgUrl;

  const getBackgroundImage = () => {
    if (foundMenu && foundMenu.n_menu_bg_img) {
        return `${imgURL}${foundMenu.n_menu_bg_img}`;
    }
    return bgImgUrl;
};

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (encSubMenu1Id) {
      dispatch(getServiceSb1(encSubMenu1Id));
      dispatch(getAllNavMenu());
    } else {
      console.error('No encSubMenu1Id provided');
    }
  }, [encSubMenu1Id, location.state, dispatch]);

  const handleInquireNow = () => {
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    

  };

  // const handleImageClick = (service) => {
  //   navigate('/web/services/service-info', { state: { service } });
  // };

  return (
    <div>
     <div className="inner-page">
                <div
                    className="slider-item"
                    style={{ position: 'relative', width: '100%', height: '400px' }} // Adjust height as needed
                >
                    <img
                        src={getBackgroundImage()}
                        alt="Service Hero"
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: imageLoaded ? 'block' : 'none', // Show the image only when it's loaded
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: -1, // Make sure it stays behind other content
                        }}
                    />
                    {/* Fallback image while loading */}
                    {!imageLoaded && (
                        <img
                            src={defaultImgUrl}
                            alt="Default Service Hero"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: -1,
                            }}
                        />
                    )}
                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center">
                                <div className="col-md-8 text-center col-sm-12 element-animated pt-5" data-aos="fade-up">
                                    <h1 className="pt-5 animate-heading"><span>{service.service_name}</span></h1>
                                    {/* <p className="mb-5 w-75 pl-0 animate-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

      <div>
      
       <div id="about">
       <div className="container mt-4" data-aos="fade-up">
  <div className="row">
    <div className="col-md-6 mb-4">
      <img 
        src={serviceImgUrl} 
        alt={service.title} 
        style={{ 
          maxWidth: '500px',  // Adjust this value to your desired maximum width
          maxHeight: '400px', // Adjust this value to your desired maximum height
          width: '100%',      // Ensure the image scales to fit the container
          height: 'auto',     // Maintain aspect ratio
          objectFit: 'contain' // Ensures the image is contained within the specified size without cropping
        }} 
      />
    </div>
    <div className="col-md-6 mb-4">
      <div className="about-text">
        <h2>{service.service_name}</h2>
        <div
          className="mb-5 lead"
          style={{ color: '#6c757d', fontSize: '1.2rem' }}
          dangerouslySetInnerHTML={{ __html: service.service_desc }}
        />
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <button
            className="btn px-3 py-3"
            style={{
              backgroundColor: '#fd5f00',
              borderColor: '#fd5f00',
              color: '#fff'
            }}
            onClick={handleInquireNow}
          >
            INQUIRE NOW
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
            </div>
            <div className={`modal fade ${showAddModal ? 'show' : ''}`} id="modal-lg" style={{ display: showAddModal ? 'block' : 'none' }}>
  <div className="modal-dialog modal-lg custom-modal-height"> {/* Add custom class for height */}
    <div className="modal-content">
      <div className="modal-header" style={{ padding: '0.5rem 1rem' }}> {/* Decreased padding */}
        <h4 className="modal-title">Send an Inquiry</h4>
        <button type="button" className="close" onClick={() => setShowAddModal(false)} aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}> {/* Adjust max-height */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6" style={{ marginBottom: '0.5rem' }}> {/* Decreased margin-bottom */}
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="sequenceNo"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="row" style={{ marginBottom: '0.5rem' }}> {/* Decreased margin-bottom */}
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
                    required
                  />
                </div>
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
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '0.5rem' }}> {/* Decreased margin-bottom */}
            <label htmlFor="navMenuDesc">Message</label>
            <div style={{ height: '120px', overflowY: 'auto' }}>
              <textarea
                style={{
                  width: '100%',
                  height: '100%',
                  borderColor: '#dcdcdc', // Light border color
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  padding: '10px',
                  boxSizing: 'border-box' // Ensure padding doesn't affect the width
                }}
                required
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '0.5rem' }}> {/* Decreased margin-bottom */}
            <label htmlFor="icon">Upload File</label>
            <input
              type="file"
              className="form-control-file"
              id="icon"
              required
            />
          </div>
          <div className="modal-footer justify-content-between" style={{ padding: '0.5rem 1rem' }}> {/* Decreased padding */}
            <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)} data-dismiss="modal">
              Close
            </button>
            <button 
              type="submit" 
              className="btn" 
              style={{ 
                backgroundColor: '#fd5f00', 
                borderColor: '#fd5f00', 
                color: '#fff', // White text color for the button
                padding: '0.4rem 0.8rem' // Equivalent to 'px-3 py-3'
              }}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>



      {showAddModal && <div className="modal-backdrop fade show"></div>}
    </div>

      {/* <div className="container mt-4" data-aos="fade-up">
        <div className="row">
          {servicesSB2 && servicesSB2.length > 0 ? (
            servicesSB2.map(service => (
              <div className="col-md-6 mb-4" key={service.id}>
                <div 
                  className="profile-card-2"
                  onClick={() => handleImageClick(service)}
                  style={{ cursor: 'pointer' }}
                >
                  {service.images && service.images.map(image => (
                    <img 
                      src={`${imgURL}${service.images[0].service_img_path}`} 
                      className="img img-responsive" 
                      alt={service.service_name} 
                      key={image.id} 
                    />
                  ))}
                  <div className="profile-name">{service.service_name}</div>
                  <div className="profile-username">@{service.username}</div>
                  <div className="profile-icons">
                    <a href="#"><i className="fa fa-facebook" /></a>
                    <a href="#"><i className="fa fa-twitter" /></a>
                    <a href="#"><i className="fa fa-linkedin" /></a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No services available for SB2.</p>
          )}
        </div>
      </div> */}

    </div>
  );
}

export default ServiceSubMenu1Page;
