import { axiosInstance } from "../../utils/axiosSetup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiErrors } from "../../utils/validation";
import { BASE_URL } from "../../constant";
import axios from 'axios'


const userToken = localStorage.getItem("token");

const toastObj = {position: "top-right"};


export const formSubmitPost = async( url, data ) => {
    let form = await fetch(BASE_URL + url, {
      method: "POST",
      body: data,
      mode: 'cors',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    })
    .then((result) => {
      if (result.status != 200) { 
        console.log(result)
        throw new Error("Bad Server Response"); 
    }
      return result.text();
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => { console.log(error); });
    return false;
  }

const responseCheck = (res) => {
   
    if(res.status === 200 || res.status === 201 || res.status === 204){
        return true;
    }
    else{
        return false;
    }
}

export const getExportAPI = async (url) => {
    try {
        console.log('HREF', url);
        const response = await axios({
            url: url,
            method: 'get',
            responseType: 'arraybuffer',
            headers: !!userToken ? { Authorization: `Bearer ${userToken}` } : null,
        });
        console.log('BUFFER', response);
        
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url2 = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url2;
        link.setAttribute('download', `exported.pdf`);
        document.body.appendChild(link);
        link.click();

        if (responseCheck(response)) {
            return response.data.data;
        }
        if (response.status === 401) {
            toast.error('Unauthorized User!', toastObj);
            return false;
        } else {
            toast.error(response.data.message, toastObj);
            return false;
        }
    } catch (err) {
        console.log('ERROR', err);
        if (err.response) {
            console.log('Error Response:', err.response.data);
            console.log('Error Status:', err.response.status);
        } else if (err.request) {
            console.log('Request Error:', err.request);
        } else {
            console.log('Error Message:', err.message);
        }
        toast.error('Error downloading PDF. Please try again later.', toastObj);
        return false;
    }
};





export  const getAPI = async(url) => {
    try {
        const response = await axiosInstance.get(url);
        console.log('response.status',response.status)
        if(responseCheck(response)){
            return response.data;
            
        }
        if(response.status === 401){
            toast.error('Unauthorized User!',toastObj);
            return false;
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {
        console.log(err)
        if(err.response.status === 500 || err.response.status === 401){
            toast.error(err.response.data.message, toastObj)
         }
         else{
             let errs = err.response.data.errors;
             apiErrors(errs)
         }
         
         return false;
    }
}


export  const postAPI = async(url,data) => {
    try {
        const response = await axiosInstance.post(url, data);
        console.log('API REESPONSE',response)
        if(responseCheck(response)){
            toast.success(response.data.message,toastObj);
            return response.data;
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {

        console.log('ERRROR', err)
        if(err.response.data.code === 500){
           toast.error(err.response.data.message, toastObj)
        }
        else if(err.response.data.code === 404){
            toast.error(err.response.data.message);
        }
        else{
            let errs = err.response.data.errors;
            apiErrors(errs)
        }
        
        return false;
    }
}


export  const patchAPI = async(url,data) => {
    try {
        const response = await axiosInstance.patch(url, data);
        
        if(responseCheck(response)){
            toast.success(response.data.message,toastObj);
            return response.data;
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {
        if(err.response.status === 500){
            toast.error(err.response.data.message, toastObj)
        }
        else{
            let errs = err.response.data.errors;
            apiErrors(errs)
        }
        return false;
    }
}

export  const deleteAPI = async(url) => {
    try {
        const response = await axiosInstance.delete(url);
        if(responseCheck(response)){
            toast.success(response.data.message,toastObj);
            return response.data;
        }
        else{
            toast.error(response.data.message,toastObj);
            return false;
        }
    } catch (err) {
        if(err.response.status === 500){
            toast.error(err.response.data.message, toastObj)
        }
        else{
            let errs = err.response.data.errors;
            apiErrors(errs)
        }
        return false;
    }
}