import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import { imgURL } from '../../variable';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../../redux/Product/product.action';

function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Products');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";
    const [imageLoaded, setImageLoaded] = useState(false);
    const products = useSelector(state => state.products.webProducts);

    useEffect(() => {
        dispatch(getAllNavMenu());
        dispatch(getProducts());

    }, [dispatch]);

    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `${imgURL}${foundMenu.n_menu_bg_img}`;
        }
        return defaultImgUrl;
    };

    const handleExploreClick = (product) => {
      navigate(`/web/single-product`, {
        state: { product }
      });
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
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="row slider-text align-items-center justify-content-center">
                            <div className="col-md-8 text-center col-sm-12 pt-5" data-aos="fade-up">
                                <h1 className="pt-5"><span>Products</span></h1>
                                <p className="mb-5 w-75 pl-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>

                </div>

                <section className="section border-t" style={{ marginBottom: '5px', paddingTop: '60px', paddingBottom: '5px' }}>
                    <div className="container">
                        <div className="row justify-content-center mb-5 element-animated" data-aos="fade-up">
                            <div className="col-md-12">
                                <h2 className="heading mb-4"><strong>Industries Products</strong></h2>
                                
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

                <div className="container-xxl products my-6 py-6 pb-0">
  <div className="container">
    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 500}}>
      {/* <p className="fs-5 fw-bold text-primary">Our Products</p> */}
      <h1 className="display-5 mb-5">Explore Our Products</h1>
    </div>
    
    <div className="row g-4 justify-content-center">
    {products.map((product) => (
              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={product.id}>
                <div className="products-item d-flex flex-column bg-white overflow-hidden h-100">
                  <div className="position-relative mt-auto">
                    <img className="img-fluid" 
                    src={product.images && product.images.length > 0 ? `${imgURL}${product.images[0].prod_img_path}` : defaultImgUrl}
                    alt={product.prod_name} />
                    <div className="products-overlay">
                    <button
                      className="btn btn-outline-primary border-2"
                      onClick={() => handleExploreClick(product)}
                    >
                      Explore
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
    
    </div>

  

  </div>
</div>
</div>
    </div>
  )
}

export default Products
