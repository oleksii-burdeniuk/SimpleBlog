import { getLocales } from "expo-localization";
import { create } from "zustand";
const deviceLanguage = getLocales()[0]?.languageCode || "en";

interface UsersStore {
  language: string;
  theme: "light" | "dark";

  setLanguage: (language: string) => void;
  setTheme: (language: "light" | "dark") => void;
}

const useSettingsStore = create<UsersStore>((set) => ({
  language: deviceLanguage,
  theme: "light",
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
}));

export default useSettingsStore;
