import axios from "axios";
import { baseURL } from "../../variable";

export const getCompanyDetailsAPI = async() => {
    console.log("in navmenu api")
    const res = await axios.get(`${baseURL}get-cmp-details`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getCompanyAddressAPI = async() => {
  // console.log("in navmenu ap")
  const res = await axios.get(`${baseURL}get-cmp-address`);
  console.log(res);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const getAboutUsAPI = async() => {
  const res = await axios.get(`${baseURL}get-about-us`);
  return res.data;
}