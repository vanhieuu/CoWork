import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firebaseAuth } from "../constants";

export interface ProviderData {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
}




export type IUser = {
  _redirectEventId: string;
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string;
  photoURL: string;
  providerData: ProviderData[];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  tenantId: string;
  uid: string;
};

export type TokenResponse =  {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localeId: string;
  refreshToken: string;
  registered: boolean;
}

export interface IUserCredential {
  _tokenResponse: TokenResponse;
  operationType: string;
  providerId: undefined;
  user: IUser;
}

export interface IAuth {
    userCredentials:IUserCredential
}

const initState: IUserCredential = {
    _tokenResponse: {
        displayName: "",
        email: "",
        expiresIn: "",
        idToken: "",
        kind: "",
        localeId: "",
        refreshToken: "",
        registered: false,
    },
    operationType: "",
    providerId: undefined,
    user: {
        _redirectEventId: "",
        apiKey: "",
        appName: "",
        createdAt: "",
        displayName: "",
        isAnonymous: false,
        lastLoginAt: "",
        phoneNumber: "",
        photoURL: "",
        providerData: [],
        stsTokenManager: {
            accessToken: "",
            expirationTime: 0,
            refreshToken: ""
        },
        tenantId: "",
        uid: ""
    }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    onLogin: (state, action: PayloadAction<IUserCredential>) => {
        state._tokenResponse = action.payload._tokenResponse;
        state.operationType = action.payload.operationType
        state.providerId = action.payload.providerId
        state.user = action.payload.user
    },
  },
});
export const { onLogin } = authSlice.actions;
export default authSlice.reducer;
