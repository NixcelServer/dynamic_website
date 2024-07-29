import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';

function SingleService() {
  const [showAddModal, setShowAddModal] = useState(false);
  const location = useLocation();
  const { service } = location.state || {}; // Retrieve the service object from the passed state
  const defaultImgUrl = '/path/to/default/image.jpg'; // Replace with your default image path
  const serviceImgUrl = service?.images && service.images.length > 0 ? `http://127.0.0.1:8000/storage/${service.images[0].service_img_path}` : defaultImgUrl;

  const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
  const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Services');
  const bgImgUrl = "/Industries/images/hero_2.jpg";
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    
      dispatch(getAllNavMenu());
   
  }, [dispatch]);

  const getBackgroundImage = () => {
    if (foundMenu && foundMenu.n_menu_bg_img) {
        return `http://127.0.0.1:8000/storage/${foundMenu.n_menu_bg_img}`;
    }
    return bgImgUrl;
};

  const handleInquireNow = () => {
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

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
        <div className="modal-dialog modal-lg custom-modal-height">
          <div className="modal-content">
            <div className="modal-header" style={{ padding: '0.5rem 1rem' }}>
              <h4 className="modal-title">Send an Inquiry</h4>
              <button type="button" className="close" onClick={() => setShowAddModal(false)} aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6" style={{ marginBottom: '0.5rem' }}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sequenceNo"
                      placeholder="Enter name"
                      required
                    />
                  </div>
                  <div className="row" style={{ marginBottom: '0.5rem' }}>
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
                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <label htmlFor="navMenuDesc">Message</label>
                  <div style={{ height: '120px', overflowY: 'auto' }}>
                    <textarea
                      style={{
                        width: '100%',
                        height: '100%',
                        borderColor: '#dcdcdc',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        padding: '10px',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                  <label htmlFor="icon">Upload File</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="icon"
                    required
                  />
                </div>
                <div className="modal-footer justify-content-between" style={{ padding: '0.5rem 1rem' }}>
                  <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)} data-dismiss="modal">
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: '#fd5f00',
                      borderColor: '#fd5f00',
                      color: '#fff',
                      padding: '0.4rem 0.8rem'
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
  );
}

export default SingleService;
