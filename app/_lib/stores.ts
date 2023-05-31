import { create } from 'zustand'

interface DeleteModal {
  id: string | null
  isOpen: boolean
  open: (id: string) => void
  close: () => void
}

export const useDeleteModal = create<DeleteModal>()((set) => ({
  id: null,
  isOpen: false,
  open: (id) => set({ id, isOpen: true }),
  close: () => set({ id: null, isOpen: false }),
}))
