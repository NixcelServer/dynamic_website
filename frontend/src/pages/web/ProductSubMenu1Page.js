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
import { getSM1Prods } from '../../redux/Product/product.action';

function ProductSubMenu1Page() {
  const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
  const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Products');
  const bgImgUrl = "/Industries/images/hero_2.jpg";
  const [imageLoaded, setImageLoaded] = useState(false);

  const location = useLocation();
  const encSubMenu1Id = location.state?.encSubMenu1Id;
  const dispatch = useDispatch();
  const prodArray = useSelector(state => state.products.prodSM1); // Renamed for clarity
  const prod = prodArray.length > 0 ? prodArray[0] : {};
  
  const prodSM2 = useSelector(state => state.products.prodSM2);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const defaultImgUrl = '/path/to/default/image.jpg'; // Replace with your default image path
  const prodImgUrl = prod?.images && prod.images.length > 0 ? `${imgURL}${prod.images[0].prod_img_path}` : defaultImgUrl;

   // Find the submenu based on encSubMenu1Id
   const selectedSubMenu = foundMenu?.sub_menus?.find(submenu => submenu.encSubMenu1Id === encSubMenu1Id);

  const getBackgroundImage = () => {
    if (foundMenu && foundMenu.n_menu_bg_img) {
        return `${imgURL}${foundMenu.n_menu_bg_img}`;
    }
    return bgImgUrl;
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (encSubMenu1Id) {
      dispatch(getSM1Prods(encSubMenu1Id));  
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
          <div className="container">
            <div className="row slider-text align-items-center justify-content-center">
              <div className="col-md-8 text-center col-sm-12 element-animated pt-5" data-aos="fade-up">
                <h1 className="pt-5 animate-heading"> 
                <span>
          {selectedSubMenu ? selectedSubMenu.sub_menu_1_name : 'Products'}
        </span>
                    </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {prodSM2.length > 0 && (
  <section className="section border-t" style={{ marginBottom: '5px', paddingTop: '60px', paddingBottom: '5px' }}>
    <div className="container">
      <div className="row justify-content-center mb-5 element-animated" data-aos="fade-up">
        <div className="col-md-12">
          <h2 className="heading mb-4"><strong>Products</strong></h2>
          
          {selectedSubMenu ? (
            <div 
              className="mb-5 lead"
              style={{ color: '#6c757d', fontSize: '1.4rem' }}
              dangerouslySetInnerHTML={{ __html: selectedSubMenu.sub_menu_1_desc }} 
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  </section>
)}



      <div id="about">
  <div className="container mt-4" data-aos="fade-up">
    <div className="row justify-content-center">
      {prodSM2.length > 0 ? (
        prodSM2.map(prod => (
          <div 
            className={`col-lg-${prodSM2.length === 1 ? '12' : prodSM2.length === 2 ? '6' : '4'} col-md-6 wow fadeInUp`} 
            data-wow-delay="0.1s" 
            key={prod.id}
          >
            <div className="products-item d-flex flex-column bg-white overflow-hidden h-100">
              <div className="position-relative mt-auto">
                <img 
                  className="img-fluid" 
                  src={prod.images && prod.images.length > 0 ? `${imgURL}${prod.images[0].prod_img_path}` : defaultImgUrl} 
                  alt={prod.prod_name} 
                />
                <div className="products-overlay">
                  <button
                    className="btn btn-outline-primary border-2"
                    onClick={() => handleExploreClick(prod)}
                  >
                    {prod.prod_name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
         <section className="plant-section my-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 col-sm-6 product-img">
              <img
                src={prod.images && prod.images.length > 0 ? `${imgURL}${prod.images[selectedImageIndex].prod_img_path}` : '/Industries/images/prod_1.jpg'}
                className="w-100"
                alt={prod.prod_name}
              />
              {/* Thumbnails below the main image */}
              <div className="d-flex justify-content-center mt-3">
                {prod.images && prod.images.length > 0 && prod.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${imgURL}${image.prod_img_path}`}
                    className="img-thumbnail mx-1"
                    alt={`Thumbnail ${index + 1}`}
                    style={{ width: '60px', height: '60px', cursor: 'pointer', border: selectedImageIndex === index ? '2px solid #007bff' : 'none' }}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </div>
            <div className="col-12 col-sm-6 product-content-bg">
            <h2 style={{ color: 'white' }}>{prod.prod_name}</h2>
  <div
    className=""
    style={{ fontSize: '1.4rem', color: 'white' }}
    dangerouslySetInnerHTML={{
      __html: prod.prod_desc
       
    }}
  />
 
</div>



          </div>
        </div>
      </section>
        </>
      )}
    </div>
  </div>
</div>


      {/* Modal code and other content here */}

    </div>
  );
}

export default ProductSubMenu1Page;
