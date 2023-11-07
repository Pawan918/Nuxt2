import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    cartValue: 0,
    cartData: [],
  }),
  getters: {
    totalCartValue: (state) => {
      if (state.cartData.length)
        return state.cartData
          .map((data) => {
            return data.itemsCount * data.data.price;
          })
          .reduce((acc, currVal) => acc + currVal);
      return 0;
    },
  },
  persist: true,
});
