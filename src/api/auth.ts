import authApi from "../libs/axios";

export const loginRequest = async (email: string, password: string) => {
  return authApi.post("/user/login", {
    email,
    password,
  });
};

export const employeeDash = async () => {
  return await authApi.get("/user/employee");
};

export const hrDash = async () => {
  return await authApi.get("/user/hr");
};

