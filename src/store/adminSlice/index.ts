import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { RootState } from "..";

export type AdminState = {
  email: string;
  token: string;
  error?: string;
};

const initialState: AdminState = {
  email: "",
  token: "",
};

const signIn = createAsyncThunk(
  "admin/signIn",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    // const response = await axios.post(
    //     "https://api.example.com/admin/signin",
    //     payload
    // );
    // if (response.status !== 200) {
    //     throw new Error("Invalid email or password");
    // }

    const auth = localStorage.getItem("auth");
    if (!auth) {
      return rejectWithValue("User with this email does not exist");
    }

    const { email, password } = JSON.parse(auth) as {
      email: string;
      password: string;
    };
    if (email !== payload.email || password !== payload.password) {
      return rejectWithValue("Invalid email or password");
    }

    const response = {
      data: {
        email: payload.email,
        token: crypto.randomUUID().toString(),
      },
    };

    localStorage.setItem("token", response.data.token);

    return response.data;
  }
);

const signOut = createAsyncThunk("admin/signOut", async () => {
  return initialState;
});

const register = async (payload: { email: string; password: string }) => {
  // const response = await axios.post(
  //     "https://api.example.com/admin/register",
  //     payload
  // );
  // if (response.status !== 200) {
  //     throw new Error("Invalid email or password");
  // }

  const response = {
    data: {},
  };

  localStorage.setItem("auth", JSON.stringify(payload));

  return response.data;
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    });
  },
});

export { signIn, signOut, register };

export default adminSlice.reducer;

export const selectAdmin = (state: RootState) => state.admin;
