import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { getHPSliderImgs } from '../../redux/HomePage/homepage.action';
import { baseURL } from '../../variable';

function Home() {
  
  const dispatch = useDispatch();
  const hpSliderImgs = useSelector(state => state.hpSliderImgs.hpSliderImgs);
    console.log(hpSliderImgs);

    useEffect(() => {
        dispatch(getHPSliderImgs());
    }, [dispatch]);

    // const filteredImages = hpSliderImgs.filter(img => img.show_status === 'yes');

 
  const slidesToRender = hpSliderImgs.map((slide, index) => ({
    src: `http://127.0.0.1:8000/storage/${slide.slider_img_path}`,
    alt: slide.image_alt_text,
    title: slide.heading,
    description: slide.subheadings.map(sub => sub.sub_heading).join(' | ')
  }));

  // Default images to use if hpSliderImgs is empty or not enough
  const defaultImages = [
    { src: '/Industries/images/hero_1.jpg', alt: 'Slide 1' },
    { src: '/Industries/images/hero_2.jpg', alt: 'Slide 2' }
  ];

  // Determine the number of slides to render
  const slides = slidesToRender.length > 0 ? slidesToRender : defaultImages.slice(0, 2);


  return (
   <div>
  
  
      {/* END header */}
      
      
    
      <section className="carousel-container">
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={5000}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={true}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-slide">
              <img src={slide.src} alt={slide.alt} className="carousel-img" />
              <div className="partial-overlay"></div>
              <div className="carousel-content">
                <div className="container">
                  <div className="row slider-text align-items-center justify-content-center">
                    <div className="text-center col-sm-12 element-animated">
                      <div className="btn-play-wrap mx-auto">
                        <p className="mb-4">
                          <a href="https://vimeo.com/59256790" data-fancybox data-ratio={2} className="btn-play">
                            <span className="ion ion-ios-play" />
                          </a>
                        </p>
                      </div>
                      <h1 className="mb-4"><span>{slide.title}</span></h1>
                      <p className="mb-5 w-75">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
  



      

      {/* <section>
      <div className="slider-item" style={{backgroundImage: 'url("/Industries/images/hero_1.jpg")'}}>
  <div className="container">
    <div className="row slider-text align-items-center justify-content-center">
      <div className="col-lg-7 text-center col-sm-12 element-animated">
        <div className="btn-play-wrap mx-auto">
          <p className="mb-4">
            <a href="https://vimeo.com/59256790" data-fancybox data-ratio={2} className="btn-play">
              <span className="ion ion-ios-play" />
            </a>
          </p>
        </div>
        <h1 className="mb-4"><span>We Are Industrial Company</span></h1>
        <p className="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
    </div>
  </div>
</div>

<div class="slider-item" style={{backgroundImage: 'url("/Industries/images/hero_2.jpg")'}}>
        <div class="container">
          <div class="row slider-text align-items-center justify-content-center">
            <div class="col-lg-7 text-center col-sm-12 element-animated">
              <div class="btn-play-wrap mx-auto"><p class="mb-4"><a href="https://vimeo.com/59256790" data-fancybox data-ratio="2" class="btn-play"><span class="ion ion-ios-play"></span></a></p></div>
              <h1><span>Create, Enhance and Sustain</span></h1>
              <p class="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
        
      </div>

      </section> */}
  {/* END slider */}

  <section className="section bg-light mt-4 pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4 element-animated ">
            <div className="media block-6 d-block text-center">
              <div className="icon mb-3"><span className="ion-bookmark" style={{ color: '#fd5f00' }} /></div>
              <div className="media-body">
                <h3 className="heading"><strong>Automotive Parts</strong></h3>
                <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div>  
          </div>
          <div className="col-md-6 col-lg-4 element-animated ">
            <div className="media block-6 d-block text-center">
              <div className="icon mb-3"><span className="ion-heart " style={{ color: '#fd5f00' }} /></div>
              <div className="media-body">
                <h3 className="heading"><strong>Maintenance Services</strong></h3>
                <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div> 
          </div>
          <div className="col-md-6 col-lg-4 element-animated ">
            <div className="media block-6 d-block text-center">
              <div className="icon mb-3"><span className="ion-leaf " style={{ color: '#fd5f00' }} /></div>
              <div className="media-body">
                <h3 className="heading"><strong>Green Energy</strong></h3>
                <p style={{ color: '#6c757d' }}>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.</p>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </section>
  {/* END section */}
  <section className="section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h2>We Are Reliable Engineering In House</h2>
        </div>
      </div>
      <div className="row align-items-stretch">
        <div className="col-lg-4 order-lg-1">
          <div className="h-100"><div className="frame h-100"><div className="feature-img-bg h-100" style={{backgroundImage: 'url("/Industries/images/about_1.jpg")'}} /></div></div>
        </div>
        <div className="col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1">
          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="ion ion-leaf display-4" style={{ color: '#fd5f00' }} />
              <h3>Green Energy</h3>
              <p>Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>
          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="ion ion-android-bulb display-4 "style={{ color: '#fd5f00' }} />
              <h3>Precision Mechanics</h3>
              <p>Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3">
          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="ion ion-alert-circled display-4 "style={{ color: '#fd5f00' }} />
              <h3>Construction Machines</h3>
              <p>Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>
          <div className="feature-1 d-md-flex">
            <div className="align-self-center">
              <span className="ion ion-android-happy display-4 "style={{ color: '#fd5f00' }} />
              <h3>Reliable and Stable</h3>
              <p>Even the all-powerful Pointing has no control about the blind texts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <section className="section element-animate">
    <div className="container">
      <div className="row align-items-center mb-5">
        <div className="col-lg-7 order-md-2">
          <div className><div className="frame"><img src="images/about_2.jpg" alt="Image" className="img-fluid" /></div></div>
        </div>
        <div className="col-md-5 pr-md-5 mb-5">
          <div className="block-41">
            <h2 className="block-41-heading mb-5">Create, Enhance and Sustain</h2>
            <div className="block-41-text">
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
              <p><a href="#" className="readmore">Read More <span className="ion-android-arrow-dropright-circle" /></a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
  {/* <section className="section border-t pb-0">
    <div className="container">
      <div className="row justify-content-center mb-5 element-animate">
        <div className="col-md-8 text-center">
          <h2 className=" heading mb-4">Our Latest Projects</h2>
          <p className="mb-5 lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row no-gutters">
        <div className="col-md-4 element-animate">
          <a href="project-single.html" className="link-thumbnail">
            <h3>Ducting Design in Colorado</h3>
            <span className="ion-plus icon" />
            <img src="images/img_1.jpg" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-md-4 element-animate">
          <a href="project-single.html" className="link-thumbnail">
            <h3>Tanks Project In California</h3>
            <span className="ion-plus icon" />
            <img src="images/img_2.jpg" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-md-4 element-animate">
          <a href="project-single.html" className="link-thumbnail">
            <h3>Structural Design in New York</h3>
            <span className="ion-plus icon" />
            <img src="images/img_3.jpg" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-md-4 element-animate">
          <a href="project-single.html" className="link-thumbnail">
            <h3>Stacks Design</h3>
            <span className="ion-plus icon" />
            <img src="images/img_4.jpg" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-md-4 element-animate">
          <a href="project-single.html" className="link-thumbnail">
            <h3>Intercate Custom</h3>
            <span className="ion-plus icon" />
            <img src="images/img_1.jpg" alt="Image" className="img-fluid" />
          </a>
        </div>
        <div className="col-md-4 element-animate">
          <a href="project-single.html" className="link-thumbnail">
            <h3>Banker Design</h3>
            <span className="ion-plus icon" />
            <img src="images/img_2.jpg" alt="Image" className="img-fluid" />
          </a>
        </div>
      </div>
    </div>
  </section> */}
  {/* END section */}
  {/* <section className="section bg-light block-11">
    <div className="container"> 
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h2 className=" heading mb-4">Happy Clients</h2>
        </div>
      </div>
      <div className="nonloop-block-11 owl-carousel">
        <div className="item">
          <div className="block-33 h-100">
            <div className="vcard d-flex mb-3">
              <div className="image align-self-center"><img src="images/person_3.jpg" alt="Person here" /></div>
              <div className="name-text align-self-center">
                <h2 className="heading">John Smith</h2>
                <span className="meta">Companies Client</span>
              </div>
            </div>
            <div className="text">
              <blockquote>
                <p>” The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. “</p>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="block-33 h-100">
            <div className="vcard d-flex mb-3">
              <div className="image align-self-center"><img src="images/person_2.jpg" alt="Person here" /></div>
              <div className="name-text align-self-center">
                <h2 className="heading">Joshua Darren</h2>
                <span className="meta">Companies Client</span>
              </div>
            </div>
            <div className="text">
              <blockquote>
                <p>” Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. “</p>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="block-33 h-100">
            <div className="vcard d-flex mb-3">
              <div className="image align-self-center"><img src="images/person_3.jpg" alt="Person here" /></div>
              <div className="name-text align-self-center">
                <h2 className="heading">John Smith</h2>
                <span className="meta">Companies Client</span>
              </div>
            </div>
            <div className="text">
              <blockquote>
                <p>” A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. “</p>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="block-33 h-100">
            <div className="vcard d-flex mb-3">
              <div className="image align-self-center"><img src="images/person_3.jpg" alt="Person here" /></div>
              <div className="name-text align-self-center">
                <h2 className="heading">John Smith</h2>
                <span className="meta">Companies Client</span>
              </div>
            </div>
            <div className="text">
              <blockquote>
                <p>” Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. “</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
    

  </section> */}
  {/* END section */}


  {/* <section className="section blog">
    <div className="container">
      <div className="row justify-content-center mb-5 element-animate">
        <div className="col-md-8 text-center">
          <h2 className=" heading mb-4">Blog Posts</h2>
          <p className="mb-5 lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="media mb-4 d-md-flex d-block element-animate">
            <a href="single.html" className="mr-5"><img src="images/img_2.jpg" alt="Free website template by Free-Template.co" className="img-fluid" /></a>
            <div className="media-body">
              <span className="post-meta">Feb 26th, 2018</span>
              <h3 className="mt-2 text-black"><a href="single.html">Separated they live in Bookmarksgrove right</a></h3>
              <p><a href="single.html" className="readmore">Read More <span className="ion-android-arrow-dropright-circle" /></a></p>
            </div>
          </div>
          <div className="media mb-4 d-md-flex d-block element-animate">
            <a href="single.html" className="mr-5"><img src="images/img_3.jpg" alt="Free website template by Free-Template.co" className="img-fluid" /></a>
            <div className="media-body">
              <span className="post-meta">Feb 26th, 2018</span>
              <h3 className="mt-2 text-black"><a href="single.html">Separated they live in Bookmarksgrove right</a></h3>
              <p><a href="single.html" className="readmore">Read More <span className="ion-android-arrow-dropright-circle" /></a></p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="media mb-4 d-md-flex d-block element-animate">
            <a href="single.html" className="mr-5"><img src="images/img_2.jpg" alt="Free website template by Free-Template.co" className="img-fluid" /></a>
            <div className="media-body">
              <span className="post-meta">Feb 26th, 2018</span>
              <h3 className="mt-2 text-black"><a href="single.html">Separated they live in Bookmarksgrove right</a></h3>
              <p><a href="single.html" className="readmore">Read More <span className="ion-android-arrow-dropright-circle" /></a></p>
            </div>
          </div>
          <div className="media mb-4 d-md-flex d-block element-animate">
            <a href="single.html" className="mr-5"><img src="images/img_3.jpg" alt="Free website template by Free-Template.co" className="img-fluid" /></a>
            <div className="media-body">
              <span className="post-meta">Feb 26th, 2018</span>
              <h3 className="mt-2 text-black"><a href="single.html">Separated they live in Bookmarksgrove right</a></h3>
              <p><a href="single.html" className="readmore">Read More <span className="ion-android-arrow-dropright-circle" /></a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}
  {/* <section className="section bg-primary">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h2 className="text-white mb-0">Create, Enhance and Sustain</h2>
          <p className="text-white lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. .</p>
        </div>
        <div className="col-lg-4 text-lg-right">
          <a href="https://free-template.co/" className="btn btn-outline-white px-4 py-3">Download This Template</a>
        </div>
      </div>
    </div>
  </section> */}
   {/* END section */}

  {/* END footer */}
  {/* loader */}
  {/* <div id="loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx={24} cy={24} r={22} fill="none" strokeWidth={4} stroke="#eeeeee" /><circle className="path" cx={24} cy={24} r={22} fill="none" strokeWidth={4} strokeMiterlimit={10} stroke="#f4b214" /></svg></div> */}
</div>

    
  )
}

export default Home
