export interface UserResponse {
  currentStep: number;
  verifyForm: {
    address_line1: null | string;
    address_line2: null | string;
    city: null | string;
    date_of_birth: null | string;
    email: null | string;
    first_name: null | string;
    last_name: null | string;
    lived_in_country: null | string;
    otp: null | string;
    otp_timestamp: null | string;
    phone_number: null | string;
    state: null | string;
    user_id: null | string;
    worked_in_country: null | string;
    zip_code: null | string;
  };
  user: {
    sub: string;
    first_name: string;
    last_name: string;
    nickname: string;
    name: string;
    picture: string;
    locale: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    user_id: string;
    auth0_id: string;
    created_at: string;
    last_login: string;
  };
}

export interface Profile {
  profile_id: string;
  user_id: string;
  last_completed_step: number;
  step1_data: object;
  step2_data: object;
  step3_data: object;
  completed: boolean;
  otp: string | null;
  otp_timestamp: string | null;
}

export interface ApiResponse {
  user: UserResponse;
  profile: Profile;
}

export interface UserResponseType {
  data: UserResponse | null;
  status: string;
  error: string | null | {};
}
