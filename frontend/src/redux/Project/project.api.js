import axios from "axios";
import { baseURL } from "../../variable";


export const getProjectDetailsAPI = async() => {
    const res = await axios.get(`${baseURL}project-details`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
  }

  export const getProjectsAPI = async() => {
    const res = await axios.get(`${baseURL}projects`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
  }