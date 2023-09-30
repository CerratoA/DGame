import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type FilterMaps = 'all' | 'mine';
interface UIStore {
  loading: boolean;
  filterMyMaps: FilterMaps;
  isWalletConnected: boolean;
  wallet: any | null;
  isCreationViewOpen: boolean;
  dialog: {
    isOpen: boolean;
    callback?: (selectedChoice?: string) => void;
    steps: string[];
    currentStepIndex: number;
    choices?: string[];
  };
  menu: {
    isOpen: boolean;
  };
  battle: {
    isOpen: boolean;
  };
  setLoading: (loading: boolean) => void;
  toggleDialog: (
    content?: string,
    choices?: string[],
    callback?: (selectedChoice?: string) => void,
  ) => void;
  closeDialog: () => void;
  toggleMenu: () => void;
  toggleBattle: () => void;
  changeFilterMyMaps: (filterMyMaps: FilterMaps) => void;
  setWalletConnected: (connected: boolean) => void;
  setWallet: (walet: any | null) => void;
  setCreateMapView: (active: boolean) => void;
  set: (fn: (state: UIStore) => UIStore) => void;
}

export const useUIStore = create<UIStore>()(
  devtools((set) => ({
    loading: true,
    filterMyMaps: 'all',
    isWalletConnected: false,
    wallet: null,
    isCreationViewOpen: false,
    dialog: {
      isOpen: false,
      callback: undefined,
      steps: [],
      currentStepIndex: 0,
      choices: [],
    },
    menu: {
      isOpen: false,
    },
    battle: {
      isOpen: false,
    },
    setLoading: (loading) => set(() => ({ loading })),
    changeFilterMyMaps: (filterMyMaps) => set(() => ({ filterMyMaps, isCreationViewOpen: false })),
    // setWalletConnected: (connected)=> set(()=> ({isWalletConnected: connected})),
    setWalletConnected: (connected) =>
      set(() => ({
        isWalletConnected: connected,
        filterMyMaps: 'all',
        isCreationViewOpen: false
      })),
    setWallet: (wallet) => set(() => ({ wallet })),
    setCreateMapView: (active) => set(()=> ({isCreationViewOpen: active})),
    toggleDialog: (content, choices, callback) =>
      set((state) => ({
        dialog: {
          isOpen: !state.dialog.isOpen,
          callback,
          steps: content?.split(";") ?? [],
          currentStepIndex: 0,
          choices,
        },
      })),
    closeDialog: () =>
      set(() => ({
        dialog: {
          isOpen: false,
          callback: undefined,
          steps: [],
          currentStepIndex: 0,
          choices: [],
        },
      })),
    toggleMenu: () =>
      set((state) => ({
        menu: {
          isOpen: !state.menu.isOpen,
        },
      })),
    toggleBattle: () =>
      set((state) => ({
        battle: {
          isOpen: !state.battle.isOpen,
        },
      })),
    set,
  })),
);
