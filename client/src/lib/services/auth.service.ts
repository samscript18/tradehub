import { ApiResponse } from "../@types";
import { LoginResponse, RegisterType } from "../@types/auth";
import { authApi, publicApi } from "../configs/axios-instance";

export const login = async (body: { email: string; password: string }) => {
  try {
    const { data } = await publicApi.post<ApiResponse<LoginResponse>>(
      "/auth/sign-in",
      body
    );

    return data.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || "Something went wrong");
  }
};

export const getRefreshToken = async (refreshToken: string) => {
  try {
    const { data } = await publicApi.post<
      ApiResponse<{
        accessToken: string;
        accessTokenExpiresAt: string;
      }>
    >("/auth/refresh", { refreshToken });

    return data.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || "Something went wrong");
  }
};

export const signUp = async (body: RegisterType) => {
  try {
    await publicApi.post("/auth/sign-up/store", body);
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || "Something went wrong");
  }
};

export const setupPassword = async (body: {
  password: string;
  token: string;
}) => {
  try {
    await publicApi.post(
      "/auth/set-password",
      { password: body.password },
      {
        headers: { Authorization: `Bearer ${body.token}` },
      }
    );
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || "Something went wrong");
  }
};

export const verifyEmail = async (body: { email: string; token: string }) => {
  try {
    const { data } = await publicApi.post<ApiResponse<LoginResponse>>(
      "/auth/verify-email",
      body
    );

    return data.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || "Something went wrong");
  }
};

export const resendOtp = async (email: string) => {
  try {
    await publicApi.post("/auth/verify-email/resend-otp", email);
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || "Something went wrong");
  }
};

export const signOut = async () => {
  try {
    await authApi.get("/auth/sign-out");
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || "Something went wrong");
  }
};
