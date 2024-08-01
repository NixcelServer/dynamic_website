import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCmpAddress, getCmpDetails } from '../../redux/Company/company.action';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import { imgURL } from '../../variable';

function ContactUs() {
    const dispatch = useDispatch();
    const cmpAddress = useSelector(state => state.companyDetails.cmpAddress);
    const company = useSelector(state => state.companyDetails.company);
    //const company = useSelector(state => state.companyDetails.aboutU);
    const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Services');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";
    const [imageLoaded, setImageLoaded] = useState(false);

    // Function to get the background image URL
    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `${imgURL}${foundMenu.n_menu_bg_img}`;
        }
        return defaultImgUrl;
    };


    useEffect(() => {
        dispatch(getCmpAddress());
        dispatch(getCmpDetails());
        dispatch(getAllNavMenu());

    }, [dispatch]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Function to get address with address_name "Office"
    const getOfficeAddress = () => {
        return cmpAddress.find(address => address.address_name === 'Office') || {};
    };

    const officeAddress = getOfficeAddress();

    return (
        <div>
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
                    )}                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center">
                                <div className="col-md-8 text-center col-sm-12 pt-5" data-aos="fade-up">
                                    <h1 className="pt-5"><span>Contact Us</span></h1>
                                    <p className="mb-5 w-75 pl-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END slider */}
            </div>
            <section className="section border-bottom">
                <div className="container" data-aos="fade-up">
                    <div className="row">
                        <div className="col-md-6 mb-5 order-2">
                            <form action="#" method="post" style={{ color: '#6c757d' }}>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="name" style={{ fontWeight: 'normal' }}>Name</label>
                                        <input type="text" id="name" className="form-control" style={{ fontWeight: 'normal' }} />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label htmlFor="phone" style={{ fontWeight: 'normal' }}>Phone</label>
                                        <input type="text" id="phone" className="form-control" style={{ fontWeight: 'normal' }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        {/* Empty row */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="email" style={{ fontWeight: 'normal' }}>Email</label>
                                        <input type="email" id="email" className="form-control" style={{ fontWeight: 'normal' }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="message" style={{ fontWeight: 'normal' }}>Write Message</label>
                                        <textarea name="message" id="message" className="form-control" cols={30} rows={8} defaultValue={""} style={{ fontWeight: 'normal' }} />
                                    </div>
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
                                        >
                                            SEND MESSAGE
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 order-2 mb-5">
                            <div className="row justify-content-right">
                                <div className="col-md-8 mx-auto contact-form-contact-info">
                                    {officeAddress ? (
                                        <>
                                            <p className="d-flex">
                                                <span className="ion-ios-location icon mr-5" />
                                                <span>{officeAddress.house_no}, {officeAddress.area}, {officeAddress.city_village}- {officeAddress.pincode}, {officeAddress.state}, {officeAddress.country}</span>
                                            </p>
                                            <p className="d-flex">
                                                <span className="ion-ios-telephone icon mr-5" />
                                                <span>{company.c_mobile_no}</span>
                                            </p>
                                            <p className="d-flex">
                                                <span className="ion-android-mail icon mr-5" />
                                                <span>{company.c_email_id}</span>
                                            </p>
                                        </>
                                    ) : (
                                        <p>Loading address details...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
