import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

export type UserState = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

const initialState: UserState[] = [];

const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
});

const createUser = createAsyncThunk("users/addUser", async (user: Omit<UserState, "id">, { getState }) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/users", { ...user, id: (getState() as RootState).users.length + 1 });
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        setUsers(state, action) {
            state = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (_state, action) => {
            return action.payload;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            return [...state, action.payload];
        });
    },
});

export const { setUsers } = usersSlice.actions;

export { fetchUsers, createUser };

export default usersSlice.reducer;

export const selectUsers = (state: RootState) => state.users;