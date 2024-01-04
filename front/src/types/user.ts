export interface User {
  id: string;
  pseudo: string;
  email: string;
  passord: string;
  users: User[];
}

export interface UserQuery {
  getUser: User;
}

export interface UserListQuery {
  getAllUsers: User[];
}
