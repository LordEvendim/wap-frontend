import { create } from "zustand";

interface UserState {
  user: { value: string; label: string } | undefined;
}

export const useUser = create<UserState>()(() => ({
  user: undefined,
}));
