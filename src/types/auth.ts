/**
 * User interface representing user data throughout the application
 */
export interface User {
  _id: string;
  id?: string; // For backward compatibility
  phoneNo: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  address?: UserAddress | UserAddress[];
  FavouriteProd?: string[];
}

/**
 * User address structure used for shipping addresses
 */
export interface UserAddress {
  id?: string;
  addressId?: string;
  street: string;
  state: string;
  country: string;
  postalCode: string;
  city: string;
  selected?: boolean;
}

/**
 * Request body for POST /api/login
 * Used to initiate login with a phone number, triggering OTP generation.
 */
export interface LoginRequest {
  phoneNo: string;
}

/**
 * Request body for POST /api/login/verifyOTP
 * Used to verify the OTP after login initiation.
 */
export interface VerifyOtpRequest {
  phoneNo: string;
  otp: string;
}

/**
 * Response from POST /api/login/verifyOTP
 * Returns the user data and a token to be stored in cookies.
 */
export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    phoneNo: string;
    isAdmin?: boolean;
    email?: string;
    address?: UserAddress | UserAddress[];
    FavouriteProd?: string[];
  };
}

/**
 * Request body for POST /api/login/resendOTP
 * Used to resend OTP in case the user didn't receive it.
 */
export interface ResendOtpRequest {
  phoneNo: string;
}

/**
 * Response from POST /api/login/resendOTP
 * Usually returns a simple success confirmation.
 */
export interface ResendOtpResponse {
  message: string;
}

/**
 * Response from GET /api/logout
 * Called when logging out the user. No request body needed.
 */
export interface LogoutResponse {
  message: string;
}

/**
 * Request body for PUT /api/users/:id
 * Used when updating user name.
 */
export interface UpdateUserNameRequest {
  name: string;
}

/**
 * Response from PUT /api/users/:id
 * Returns a new token after updating user details.
 */
export interface UpdateUserNameResponse {
  token: string;
}

/**
 * Token payload decoded from JWT, used to persist auth state in the app.
 */
export interface DecodedToken {
  _id: string;
  name: string;
  phoneNo: string;
  isAdmin: boolean;
}

/**
 * User details combined with authentication token
 */
export interface UserDetails {
  user: User;
  token: string;
}

/**
 * Navigation props for screens
 */
export interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
  toggleDrawer: () => void;
}

/**
 * Login screen props
 */
export interface LoginScreenProps {
  navigation: NavigationProps;
}
