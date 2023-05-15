export type SignInType = {
  email: string;
  password: string;
  admin?: boolean;
};

export type UserType = {
  email: string;
  name: string;
  user_id: string;
  sector: string;
  password: string;
};

export type UpdateType = {
  email?: string;
  name?: string;
  sector?: string;
};

export type AuthContextType = {
  user?: UserType | null;
  signIn: (data: SignInType) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: UpdateType, password: string) => Promise<boolean>;
  isLoading: boolean;
};
