import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSM2Prod } from '../../redux/Product/product.action';
import { imgURL } from '../../variable';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';

function ProductSubMenu2Page() {
  const location = useLocation();
  const encSubMenu2Id = location.state?.encSubMenu2Id;
  const dispatch = useDispatch();
  const prod = useSelector(state => state.products.prodSM2Content);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
  const bgImgUrl = "/Industries/images/hero_2.jpg";
  const [imageLoaded, setImageLoaded] = useState(false);
  const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Products');
  const defaultImgUrl = '/path/to/default/image.jpg'; // Replace with your default image path

  useEffect(() => {
    if (encSubMenu2Id) {
      dispatch(getSM2Prod(encSubMenu2Id));
      dispatch(getAllNavMenu());
    } else {
      console.error('No encSubMenu2Id provided');
    }
  }, [encSubMenu2Id, dispatch]);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const getBackgroundImage = () => {
    if (foundMenu && foundMenu.n_menu_bg_img) {
        return `${imgURL}${foundMenu.n_menu_bg_img}`;
    }
    return bgImgUrl;
  };

  return (
    <div>
      {/* Slider Section */}
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
                <h1 className="pt-5 animate-heading"><span>{}</span></h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="plant-section my-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 col-sm-6 product-img">
              <img
                src={prod[0]?.images && prod[0].images.length > 0 
                  ? `${imgURL}${prod[0].images[selectedImageIndex].prod_img_path}` 
                  : '/Industries/images/prod_1.jpg'}
                className="w-100"
                alt={prod[0]?.prod_name}
              />
              {/* Thumbnails below the main image */}
              <div className="d-flex justify-content-center mt-3">
                {prod[0]?.images && prod[0].images.length > 0 && prod[0].images.map((image, index) => (
                  <img
                    key={index}
                    src={`${imgURL}${image.prod_img_path}`}
                    className="img-thumbnail mx-1"
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: '60px',
                      height: '60px',
                      cursor: 'pointer',
                      border: selectedImageIndex === index ? '2px solid #007bff' : 'none'
                    }}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </div>

            <div className="col-12 col-sm-6 product-content-bg">
              <div
                className=""
                style={{ fontSize: '1.4rem', color: 'white' }}
                dangerouslySetInnerHTML={{
                  __html: prod[0]?.prod_desc
                    .replace(/<b>/g, '<b style="color:white;">')
                    .replace(/<strong>/g, '<strong style="color:white;">')
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSubMenu2Page;
