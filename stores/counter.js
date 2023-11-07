import { defineStore } from "pinia";
export const useCounterStore = defineStore("product", {

  state: () => ({
    isLoggedIn: false,
    allProductCategories: [],
    allProductDetails: null,
  }),

  getters : {
    getProductCategoriesObject (state){
      return state.allProductCategories?.map((i)=>([{label : i}]))
    },
    getProductRecommendation(state){
      return state.productRecommendation;
    },
  },

  actions: {
    async productDetails(url) {
      const {data} = await useFetch(url)
      this.allProductDetails = data.value;
    },
    async productCategories() {
      const { data } = await useFetch(`https://dummyjson.com/products/categories`)
      this.allProductCategories = data.value
    },
    async fetchProductRecommendation(url){
      const {data} = await useFetch(url);
      this.productRecommendation = data.value

    },
    async searchProducts( query ){
      const { data } = await useFetch(`https://dummyjson.com/products/search?q=${ query }`);
      this.allProductDetails = data.value
    }
  },

});
