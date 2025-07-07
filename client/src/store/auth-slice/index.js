import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'sonner'; // use `toast`, not `Toaster`

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// REGISTER
export const registerUser = createAsyncThunk(
  '/Auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  '/Auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//checkAuth
export const checkAuth = createAsyncThunk(
  '/Auth/check-auth',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  '/Auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Registered successfully!");
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.message || "Registration failed");
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          console.log(state.user);
          state.isAuthenticated = true;
          toast.success("Login successful!");
        } else {
          state.user = null;
          state.isAuthenticated = false;
          toast.error("Invalid credentials");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast.error(action.payload?.message || "Login failed");
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        console.log("isAuthenticated", state.isAuthenticated)
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        toast.success("Logged out successfully");
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        toast.error(action.payload?.message || "Logout failed");
      });
  }
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
