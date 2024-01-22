import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
import { UsersStore } from "./store-types/types";

const initialState: UsersStore = {
  users: [],
};

export const usersSlice = createSlice({
  initialState,
  name: "Users",
  reducers: {
    addUser: (state, action) => {
      const newUser = { ...action.payload, key: nanoid() };
      state.users.push(newUser);
    },
  },
});

const store = configureStore({
  reducer: usersSlice.reducer,
});

export type AppStore = ReturnType<typeof store.getState>;

export const { addUser } = usersSlice.actions;

export default store;
