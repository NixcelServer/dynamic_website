import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCmpAddress, getCmpDetails } from '../../redux/Company/company.action';

function Footer() {
  const dispatch = useDispatch();
  const cmpAddress = useSelector(state => state.companyDetails.cmpAddress);
  const company = useSelector(state => state.companyDetails.company);
  const socialInfo = useSelector(state => state.companyDetails.socialInfo);
  
  // Filter images where show_status is 'yes'
  const filteredCmpAddress = cmpAddress.filter(address => address.show_status === 'yes');

  useEffect(() => {
    dispatch(getCmpAddress());
    dispatch(getCmpDetails());
  }, [dispatch]);

  const contentStyle = {
    color: '#6c757d', // Set the desired color for the content
  };

  // Function to handle external links
  const handleExternalLink = (url) => {
    // Check if the URL starts with http:// or https://
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    } else {
      // Default to https if no protocol is provided
      return `https://${url}`;
    }
  };


  return (
    <div>
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-4 mb-5">
              <h3>About Us</h3>
              <p className="mb-5" style={contentStyle}>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. .</p>
              <ul className="list-unstyled footer-link d-flex footer-social">
                {socialInfo.instagram_url && (
                  <li><a href={handleExternalLink(socialInfo.instagram_url)} className="p-2" target="_blank" rel="noopener noreferrer"><span className="fa fa-instagram" /></a></li>
                )}
                {socialInfo.facebook_url && (
                  <li><a href={handleExternalLink(socialInfo.facebook_url)} className="p-2" target="_blank" rel="noopener noreferrer"><span className="fa fa-facebook" /></a></li>
                )}
                {socialInfo.google_url && (
                  <li><a href={handleExternalLink(socialInfo.google_url)} className="p-2" target="_blank" rel="noopener noreferrer"><span className="fa fa-google" /></a></li>
                )}
                {socialInfo.linkedin_url && (
                  <li><a href={handleExternalLink(socialInfo.linkedin_url)} className="p-2" target="_blank" rel="noopener noreferrer"><span className="fa fa-linkedin" /></a></li>
                )}
              </ul>
            </div>
            <div className="col-md-5 mb-5 pl-md-5">
              <h3>Contact Info</h3>
              <ul className="list-unstyled footer-link">
                {filteredCmpAddress.map(address => (
                  <li key={address.encHPSliderImgId} className="d-block" style={contentStyle}>
                    <span className="d-block">{address.address_name} Address:</span>
                    <span>{address.house_no}, {address.area}, {address.city_village}- {address.pincode}, {address.state}, {address.country}</span> {/* Adjust how you display the address */}
                  </li>
                ))}
                {company.c_mobile_no && (
                  <li className="d-block" style={contentStyle}><span className="d-block">Mobile No: {company.c_mobile_no}</span></li>
                )}
                {company.c_alt_mobile_no && (
                  <li className="d-block" style={contentStyle}><span className="d-block">Alternate Mobile No: {company.c_alt_mobile_no}</span></li>
                )}
                {company.c_landline_no && (
                  <li className="d-block" style={contentStyle}><span className="d-block">Telephone No: {company.c_landline_no}</span></li>
                )}
                {company.c_email_id && (
                  <li className="d-block" style={contentStyle}><span className="d-block">Email: {company.c_email_id}</span></li>
                )}
              </ul>
            </div>
            <div className="col-md-3 mb-5">
              <h3>Quick Links</h3>
              <ul class="list-unstyled footer-link">
              <li><a href="#">About</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Disclaimers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
            </div>
            <div className="col-md-3">
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-md-center text-left">
              <p style={contentStyle}>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright ©
                All rights reserved by Nixcel
                {/* with <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank" className="text-primary">Colorlib</a> */}
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
