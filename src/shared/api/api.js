import axios from "axios";
import { dataBarang } from "../constants/products";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let localDataBarang = [...dataBarang];

export const barangService = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return localDataBarang;
  },

  create: async (newData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const barangBaru = {
      id: localDataBarang.length + 1,
      ...newData,
      stok: Number(newData.stok),
    };
    localDataBarang.push(barangBaru);
    return barangBaru;
  },

  update: async (id, updatedData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    localDataBarang = localDataBarang.map((item) =>
      item.id === Number(id)
        ? { ...item, ...updatedData, stok: Number(updatedData.stok) }
        : item,
    );
    return { success: true };
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    localDataBarang = localDataBarang.filter((item) => item.id !== Number(id));
    return { success: true };
  },
};
