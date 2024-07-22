import React, { useState } from 'react'
import InputMask from 'react-input-mask';


function ServiceInfo() {
    const [showAddModal, setShowAddModal] = useState(false);
    

    const handleInquireNow = () =>{
        setShowAddModal(true);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
    
        
    
      };

  return (
    <div>
      <div className="inner-page" style={{ marginBottom: '80px' }}> {/* Adjust margin-bottom as needed */}
      <div class="slider-item"  style={{ backgroundImage: 'url("/Industries/images/hero_2.jpg")' }}>
        
        <div class="container">
          <div class="row slider-text align-items-center justify-content-center">
            <div class="col-md-8 text-center col-sm-12 element-animated pt-5">
              <h1 class="pt-5"><span>Basic Engineering Packages</span></h1>
              <p class="mb-5 w-75 pl-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
       <div id="about">
                <div className="container mt-4" data-aos="fade-up">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <img src="/Industries/images/img_3.jpg" className="img-fluid" alt="" />
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="about-text">
                                <h2>Basic Engineering Packages</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                {/* <h3>Why Choose Us?</h3>
                                <div className="list-style">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-12 mb-4">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-12 mb-4">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="row">
                                    <div className="col-md-6 form-group">
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
  )
}

export default ServiceInfo
