import { StoreActionTypes, User } from "./store-types/types";

type AddUserAction = {
  type: StoreActionTypes.AddUser;
  payload: User;
};

export type { AddUserAction };
