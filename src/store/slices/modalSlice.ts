import { createSlice } from "@reduxjs/toolkit";

export type ModalState = {};

const initialState = {};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState as ModalState,
  reducers: {},
  extraReducers: {},
});

export default modalSlice;
