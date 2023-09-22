import { configureStore } from "@reduxjs/toolkit";
import admin from "./adminSlice";
import users from "./usersSlice";

const store = configureStore({
    reducer: {
        admin,
        users
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;