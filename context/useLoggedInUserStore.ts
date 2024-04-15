import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { User } from "@prisma/client";

type LoggedInUserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

const useLoggedInUserStore = create<LoggedInUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      { name: "loggedInUser", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
export const setLoggedInUser = (user: User) => {
  useLoggedInUserStore.setState({ user });
};

export const getLoggedInUser = () => {
  return useLoggedInUserStore.getState().user;
};
