import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { exchanges as mockExchanges } from '@/data/exchanges'
import { users } from '@/data/users'

const STATUSES = ['requested', 'accepted', 'handover', 'borrowed', 'return_due', 'inspection', 'settlement', 'rated']

export const useExchangeStore = create(
  persist(
    (set, get) => ({
      exchanges: mockExchanges,
      currentUser: users[0],
      statuses: STATUSES,

      setCurrentUser: (user) => set({ currentUser: user }),

      createExchange: (exchange) =>
        set((state) => ({
          exchanges: [
            ...state.exchanges,
            {
              ...exchange,
              id: `ex${Date.now()}`,
              status: 'requested',
              requestedAt: new Date().toISOString(),
            },
          ],
        })),

      updateExchangeStatus: (exchangeId, newStatus) =>
        set((state) => ({
          exchanges: state.exchanges.map((ex) => {
            if (ex.id !== exchangeId) return ex
            const statusField = `${newStatus}At`
            return {
              ...ex,
              status: newStatus,
              [statusField]: new Date().toISOString(),
            }
          }),
        })),

      getExchangeById: (id) => {
        return get().exchanges.find((ex) => ex.id === id)
      },

      getExchangesByUser: (userId) => {
        return get().exchanges.filter(
          (ex) => ex.borrowerId === userId || ex.lenderId === userId
        )
      },

      getExchangesByResource: (resourceId) => {
        return get().exchanges.filter((ex) => ex.resourceId === resourceId)
      },

      getActiveExchange: (resourceId) => {
        return get().exchanges.find(
          (ex) => ex.resourceId === resourceId && ex.status !== 'rated' && ex.status !== 'settlement'
        )
      },

      isRevealed: (exchangeId) => {
        const exchange = get().exchanges.find((ex) => ex.id === exchangeId)
        return exchange && exchange.status !== 'requested'
      },

      getNextStatus: (currentStatus) => {
        const idx = STATUSES.indexOf(currentStatus)
        if (idx === -1 || idx >= STATUSES.length - 1) return null
        return STATUSES[idx + 1]
      },

      getAllUsers: () => users,
    }),
    {
      name: 'campus-circular-exchanges',
      partialize: (state) => ({
        exchanges: state.exchanges,
        currentUser: state.currentUser,
      }),
    }
  )
)
