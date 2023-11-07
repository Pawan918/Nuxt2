<template>
    <productsList v-if="slug === '/products/'" />
    <div v-else>
        <div class="" v-if="loader">
            <Loader/>
        </div>
        <UCard class="md:flex justify-around font-averta" v-else>
            <template #header>
                <Suspense>
                    <template #default>
                        <Carousel :items-to-show="1" class="w-[500px]">
                            <Slide v-for="slide in allProductDetails.images" :key="slide">
                                <NuxtImg
                                 :src="slide" alt="Image " class="w-96 h-96" format="webp" loading="lazy" quality="80" densities="x1 x2"/>
                            </Slide>
                            <template #addons>
                                <Navigation />
                                <Pagination />
                            </template>
                        </Carousel>
                    </template>
                    <template #fallback>
                        <p>Image is Loading...</p>
                    </template>
                </Suspense>
            </template>
            <UContainer class="flex flex-col gap-4 text-md" v-if="allProductDetails">
                <div v-for="(value, key) in allProductDetails " :key="key">
                    <h1 v-if="key !== 'thumbnail' && key !== 'images'">
                        <span>{{ key }} : </span>
                        <span class="font-averta-bold" v-if="key !== 'rating'">{{ value }}</span>
                        <span v-if="key === 'rating'" class="inline-flex items-center">
                            <div v-for="i in 5" :key="i">
                                <UIcon name="i-mdi-star" v-if="i <= Math.floor(value)" />
                                <UIcon name="i-mdi-star-half-full" v-else-if="Math.floor(value) + 1 == i" />
                                <UIcon name="i-mdi-star" v-else />
                            </div>
                        </span>
                    </h1>
                </div>
                <button :disabled="cartButtonDisable"
                    class="bg-[red] max-w-fit px-3 py-1 rounded-md flex items-center gap-1 disabled:cursor-not-allowed">
                    <span @click="addCartHandler">Add To Cart</span>
                    <UIcon name="i-mdi-cart-variant" class="flex align-middle" />
                    <div class="flex flex-col" v-if="findItemsInCart">
                        <UIcon name="i-mdi-minus" class="cursor-pointer" @click="decreaseItem()" />
                        <UIcon name="i-mdi-plus" class="cursor-pointer" @click="increaseItem()" />
                    </div>
                    <span v-if="findItemsInCart">{{ findItemsInCart }} </span>
                </button>
            </UContainer>
        </UCard>
    </div>
</template>
<script setup>
import { useCounterStore } from "@/stores/counter";
import { useCartStore } from '@/stores/cart';
import { useUserStore } from "@/stores/user"
import { computed } from "vue";
import Loader from "@/components/Loder.vue"


const toast = useToast()
const route = useRoute();

const store = useCounterStore();
const cartStore = useCartStore();
const loader = ref(true)
setTimeout(() => {
    loader.value = false
}, 1000)

let { cartValue, cartData } = storeToRefs(cartStore);
const { allProductDetails } = storeToRefs(store);


const slug = "/products/" + (route.params.id instanceof Array ? route.params.id.join('/') : route.params.id);

const cartButtonDisable = ref(false);

if (slug !== '/products/') store.productDetails(`https://dummyjson.com${slug}`);

const addCartHandler = (() => {
    cartButtonDisable.value = true;
    setTimeout(() => {
        cartButtonDisable.value = false
    }, 1000)
    const data = cartData.value.find((data) => data.data.id === allProductDetails.value.id)
    if (data) {
        data.itemsCount++;
    } else {
        cartData.value.push({ data: allProductDetails.value, itemsCount: 1 })
    }
    cartValue.value++;
    toast.add({
        title: 'Item  Added to Cart!',
        timeout: 1000,
    })
})

const increaseItem = () => {
    const id = allProductDetails.value.id
    const data = cartData.value.find((data) => data.data.id === id);
    data.itemsCount++;
    cartValue.value++;
}
const decreaseItem = () => {
    const id = allProductDetails.value.id
    const data = cartData.value.find((data) => data.data.id === id);
    data.itemsCount--;
    cartValue.value--;
}
const findItemsInCart = computed(() => {
    const id = allProductDetails.value.id;
    const data = cartData.value.find((data) => data.data.id === id);
    if (!data) return 0;
    return data.itemsCount;
})
definePageMeta({
    middleware: [
        function (to, from, next) {
            const user = useUserStore();
            const toast = useToast()
            if (!user.isLoggedIn) {
                return navigateTo('/login')

            }
        },
    ]
})
</script>
