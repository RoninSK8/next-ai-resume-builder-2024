import { create } from "zustand";

interface ModalLoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useModalLoading = create<ModalLoadingState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useModalLoading;
