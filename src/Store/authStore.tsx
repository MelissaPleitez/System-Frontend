import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type State = {
  token: string | null;
  employeeData: string | null;
  hrData: string | null;
  isAuth: boolean;
  role: "hr" | "employee"|null
};

type Actions = {
  setToken: (token: string) => void;
  setEmployee: (info: any) => void;
  setHr: (info: any) => void;
  logout:()=> void;
};

const authStore = create(
  persist<State & Actions>(
    (set) => ({
      token: null,
      employeeData: "",
      hrData: "",
      isAuth: false,
      role:null,
      setToken: (token: string) =>
        set((state) => ({
          token: token,
          isAuth: true,
        })),

      setEmployee: (employeeData: any) =>
        set((state) => ({
          employeeData: employeeData,
          role:"employee"
        })),
      setHr: (hrData: any) =>
        set((state) => ({
          hrData: hrData,
          role: "hr"
        })),
        logout: ()=>set(state=>({
          token: null,
          isAuth: false,
          employeeData:"",
          hrData: ""
        })),
    }),

    {
      name: "auth",
    }
  )
);

export { authStore };
