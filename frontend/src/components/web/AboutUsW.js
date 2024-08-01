import React, { useEffect, useState } from 'react';
import "../../Industries/css/custom.css"; // Ensure correct path to your custom CSS file
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs } from '../../redux/Company/company.action';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { imgURL } from '../../variable';

function AboutUsW() {
    const dispatch = useDispatch();
    const aboutUs = useSelector(state => state.companyDetails.aboutUs);
    const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'About Us');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";
    const aboutUsImgUrl = aboutUs && aboutUs.cmp_desc_img_path ? `${imgURL}${aboutUs.cmp_desc_img_path}` : "/Industries/images/img_2.jpg";


    const [imageLoaded, setImageLoaded] = useState(false);

    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `${imgURL}${foundMenu.n_menu_bg_img}`;
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
  
           
  
            {/*  */}

            <div className="container-fluid py-5 my-3">
    <div className="container py-5">
        <div className="row g-5 align-items-center">
            <div className="col-lg-5 col-md-6 col-sm-12 wow fadeIn" data-aos="fade-up">
                <div className="h-100 position-relative mx-auto" style={{ maxWidth: '100%' }}>
                    <img src="/Industries/images/img_1.jpg" className="img-fluid w-75 rounded" alt="Industry 1" style={{ marginBottom: '25%' }} />
                    <div className="position-absolute w-75" style={{ top: '25%', left: '25%' }}>
                        <img src={aboutUsImgUrl} className="img-fluid w-100 rounded" alt="About Us" />
                    </div>
                </div>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 wow fadeIn" data-aos="fade-up">
                <h5 className="text-primary">About Us</h5>
                <h1 className="mb-4">About Industries And Its Innovative Solutions</h1>
                <div
                    className="mb-5 lead"
                    style={{ color: '#6c757d', fontSize: '1.2rem' }}
                    dangerouslySetInnerHTML={{ __html: aboutUs.cmp_desc }}
                />
            </div>
        </div>

        {/* Moved section content here */}
        <div className="row g-5">
            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                <div className="media block-6 d-block text-center">
                    <div className="icon mb-3"><span className="ion-bookmark" style={{ color: '#fd5f00' }} /></div>
                    <div className="media-body">
                        <h3 className="heading"><strong>No Hidden Cost</strong></h3>
                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                <div className="media block-6 d-block text-center">
                    <div className="icon mb-3"><span className="ion-heart" style={{ color: '#fd5f00' }} /></div>
                    <div className="media-body">
                        <h3 className="heading"><strong>Dedicated Team</strong></h3>
                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                <div className="media block-6 d-block text-center">
                    <div className="icon mb-3"><span className="ion-leaf" style={{ color: '#fd5f00' }} /></div>
                    <div className="media-body">
                        <h3 className="heading"><strong>24/7 Available</strong></h3>
                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
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
