import React from 'react'

function ProductExample() {
  return (
  <div>
    <div className="inner-page">
  <div className="slider-item" style={{backgroundImage: 'url("/Industries/images/hero_2.jpg")'}}>
    <div className="container">
      <div className="row slider-text align-items-center justify-content-center">
        <div className="col-md-8 text-center col-sm-12 element-animated pt-5">
          <h1 className="pt-5"><span>Product Name</span></h1>
          <p className="mb-5 w-75 pl-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  </div>
</div>
  <section className="plant-section my-5">
    <div className="container">
      <div className="row mb-4">
        <div className="col-12 col-sm-6 product-img">
          <img src="/Industries/images/prod_1.jpg" className="w-100" alt />
        </div>
        <div className="col-12 col-sm-6 product-content-bg ">
          <h4>Used Oil Refining</h4>
          <p>is a process technology and engineering company offering a wide range of oil &amp; gas equipment’s and services for re-refining/recycling of waste/used lubricating oils.</p>
          <p>
            Re-refining is the chemical process technology to recover the lubricating base oil from waste lubricants. Water, fuel oil, additives and sludge are separated from the base oil.
          </p>
          <p>
            ChemSepT's technology for re-refining is based on vacuum distillation (using Wiped Film Evaporation). This is the most successful commercial method of re-refining.
          </p>
          <p>
            What's more, ChemSepT's complete process treats used oil to produce base oil, which meets API Group II specifications.
          </p>
        </div>
      </div>
    </div>
  </section>
</div>

  )
}

export default ProductExample
