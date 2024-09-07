export interface SignUpFormValuesType {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  termsAccepted: boolean;
}

export interface SignInFormValuesType {
  email: string;
  password: string;
}

export interface ErrorResponse {
  message: string;
}
