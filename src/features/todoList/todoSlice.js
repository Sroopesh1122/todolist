import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoServices from "./todoServices";

const initialState = {
  list: [],
  create: {
    data: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  delete: {
    id: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getList = createAsyncThunk(
  "todo/list",
  async (cancelToken, thunkAPI) => {
    try {
      return await todoServices.getList(cancelToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/create",
  async (data, thunkAPI) => {
    try {
      return await todoServices.addTodo(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id, thunkAPI) => {
    try {
      return await todoServices.deleteTodo(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetTodoState = createAction("todo/reset");
export const deleteItem = createAction("todo/delete");
export const addItem=createAction("todo/add");
export const resetDeleteState=createAction("todo/reset/delete")

const todoSlice = createSlice({
  name: "todo",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        if (!action?.payload?.message) {
          state.list = action.payload;
        }
      })
      .addCase(getList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action?.payload?.response?.data;
      })
      .addCase(resetTodoState, () => initialState)
      .addCase(deleteItem, (state) => {
        let tempList=[]
        state.list?.forEach((val,i)=>{
            if(val?._id !== state.delete.id){
                tempList.push(val)
            }
        })
        state.list=tempList
      }).addCase(addItem,(state)=>{
        state.list?.push(state.create?.data)
      }
      ).addCase(resetDeleteState,(state)=>{
        state.delete.isError=false;
        state.delete.isSuccess = false;
        state.delete.message = "";
        state.delete.isLoading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.create.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.create.isLoading = false;
        state.create.isSuccess = true;
        state.create.isError = false;
        state.create.data = action.payload;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.create.isLoading = false;
        state.create.isSuccess = false;
        state.create.isError = true;
        state.create.message = action?.payload?.response?.data;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.delete.isLoading = true;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.delete.isError = true;
        state.delete.isSuccess = false;
        state.delete.message = "Something went wrong";
        state.delete.isLoading = false;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.delete.isError = false;
        state.delete.isSuccess = true;
        state.delete.isLoading = false;
        state.delete.id = action?.payload?.id;
        state.delete.message = "";
      });
  },
});

export default todoSlice.reducer;
