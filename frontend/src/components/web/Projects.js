import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNavMenu } from '../../redux/NavMenu/navmenu.action';
import { imgURL } from '../../variable';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects } from '../../redux/Project/project.action';
function Projects() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navmenu = useSelector(state => state.navbarMenu.allNavMenu);
    const foundMenu = navmenu.find(menu => menu.n_menu_name === 'Projects');
    const defaultImgUrl = "/Industries/images/hero_2.jpg";
    const [imageLoaded, setImageLoaded] = useState(false);
    const projects = useSelector(state => state.projects.webProjects);


    useEffect(() => {
        dispatch(getAllNavMenu());
        dispatch(getProjects());
    }, [dispatch]);

    const getBackgroundImage = () => {
        if (foundMenu && foundMenu.n_menu_bg_img) {
            return `${imgURL}${foundMenu.n_menu_bg_img}`;
        }
        return defaultImgUrl;
    };

    const handleExploreClick = (project) => {
      navigate(`/web/single-project`, {
        state: { project } // Passing product as state
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
                                <h1 className="pt-5"><span>Projects</span></h1>
                                <p className="mb-5 w-75 pl-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <section className="section border-t" style={{ marginBottom: '5px', paddingTop: '60px', paddingBottom: '5px' }}>
                    <div className="container">
                        <div className="row justify-content-center mb-5 element-animated" data-aos="fade-up">
                            <div className="col-md-12">
                                <h2 className="heading mb-4"><strong>Industries Projects</strong></h2>
                                
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

                <section className="section border-t pb-0">
    <div className="container">
      <div className="row justify-content-center mb-5 ">
        <div className="col-md-8 text-center" data-aos="fade-up">
          <h2 className=" heading mb-4">Our Latest Projects</h2>
          <p className="mb-5 lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
        </div>
      </div>
    </div>
    <div className="container-fluid">
                    <div className="row no-gutters">
                        {projects && projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div className="col-md-4 element-animated" data-aos="fade-up" key={index}>
                         <div onClick={() => handleExploreClick(project)} className="link-thumbnail">                              <h3>{project.project_name}</h3>
                                        <span className="ion-plus icon" />
                                        <img 
                                            src={project.images ? `${imgURL}${project.images[0].project_img_path}` : defaultImgUrl} 
                                            alt={project.title} 
                                            className="img-fluid" 
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading Projects...</p>
                        )}
                    </div>
                </div>
  </section>  
    </div>
  )
}

export default Projects
