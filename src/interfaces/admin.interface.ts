export interface Admin {
  id: number;
  municipalityId: number;
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  fpToken: string;
  fpDuration: Date;
  createdBy: number;
  updatedBy: number;
}

export interface AuthAdminResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}
