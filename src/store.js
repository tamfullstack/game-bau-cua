import { configureStore, createSlice } from "@reduxjs/toolkit";

const tienThuongMacDinh = 1000;
const mangXuatHienMacDinh = ["bau", "bau", "bau"];
const tienCuocTangGiam = 100;

const { actions, reducer } = createSlice({
  name: "gameBauCua",
  initialState: {
    tienThuong: tienThuongMacDinh,
    mangXuatHien: [...mangXuatHienMacDinh],
    mangCuoc: [
      { id: "nai", tienCuoc: 0, xuatHien: 0 },
      { id: "bau", tienCuoc: 0, xuatHien: 0 },
      { id: "ga", tienCuoc: 0, xuatHien: 0 },
      { id: "ca", tienCuoc: 0, xuatHien: 0 },
      { id: "cua", tienCuoc: 0, xuatHien: 0 },
      { id: "tom", tienCuoc: 0, xuatHien: 0 },
    ],
  },
  reducers: {
    cuoc(state, action) {
      let quanCuocIndex = state.mangCuoc.findIndex(
        (quanCuoc) => quanCuoc.id === action.payload.id
      );

      if (action.payload.tangGiam) {
        if (state.tienThuong > 0) {
          state.mangCuoc[quanCuocIndex].tienCuoc += tienCuocTangGiam;
          state.tienThuong -= tienCuocTangGiam;
        }
      } else {
        if (state.mangCuoc[quanCuocIndex].tienCuoc > 0) {
          state.mangCuoc[quanCuocIndex].tienCuoc -= tienCuocTangGiam;
          state.tienThuong += tienCuocTangGiam;
        }
      }
    },

    xoc(state) {
      for (let i = 0; i < state.mangXuatHien.length; i++) {
        let soNgauNhien = Math.floor(Math.random() * 6);

        state.mangXuatHien[i] = state.mangCuoc[soNgauNhien].id;
        state.mangCuoc[soNgauNhien].xuatHien++;
      }

      for (let i = 0; i < state.mangCuoc.length; i++) {
        if (state.mangCuoc[i].xuatHien > 0) {
          state.tienThuong +=
            (1 + state.mangCuoc[i].xuatHien) * state.mangCuoc[i].tienCuoc;
          state.mangCuoc[i].xuatHien = 0;
        }

        state.mangCuoc[i].tienCuoc = 0;
      }
    },

    lamMoi(state) {
      state.tienThuong = tienThuongMacDinh;
      state.mangXuatHien = [...mangXuatHienMacDinh];

      for (let i = 0; i < state.mangCuoc.length; i++) {
        state.mangCuoc[i].tienCuoc = 0;
      }
    },
  },
});

export const { cuoc, xoc, lamMoi } = actions;

const store = configureStore({ reducer });

export default store;
