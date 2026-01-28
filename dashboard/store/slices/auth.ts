import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUIState {
    sentEmail: string;
}

const initialState: AuthUIState = {
    sentEmail: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSentEmail(state, action: PayloadAction<string>) {
            state.sentEmail = action.payload;
        },
        clearAuthState(state) {
            state.sentEmail = "";
        },
    },
});

export const { setSentEmail, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
