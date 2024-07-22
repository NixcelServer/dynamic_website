import axios from "axios";
import { baseURL } from "../../variable";

export const getHPSliderImgsAPI = async() => {
    console.log("in navmenu api")
    const res = await axios.get(`${baseURL}get-hp-slider-imgs`);
    console.log(res);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

