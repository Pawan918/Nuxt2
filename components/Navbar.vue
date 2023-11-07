<template>
        <div class="flex justify-between items-center h-20 px-4 lg:px-10 bg-white text-black font-averta-bold">
            <div class="flex items-center justify-center gap-2">
                <img src="/images/smile.svg" />
                <div class="flex flex-col text-[#731DD8] font-extrabold lg:text-xl text-sm">
                    <div class="">my<span class="text-[#FF3864]">supermarket</span></div>
                    <div>deals</div>
                </div>
            </div>
            <NuxtLink to="/" class="hidden lg:flex cursor-pointer">Home</NuxtLink>
            <NuxtLink to="/products" class="hidden lg:flex cursor-pointer">Products</NuxtLink>
            <div class="hidden lg:flex cursor-pointer">Guides</div>
            <div class="hidden lg:flex cursor-pointer">AboutUs</div>
            <div class="hidden lg:flex cursor-pointer">
                <UInput class="bg-[#E0E0E0] xl:w-[300px] sm:w-[200px] overflow-hidden rounded-md placeholder-[#3c3c4399]"
                    icon="i-heroicons-magnifying-glass-20-solid" size="lg" :trailing="false" name="input" color="black"
                    placeholder="Search..." 
                    @keyup="searchHandler" v-model="searchValue"/>
            </div>
            <div class="flex gap-4 items-center justify-center ">
                <NuxtLink to="/login" class="px-3 py-2 rounded-md bg-[#731DD8] text-white cursor-pointer text-xs sm:text-sm" v-if="!isLoggedIn">Log In</NuxtLink>
                <div class="px-3 py-2 rounded-md bg-[#731DD8] text-white cursor-pointer text-xs sm:text-sm" v-if="isLoggedIn" @click="logOutHandler">Log Out</div>
                <UDropdown :items="getProductCategoriesObject"  mode="click" :popper="{ placement: 'bottom-end' }"  :ui="{height:'h-60' }">
                    <UIcon name="i-mdi-menu" class="w-7 h-7 cursor-pointer lg:hidden"  />
                </UDropdown>
                <div class=" items-center hidden lg:flex relative cursor-pointer" @click="cartHandler">
                    <UIcon name="i-mdi-cart" class="w-8 h-8"></UIcon>
                    <span class="absolute bg-[red] top-[-12px] right-0 rounded-xl px-1">{{ cartValue }}</span>
                </div>
            </div>
        </div>
</template>

<script setup>  
import { useCounterStore } from '@/stores/counter';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from "~/stores/user";

const user = useUserStore();
const store = useCounterStore();
const cartStore = useCartStore();
const router = useRouter();
const searchValue = ref("");
const toast = useToast();

let { getProductCategoriesObject} = storeToRefs(store);
let { isLoggedIn , userDetails } = storeToRefs(user);
let { cartValue } = storeToRefs(cartStore);

const cartHandler = ()=>{
    if(!isLoggedIn.value) toast.add({title : "Please Log In to access cart"})
    router.push('/cart');
}
const logOutHandler = ()=>{
    isLoggedIn.value = false;
    userDetails.value = [];
    toast.add({ title: 'You are Logged Out!' })
    router.push('/login')
}

let timer;
const searchHandler = ()=> {
    if(timer) {
        clearTimeout(timer);
    };
    timer = setTimeout(()=>{
            store.searchProducts(searchValue.value);
            searchValue.value = "";    
    },1000);
}
</script>