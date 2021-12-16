import create from 'zustand'




const useGlStore = create(set => ({
    currentWave: 0,
    setCurrentWave: () => set((state) => ({ currentWave: (state.currentWave + 1) % 50 })),

}))

export default useGlStore