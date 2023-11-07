<template>
    <div class="flex justify-center items-center h-screen text-3xl font-averta-bold flex-col gap-8" v-if="!cartData.length">
        <span> Oops Add something in Cart </span>
        <NuxtLink to="/" class="px-3 py-2 bg-[#731dd8] rounded-lg text-white font-averta flex items-center">Continue Shopping <UIcon name="i-mdi-cart w-8 h-8"/></NuxtLink>
    </div>
    <div class=" gap-10 font-averta-bold flex justify-center text-lg" v-if="cartData.length">
        <div class="flex gap-8 flex-col">
            <UCard v-for="(products,index) in cartData" :key="index" class=" h-72 flex justify-between"  >
                <div class="flex gap-8 ">
                    <NuxtImg :src="products?.data.thumbnail" :alt="products?.data.brand" class="h-48 w-72" format="webp" loading="lazy" quality="80" densities="x1 x2" />
                    <div class="flex gap-4 flex-col">
                        <div class="font-averta-bold "><span class="font-averta">Name : </span>{{capitalize(products?.data.title) }}</div>
                        <div class="flex gap-1 "><span class="font-averta">Price : </span><span>$</span><span>{{ products?.data.price }}</span></div>
                        <div class="flex gap-1">
                            <span class="font-averta">Items Count : </span>
                            <div class="bg-[#731dd8] px-2 rounded-md flex gap-2 items-center p-1 cursor-auto text-white">
                                <UIcon name="i-mdi-minus" class="cursor-pointer" @click="decreaseItem(products?.data.id)"/>
                                <span>{{ products?.itemsCount }} </span>
                                <UIcon name="i-mdi-plus" class="cursor-pointer" @click="increaseItem(products?.data.id)"/>
                            </div>
                        </div>
                        <div class="flex gap-1 "><span class="font-averta">total Value : </span><span>$ {{ products?.itemsCount * products?.data.price }}</span></div>
                        <div class="p-2 bg-[#FF3864] text-white max-w-fit rounded-lg flex items-center cursor-pointer font-averta" @click="deleteItems(products?.data.id)">Delete Item <UIcon class="i-mdi-delete"/></div>
                    </div>
                </div>
            </UCard>
        </div>
        <div class="flex flex-col items-center">
            <div class="flex justify-center px-3 py-2 bg-[#731dd8] gap-2 max-w-fit rounded-xl cursor-pointer text-white mt-8"><span class="font-averta">Total Cart Value : </span><span>$ {{ totalCartValue }}</span></div>
            <div class="flex justify-center px-3 py-2 bg-[#FF3864] gap-2 max-w-fit rounded-xl cursor-pointer text-white items-center font-averta mt-6" @click="deleteAllCartItems">Clear Cart <UIcon class="i-mdi-delete"/></div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart';
const cartStore = useCartStore();

const { cartData, totalCartValue, cartValue} = storeToRefs(cartStore)
const increaseItem= (id)=>{
    const data = cartData.value.find((data)=> data.data.id === id);
    data.itemsCount++;
    cartValue.value++; 
}
const decreaseItem = (id)=>{
    const data = cartData.value.find((data)=> data.data.id === id);
    data.itemsCount--;
    if(data.itemsCount === 0) deleteItemById(id)
    cartValue.value--;
}
const deleteItems = (id)=>{
    const data = cartData.value.find((data)=> data.data.id === id);
    cartValue.value -= data.itemsCount;
    deleteItemById(id)
}
const deleteItemById = (id)=> {
    cartData.value = cartData.value.filter((data)=> data.data.id !== id);
}

const deleteAllCartItems = ()=>{
    cartData.value = [ ];
    cartValue.value = 0;
}
definePageMeta({
    middleware : [
        function(to,from,next){
            const user = useUserStore();
            const toast = useToast()
            // const isLoggedIn = user.isLoggedIn
            if(!user.isLoggedIn){
                    return navigateTo('/login')
            }
        },
    ]
})
</script>   

<style>

</style>