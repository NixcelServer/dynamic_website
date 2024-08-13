import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { imgURL } from '../../variable';
import { useSelector } from 'react-redux';

function SingleProduct() {
  const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
  const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Products');
  const bgImgUrl = "/Industries/images/hero_2.jpg";
  const defaultImgUrl = '/path/to/default/image.jpg'; // Replace with your default image path

  const [imageLoaded, setImageLoaded] = useState(false);

  const location = useLocation();
  const { product } = location.state || {}; // Retrieve the product from the state

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return <div>Product not found</div>;
  }

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
          {product ? product.prod_name : 'Products'}
        </span>
                    </h1>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="plant-section my-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 col-sm-6 product-img">
              <img
                src={product.images && product.images.length > 0 ? `${imgURL}${product.images[selectedImageIndex].prod_img_path}` : '/Industries/images/prod_1.jpg'}
                className="w-100"
                alt={product.prod_name}
              />
              {/* Thumbnails below the main image */}
              <div className="d-flex justify-content-center mt-3">
                {product.images && product.images.length > 0 && product.images.map((image, index) => (
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
            <h2 style={{ color: 'white' }}>{product.prod_name}</h2>
  <div
    className=""
    style={{ fontSize: '1.4rem', color: 'white' }}
    dangerouslySetInnerHTML={{
      __html: product.prod_desc
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

export default SingleProduct;
