import { User } from "@/lib/types/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    localUsers: User[];
    mapping: { email: string; name: string; sub: string };
    url: string;
}

const initialState: UsersState = {
    localUsers: [],
    mapping: { email: "", name: "", sub: "" },
    url: "",
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUrl: (state, action: PayloadAction<string>) => { state.url = action.payload; },
        setMapping: (
            state,
            action: PayloadAction<{ key: keyof UsersState["mapping"]; value: string }>
        ) => {
            state.mapping[action.payload.key] = action.payload.value;
        },
        setLocalUsers: (state, action: PayloadAction<User[]>) => { state.localUsers = action.payload; },
        clearLocalUsers: (state) => { state.localUsers = []; },
    },
});

export const { setUrl, setMapping, setLocalUsers, clearLocalUsers } = usersSlice.actions;
export default usersSlice.reducer;
