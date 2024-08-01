import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import { Link, useNavigate } from 'react-router-dom';
import "../../Industries/css/servicecard.css"; // Ensure correct path to your custom CSS file
import { getServices } from '../../redux/Service/service.action';
import { imgURL } from '../../variable';


function Service() {
    const dispatch = useDispatch();
    const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Services');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";
    const [imageLoaded, setImageLoaded] = useState(false);
    const services = useSelector(state => state.services.servicesWeb);
    const navigate = useNavigate();

  const handleReadMore = (service) => {
    navigate('/web/single-service', { state: { service } });
  };


    // Function to get the background image URL
    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `${imgURL}${foundMenu.n_menu_bg_img}`;
        }
        return defaultImgUrl;
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        dispatch(getAllNavMenu());
        dispatch(getServices());
    }, [dispatch]);

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
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="row slider-text align-items-center justify-content-center">
                            <div className="col-md-8 text-center col-sm-12 pt-5" data-aos="fade-up">
                                <h1 className="pt-5"><span>Services</span></h1>
                                <p className="mb-5 w-75 pl-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Remaining sections */}
                <section className="section border-t" style={{ marginBottom: '5px', paddingTop: '60px', paddingBottom: '5px' }}>
                    <div className="container">
                        <div className="row justify-content-center mb-5 element-animated" data-aos="fade-up">
                            <div className="col-md-12">
                                <h2 className="heading mb-4"><strong>Industries Services</strong></h2>
                                
                                {foundMenu ? (
                                    <div 
                                    className="mb-5 lead"
                                        style={{ color: '#6c757d', fontSize: '1.4rem' }}
                                        dangerouslySetInnerHTML={{ __html: foundMenu.n_menu_desc }} />
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container">
      <div className="text-center mx-auto wow fadeInUp" data-aos="fade-up" style={{ maxWidth: 500 }}>
        <p className="fs-5 fw-bold text-primary">Our Services</p>
        <h1 className="display-5 mb-5">Services That We Offer For You</h1>
      </div>
      <div className="row g-4">
        {services && services.length > 0 ? (
          services.map((service, index) => (
            <div key={service.encServiceId} className="col-lg-4 col-md-6 wow fadeInUp" data-aos="fade-up">
              <div className="service-item rounded d-flex flex-column h-100">
                <div className="service-img rounded">
                  <img
                    className="img-fluid"
                    src={service.images && service.images.length > 0 ? `${imgURL}${service.images[0].service_img_path}` : defaultImgUrl}
                    alt={service.title}
                  />
                </div>
                <div className="service-text rounded p-5 d-flex flex-column" style={{ flex: 1 }}>
                  <div className="btn-square rounded-circle mx-auto mb-3" style={{ width: 100, height: 100, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      className="img-fluid"
                      src={service.images && service.images.length > 0 ? `${imgURL}${service.images[0].service_img_path}` : defaultImgUrl}
                      alt="Icon"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h4 className="mb-3" style={{ minHeight: 60 }}>{service.service_name}</h4>
                  <p className="mb-4 text-truncate-2-lines" style={{ flex: 1 }}>{service.service_description}</p>
                  <div className="mt-auto">
                  <button
                      onClick={() => handleReadMore(service)}
                      className="btn btn-sm"
                    >
                      <i className="fa fa-plus text-primary me-2" />Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
            



            </div>
        </div>
    );
}

export default Service;
