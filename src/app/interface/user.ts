export interface User {
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  avatar: string;
  userAgent: string;
  createdOn: string;
  updatedOn: string;
  lastEntry: string;
  isActive: boolean;
  posts: Post[];
  comments: Comment[];
  id: string;
}

export interface Post {
  id: string;
  body: string;
  title: string;
  createdOn: string;
  updatedOn: string;
}

export interface Comment {
  id: string;
  postId: string;
  text: string;
  createdOn: string;
  updatedOn: string;
}

export interface UserToAdd {
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  isActive: boolean;
}

export class Auth {
  public id: string;
  public role: Role;
  public username: string;
  public firstName: string;
  public lastName: string;
  public middleName?: string;
  public avatar: string;

  constructor(id: string, role: Role, firstName: string, lastName: string, middleName: string, username: string, avatar: string) {
    this.id = id;
    this.role = role;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.avatar = avatar;
  }
}


export enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

