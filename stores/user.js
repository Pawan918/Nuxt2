import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn : false,
    userDetails : []
  }),
  actions : {
    async authUser(username,password){
        const { data } = await useFetch(`https://dummyjson.com/auth/login`,{
            method : 'POST',
            body : JSON.stringify({
                username : username.value,
                password : password.value,
            })
        })
        if(data.value) {
            this.userDetails = data.value
            this.isLoggedIn = true;
        }
    }
  },
  persist: true,
});
