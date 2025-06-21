import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            if (!state.pastes.find((p) => (p._id === paste._id || p.title === paste.title))) {
                state.pastes.push(paste);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
            }
            toast.success("Paste Created Successfully!!");
        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === paste._id);
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste Updated");
            }
            else {
                toast.error("Paste Does Not Exists!!\nCreate a new one");
            }

        },
        resetAllPastes: (state, action) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success("Pastes deleted Successfully!!");
        },
        removeFromPastes: (state, action) => {
            const paste = action.payload;
            
            console.log("paste Id Del:", paste._id);
            const index = state.pastes.findIndex((item) => item._id === paste._id);
            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success("Paste Deleted Successfully!!");
            }
            else {
                toast.error("Paste Not Found!!");
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer