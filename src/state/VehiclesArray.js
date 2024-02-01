import { create } from 'zustand'

const useVehicleArrayStore = create((set) => ({
    VehiclesArray : [],
    addVehicle : (vehicle) => {
        set((state) => ([...state.VehiclesArray , ...vehicle]))
    },
    deleteVehicles : (vehicleId)=>{
        set((state) => {
            const newState = state.VehiclesArray.filter((vehicle)=>
                vehicle._id !== vehicleId
            )
            return newState;
        })
    }
}))

export default useVehicleArrayStore;