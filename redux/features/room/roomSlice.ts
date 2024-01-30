import { createSlice } from '@reduxjs/toolkit';

export interface RoomTypes {
  page: number;
}

const initialState: RoomTypes = {
  page: 1,
};

const roomSlice = createSlice({
  name: 'roomSlice',
  initialState,
  reducers: {
    // citySearch:(state,action)=>{
    //     state.
    // }

    changePageNumber: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default roomSlice.reducer;
export const { changePageNumber } = roomSlice.actions;
