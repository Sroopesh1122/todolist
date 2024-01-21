import axios from "axios";
import { base_url, getAxiosConfig } from "../../utils/config";

const login = async (data) => {
  const response = await axios.post(`${base_url}user/login`, data);
  if (response?.data?.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const updateProfile = async (data) => {
    const response = await axios.put(`${base_url}user/update`, data,getAxiosConfig())
    return response.data;
  };

const getProfile=async()=>{
    const response=await axios.get(`${base_url}user/profile`,getAxiosConfig())
    return response.data
}

const createUser =async(data)=>{
  const response=await axios.post(`${base_url}user/create`,data)
  return response.data
}

const userServices = {
  login,
  getProfile,
  updateProfile,
  createUser
};
export default userServices;
