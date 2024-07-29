import axios from "axios";
import { baseURL } from "../../variable";

export const getServiceDetailsAPI = async() => {
    const res = await axios.get(`${baseURL}get-service-details`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getServicesAPI = async() => {
  const res = await axios.get(`${baseURL}get-services`);
  console.log(res);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const getServiceSb1API = async(encSubMenu1Id) => {
  const res = await axios.get(`${baseURL}get-service-sb1-content/${encSubMenu1Id}`);
  console.log(res);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const getServiceSb2API = async(encSubMenu2Id) => {
  const res = await axios.get(`${baseURL}get-service-sb2-content/${encSubMenu2Id}`);
  console.log(res);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}