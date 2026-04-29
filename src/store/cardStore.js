import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCardStore = create(
  persist(
    (set, get) => ({
      cards: [],

      addCard: (card) =>
        set((state) => ({
          cards: [
            ...state.cards,
            { ...card, id: Date.now(), swipedCount: 0 },
          ],
        })),

      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== id),
        })),

      incSwiped: (id) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, swipedCount: c.swipedCount + 1 } : c
          ),
        })),

      decSwiped: (id) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id && c.swipedCount > 0
              ? { ...c, swipedCount: c.swipedCount - 1 }
              : c
          ),
        })),

      resetSwipedCount: () =>
        set((state) => ({
          cards: state.cards.map((c) => ({ ...c, swipedCount: 0 })),
        })),

      getEnabledCards: () => get().cards.filter((c) => c.enabled),
    }),
    {
      name: "card-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCardStore;