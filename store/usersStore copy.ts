import { UserInterfaceIdiom } from "@/types/users";
import { create } from "zustand";
interface UsersStore {
  users: UserInterfaceIdiom[];

  setUser: (users: UserInterfaceIdiom[]) => void;
}

const useUsersStore = create<UsersStore>((set) => ({
  users: [],
  setUser: (users) => set({ users }),
}));

export default useUsersStore;
