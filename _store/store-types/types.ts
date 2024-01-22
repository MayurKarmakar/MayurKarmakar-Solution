export enum StoreActionTypes {
  AddUser = "ADD_USER",
}

type User = {
  name: string;
  age: string;
  sex: string;
  mobile: string;
  govtIdType: string;
  govtId: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
  key: string;
};

type Users = User[];

type UsersStore = {
  users: Users;
};

export type { User, Users, UsersStore };

