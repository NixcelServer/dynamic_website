import axios from "axios";
import { baseURL } from "../../variable";


export const getProductsAPI = async() => {
    const res = await axios.get(`${baseURL}get-product-details`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
  }

  export const getProductDetailsAPI = async() => {
    const res = await axios.get(`${baseURL}get-products`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
  }

  export const getSM1ProdAPI = async(encSubMenu1Id) => {
    const res = await axios.get(`${baseURL}get-sm1-prods/${encSubMenu1Id}`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
  }

  export const getSM2ProdAPI = async(encSubMenu2Id) => {
    const res = await axios.get(`${baseURL}get-sm2-prod/${encSubMenu2Id}`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
  }