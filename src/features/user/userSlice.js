import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "./userServices";

const initialState={
    token:null,
    user:null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

export const login=createAsyncThunk('user/login',async(data,thunkAPI)=>{
    try {
        return await userServices.login(data)
        
    } catch (error) {
        thunkAPI.withRejectValue(error)
    }
})
export const getProfileData=createAsyncThunk('user/profile',async(thunkAPI)=>{
    try {
        return await userServices.getProfile()
        
    } catch (error) {
        thunkAPI.withRejectValue(error)
    }
})

export const profileUpdate=createAsyncThunk('user/update',async(data,thunkAPI)=>{
    try {
        return await userServices.updateProfile(data)
    } catch (error) {
        thunkAPI.withRejectValue(error)
    }
})

export const createUser=createAsyncThunk('user/create',async(data,thunkAPI)=>{
    try {
        return await userServices.createUser(data)
    } catch (error) {
        thunkAPI.withRejectValue(error)
    }
})

export const resetUserState=createAction('user/reset')

const userSlice=createSlice({
    name:"user",
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading=true
        }).addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.token=action.payload
        }).addCase(login.rejected,(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message="Error"
        }).addCase(getProfileData.pending,(state)=>{
            state.isLoading=true
        }).addCase(getProfileData.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user=action.payload
        }).addCase(getProfileData.rejected,(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message="Error"
        }).addCase(profileUpdate.pending,(state)=>{
            state.isLoading=true
        }).addCase(profileUpdate.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user=action.payload
        }).addCase(profileUpdate.rejected,(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message="Error"
        }).addCase(resetUserState,()=>initialState)
        .addCase(createUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(createUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
        }).addCase(createUser.rejected,(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message="Error"
        })
    }
})

export default userSlice.reducer
