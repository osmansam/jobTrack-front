import { UserType, LoginType } from "./../../shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

interface UserState {
  user: UserType;
  isUserLoading: boolean;
  isUserLoggedIn: boolean;
}
const initialState: UserState = {
  user: {
    name: "",
    lastName: "",
    email: "",
    role: "",
    userId: "",
  },
  isUserLoading: false,
  isUserLoggedIn: false,
};

////////////////////////////////////////////////////////////////
//register user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: UserType, thunkAPI: any) => {
    const url = "auth/register";
    try {
      const resp = await customFetch.post(url, user);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: LoginType, thunkAPI: any) => {
    const url = "auth/login";
    try {
      const resp = await customFetch.post(url, user);
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
//logout user
export const logout = createAsyncThunk("user/logout", async () => {
  const url = "auth/logout";
  try {
    const resp = await customFetch.delete(url);
    return resp.data;
  } catch (error: any) {
    return error.response.data.msg;
  }
});

////////////////////////////////////////////////////////////////

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = initialState.user;
      removeUserFromLocalStorage();
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isUserLoggedIn = true;
        state.user = action.payload;
        addUserToLocalStorage(state.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isUserLoggedIn = true;
        state.user = action.payload;
        addUserToLocalStorage(state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isUserLoggedIn = false;
        state.user = initialState.user;
        removeUserFromLocalStorage();
      })
      .addCase(logout.rejected, (state, action) => {
        state.isUserLoading = false;
      });
  },
});

export const { logoutUser, setIsUserLoggedIn } = userSlice.actions;
export default userSlice.reducer;
