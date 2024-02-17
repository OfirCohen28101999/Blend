import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProps } from '../../shared/types';

interface IUserState {
  user: UserProps | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
