import React from 'react'

function Test() {
  return (
    <div>
       <header role="banner">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand " href="index.html">Industries</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample05">
            <ul class="navbar-nav pl-md-5 ml-auto">
              <li class="nav-item">
                <a class="nav-link active" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="projects.html">Projects</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="services.html" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                <div class="dropdown-menu" aria-labelledby="dropdown04">
                  <a class="dropdown-item" href="services.html">Architectural Design</a>
                  <a class="dropdown-item" href="services.html">Interior</a>
                  <a class="dropdown-item" href="services.html">Building</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="blog.html">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact</a>
              </li>
            </ul>

          
          </div>
        </div>
      </nav>
    </header>
<div>
  <div className="top-shadow" />
  <section className="home-slider owl-carousel">
    <div className="slider-item" style={{backgroundImage: 'url("/Industries/images/hero_1.jpg")'}}>
      <div className="container">
        <div className="row slider-text align-items-center justify-content-center">
          <div className="col-lg-7 text-center col-sm-12 element-animate">
            <div className="btn-play-wrap mx-auto"><p className="mb-4"><a href="https://vimeo.com/59256790" data-fancybox data-ratio={2} className="btn-play"><span className="ion ion-ios-play" /></a></p></div>
            <h1 className="mb-4"><span>We Are Industrial Company</span></h1>
            <p className="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="slider-item" style={{backgroundImage: 'url("images/hero_2.jpg")'}}>
      <div className="container">
        <div className="row slider-text align-items-center justify-content-center">
          <div className="col-lg-7 text-center col-sm-12 element-animate">
            <div className="btn-play-wrap mx-auto"><p className="mb-4"><a href="https://vimeo.com/59256790" data-fancybox data-ratio={2} className="btn-play"><span className="ion ion-ios-play" /></a></p></div>
            <h1><span>Create, Enhance and Sustain</span></h1>
            <p className="mb-5 w-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END slider */}
</div>

    </div>
  )
}

export default Test
