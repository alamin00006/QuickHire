export type Paginated<T> = {
  data: T[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  success?: boolean;
  message?: string;
};

export type UserListItem = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  status: boolean;
  createdAt: string;
  userRoles?: RoleItem[];
};

export type Role = {
  id: number;
  name: string;
};
export type RoleItem = {
  role: Role;
};

export type UserDetails = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userRoles: RoleItem[];
  permissions: string[];
};

export type GetUsersQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type CreateUserDto = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
  roleIds?: string[]; // optional
};

export type UpdateUserDto = {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
};
