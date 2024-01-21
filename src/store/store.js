import { configureStore } from "@reduxjs/toolkit";
import userReducers from '../features/user/userSlice'
import todoReducers from '../features/todoList/todoSlice'
export const store=configureStore({
 reducer:{
    user:userReducers,
    todo:todoReducers
}
})