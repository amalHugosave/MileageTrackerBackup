import { create } from 'zustand'

const useUserStore = create((set) => ({
    name: '',
    nickname : '',
    email : '',
    passcode : '',
    id : '',
    setUser : (newState) => {
        // console.log("y");
        set((state) => (newState))
    },
    setPasscode : (passcode) =>{
        set((state) =>({passcode : passcode}))
    },setId : (id) =>{set((state) =>({id : id}))}
}))

export default useUserStore;