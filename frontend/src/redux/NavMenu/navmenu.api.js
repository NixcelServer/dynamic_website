import axios from "axios";
import { baseURL } from "../../variable";



export const getNavmenuAPI = async() => {
    console.log("in navmenu api")
    const res = await axios.get(`${baseURL}get-navmenu`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getSubMenu1API = async(encNavMenuId) => {
  console.log("in sub menu api")
  const res = await axios.get(`${baseURL}get-submenu1/${encNavMenuId}`);
  console.log(res);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const getSubMenu2API = async(encSubMenu1Id) => {
  console.log("in sub menu api")
  const res = await axios.get(`${baseURL}get-submenu2/${encSubMenu1Id}`);
  console.log(res);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}