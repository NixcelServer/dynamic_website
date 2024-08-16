import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import { useDispatch, useSelector } from 'react-redux';
import { imgURL } from '../../variable';
import AOS from 'aos';


function ProjectSingle() {
  // Retrieve the project data passed via Link
  const dispatch = useDispatch();
  const location = useLocation();
  const { project } = location.state || {}; // Destructure project from location.state
  console.log(project);

  const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Projects');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";
    const [imageLoaded, setImageLoaded] = useState(false);

    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `${imgURL}${foundMenu.n_menu_bg_img}`;
        }
        return defaultImgUrl;
    }

  useEffect(() => {
    dispatch(getAllNavMenu());
    
}, [dispatch]);

useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);

  if (!project) {
    return <p>Project not found!</p>; // Handle case where project data is not available
  }

  

  

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
                                <h1 className="pt-5"><span>{project.project_name}</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
      </div>

      <section className="section">
        <div className="container" data-aos="fade-up">
          <div className="row">
          <div className="col-12" style={{ marginTop: '-250px' }}>
  <p>
    <img
      src={project.images ? `${imgURL}${project.images[0].project_img_path}` : '/Industries/images/hero_1.jpg'}
      alt="Project Image"
      className="img-fluid"
      style={{
        height: '600px', // Desired height
        width: '100%',   // Full width of the container
        objectFit: 'cover' // Crop the image to fit the container
      }}
    />
  </p>
</div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 mb-5">
            <div
    className="" data-aos="fade-up"
    style={{ fontSize: '1.4rem', color: 'black' }}
    dangerouslySetInnerHTML={{
      __html: project.project_desc
       
    }}
  />            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 mb-5">
              <h2>{project.quote || '“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium sapiente ratione nesciunt saepe ipsam, officiis reiciendis doloribus vero, facilis maiores incidunt vel eaque non illo animi voluptatem similique”'}</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p>{project.details || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero nulla delectus sit vel magnam, ad voluptatem hic.'}</p>
              {/* You can add more sections or details here based on your project data */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectSingle;
