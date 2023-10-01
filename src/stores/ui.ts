import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type FilterMaps = 'all' | 'mine';
interface UIStore {
  loading: boolean;
  filterMyMaps: FilterMaps;
  isWalletConnected: boolean;
  wallet: any | null;
  isCreationViewOpen: boolean;
  isDialogOpen: boolean;
  menu: {
    isOpen: boolean;
  };
  battle: {
    isOpen: boolean;
  };
  setLoading: (loading: boolean) => void;
  closeDialog: () => void;
  openDialog: (isOpen: boolean) => void;
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
    isDialogOpen: false,
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
    setCreateMapView: (active) => set(() => ({ isCreationViewOpen: active })),
    closeDialog: () =>
      set(() => ({
        isDialogOpen: false,
      })),
    openDialog: (isOpen) => set(() => ({ isDialogOpen: isOpen })),
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
