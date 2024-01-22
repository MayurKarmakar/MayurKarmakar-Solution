import { nanoid } from "@reduxjs/toolkit";
import { Users } from "./store-types/types";
import { AddUserAction } from "./actions";

const addUserReducer = (state: Users, action: AddUserAction) => {
  const newUser = { ...action.payload, key: nanoid() };
  state.push(newUser);
};

export { addUserReducer };
