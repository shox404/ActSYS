import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/lib/types/auth";

interface AuthUIState {
    sentEmail: string;
    user: User | null;
}

const initialState: AuthUIState = {
    sentEmail: "",
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSentEmail(state, action: PayloadAction<string>) {
            state.sentEmail = action.payload;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        clearAuthState(state) {
            state.sentEmail = "";
            state.user = null;
        },
    },
});

export const { setSentEmail, setUser, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
