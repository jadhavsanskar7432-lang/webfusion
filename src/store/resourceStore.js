import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { resources as mockResources, categories } from '@/data/resources'

export const useResourceStore = create(
  persist(
    (set, get) => ({
      resources: mockResources,
      categories,
      filters: {
        search: '',
        category: 'all',
        sort: 'bestMatch',
      },

      setSearch: (search) =>
        set((state) => ({ filters: { ...state.filters, search } })),

      setCategory: (category) =>
        set((state) => ({ filters: { ...state.filters, category } })),

      setSort: (sort) =>
        set((state) => ({ filters: { ...state.filters, sort } })),

      resetFilters: () =>
        set({ filters: { search: '', category: 'all', sort: 'bestMatch' } }),

      getFilteredResources: () => {
        const { resources, filters } = get()
        let filtered = [...resources]

        if (filters.search) {
          const query = filters.search.toLowerCase()
          filtered = filtered.filter(
            (r) =>
              r.name.toLowerCase().includes(query) ||
              r.category.toLowerCase().includes(query) ||
              r.description.toLowerCase().includes(query) ||
              r.owner.name.toLowerCase().includes(query)
          )
        }

        if (filters.category !== 'all') {
          filtered = filtered.filter((r) => r.category === filters.category)
        }

        switch (filters.sort) {
          case 'cheapest':
            filtered.sort((a, b) => a.pricePerDay - b.pricePerDay)
            break
          case 'closest':
            filtered.sort((a, b) => a.distance - b.distance)
            break
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case 'bestMatch':
          default:
            filtered.sort((a, b) => {
              const scoreA = (b.available ? 20 : 0) + b.owner.trustScore * 0.3 + (5 - b.distance) * 10
              const scoreB = (a.available ? 20 : 0) + a.owner.trustScore * 0.3 + (5 - a.distance) * 10
              return scoreA - scoreB
            })
            break
        }

        return filtered
      },

      getResourceById: (id) => {
        return get().resources.find((r) => r.id === id)
      },
    }),
    {
      name: 'campus-circular-resources',
      partialize: (state) => ({ filters: state.filters }),
    }
  )
)
