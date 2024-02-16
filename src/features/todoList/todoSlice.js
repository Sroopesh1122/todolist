import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoServices from "./todoServices";

const initialState={
    list:[],
    create:{
    data:null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
    },
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

export const getList=createAsyncThunk('todo/list',async(cancelToken,thunkAPI)=>{
    try {
        return await todoServices.getList(cancelToken)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addTodo=createAsyncThunk('todo/create',async(data,thunkAPI)=>{
    try {
        return await todoServices.addTodo(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetTodoState=createAction('user/reset')

const todoSlice=createSlice({
    name:"todo",
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getList.pending,(state)=>{
            state.isLoading=true
        }).addCase(getList.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            if(!action?.payload?.message)
            {
                state.list=action.payload
            }
        }).addCase(getList.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action?.payload?.response?.data
        }).addCase(resetTodoState,()=>initialState)
        .addCase(addTodo.pending,(state)=>{
            state.create.isLoading=true
        }).addCase(addTodo.fulfilled,(state,action)=>{
            state.create.isLoading=false
            state.create.isSuccess=true
            state.create.isError=false
            state.create.data=action.payload
        }).addCase(addTodo.rejected,(state,action)=>{
            state.create.isLoading=false
            state.create.isSuccess=false
            state.create.isError=true
            console.log(action?.payload);
            state.create.message=action?.payload?.response?.data
        })
    }
})


export default todoSlice.reducer