import axios from "axios";
import { base_url, getAxiosConfig } from "../../utils/config";

const getList = async (cancelToken) => {
  const response = await axios.get(`${base_url}todo/`,getAxiosConfig(cancelToken));
  return response.data;
};

const addTodo =async(data)=>{
    const response =await axios.post(`${base_url}todo/create`,data,getAxiosConfig());
    return response.data
}

const deleteTodo=async(id)=>{
  const response= await axios.delete(`${base_url}todo/delete/${id}`,getAxiosConfig());
  return response.data
}

const todoServices={
    getList,
    addTodo,
    deleteTodo
}

export default todoServices