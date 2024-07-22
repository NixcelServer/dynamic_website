import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import { Link } from 'react-router-dom';

function Service() {
    const dispatch = useDispatch();
    const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Services');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";
    const [imageLoaded, setImageLoaded] = useState(false);

    // Function to get the background image URL
    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `http://127.0.0.1:8000/storage/${foundMenu.n_menu_bg_img}`;
        }
        return defaultImgUrl;
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        dispatch(getAllNavMenu());
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
                                <p className="mb-5 lead" style={{ color: '#6c757d', fontSize: '1.4rem' }}>
                                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                                    {/* {foundMenu.n_menu_desc} */}
                                </p>
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

                <section className="section bg-light mt-4 pt-4" style={{ marginBottom: '20px', paddingTop: '5px', paddingBottom: '10px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                                <div className="media block-6 d-block text-center">
                                    <div className="icon mb-3"><span className="ion-bookmark" style={{ color: '#fd5f00' }} /></div>
                                    <div className="media-body">
                                        <h3 className="heading"><strong>Automotive Parts</strong></h3>
                                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                        <Link to="/web/service/info" >Read More</Link>
                                    </div>
                                </div>  
                            </div>
                            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                                <div className="media block-6 d-block text-center">
                                    <div className="icon mb-3"><span className="ion-heart" style={{ color: '#fd5f00' }} /></div>
                                    <div className="media-body">
                                        <h3 className="heading"><strong>Maintenance Services</strong></h3>
                                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                        <a href="#more-info" >Read More</a>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                                <div className="media block-6 d-block text-center">
                                    <div className="icon mb-3"><span className="ion-leaf" style={{ color: '#fd5f00' }} /></div>
                                    <div className="media-body">
                                        <h3 className="heading"><strong>Green Energy</strong></h3>
                                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                        <a href="#more-info" >Read More</a>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section bg-light mt-4 pt-4" style={{ marginBottom: '20px', paddingTop: '5px', paddingBottom: '10px' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                                <div className="media block-6 d-block text-center">
                                    <div className="icon mb-3"><span className="ion-bookmark" style={{ color: '#fd5f00' }} /></div>
                                    <div className="media-body">
                                        <h3 className="heading"><strong>Automotive Parts</strong></h3>
                                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                        <a href="#more-info" >Read More</a>
                                    </div>
                                </div>  
                            </div>
                            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                                <div className="media block-6 d-block text-center">
                                    <div className="icon mb-3"><span className="ion-heart" style={{ color: '#fd5f00' }} /></div>
                                    <div className="media-body">
                                        <h3 className="heading"><strong>Maintenance Services</strong></h3>
                                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                        <a href="#more-info" >Read More</a>
                                    </div>
                                </div> 
                            </div>
                            <div className="col-md-6 col-lg-4 element-animated" data-aos="fade-up">
                                <div className="media block-6 d-block text-center">
                                    <div className="icon mb-3"><span className="ion-leaf" style={{ color: '#fd5f00' }} /></div>
                                    <div className="media-body">
                                        <h3 className="heading"><strong>Green Energy</strong></h3>
                                        <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
                                        <a href="#more-info" >Read More</a>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Service;
