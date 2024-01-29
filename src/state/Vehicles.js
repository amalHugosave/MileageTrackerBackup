import { create } from 'zustand'

const useVehicleStore = create((set) => ({
    name: '',
    type : 0,
    image : '',
    engine : '',
    vehId : '',
    userId : '',
    setVehicle : (newState) => {
        // console.log("y");
        set((state) => (newState))
    },
    deleteVehicles : ()=>{
        set((state) => ({}))
    }
}))

export default useVehicleStore;