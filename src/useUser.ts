import { create } from "zustand";

interface UserState {
  userId: number;
}

export const useUser = create<UserState>()(() => ({
  userId: 1,
}));
