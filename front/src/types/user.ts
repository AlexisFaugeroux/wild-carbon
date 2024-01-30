export interface User {
  id: string;
  pseudo: string;
  email: string;
  passord: string;
  users: User[];
}

export interface UserQuery {
  userData: User;
}

export interface UserListQuery {
  getAllUsers: User[];
}

export interface UserType {
  [key: string]: string;
  userId: string;
  pseudo: string;
  email: string;
  passord: string;
}
