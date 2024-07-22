import React, { useEffect, useState } from 'react';
import "../../Industries/css/custom.css"; // Ensure correct path to your custom CSS file
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs } from '../../redux/Company/company.action';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AboutUsW() {
    const dispatch = useDispatch();
    const aboutUs = useSelector(state => state.companyDetails.aboutUs);
    const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'About Us');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";

    const [imageLoaded, setImageLoaded] = useState(false);

    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `http://127.0.0.1:8000/storage/${foundMenu.n_menu_bg_img}`;
        }
        return defaultImgUrl;
    };

    useEffect(() => {
        dispatch(getAboutUs());
        dispatch(getAllNavMenu());
    }, [dispatch]);

   

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);




    return (
        <>
            <div>
                <div className="top-shadow" />
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
                                    <h1 className="pt-5 animate-heading"><span>About Us</span></h1>
                                    <p className="mb-5 w-75 pl-0 animate-paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
            <section className="section bg-light mt-4 pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                            <div className="media block-6 d-block text-center">
                                <div className="icon mb-3"><span className="ion-bookmark" style={{ color: '#fd5f00' }} /></div>
                                <div className="media-body">
                                    <h3 className="heading"><strong>Automotive Parts</strong></h3>
                                    <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                </div>
                            </div>  
                        </div>
                        <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                            <div className="media block-6 d-block text-center">
                                <div className="icon mb-3"><span className="ion-heart" style={{ color: '#fd5f00' }} /></div>
                                <div className="media-body">
                                    <h3 className="heading"><strong>Maintenance Services</strong></h3>
                                    <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                </div>
                            </div> 
                        </div>
                        <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                            <div className="media block-6 d-block text-center">
                                <div className="icon mb-3"><span className="ion-leaf" style={{ color: '#fd5f00' }} /></div>
                                <div className="media-body">
                                    <h3 className="heading"><strong>Green Energy</strong></h3>
                                    <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </section>
  
            <div id="about">
                <div className="container mt-12" data-aos="fade-up">
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <img src="/Industries/images/img_3.jpg" className="img-fluid" alt="" />
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="about-text">
                                <h2>About Us</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <h3>Why Choose Us?</h3>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUsW;
