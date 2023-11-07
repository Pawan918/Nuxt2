<template>
    <div class="bg-[#F5F5F5] text-black lg:px-24 flex justify-between pt-8 lg:gap-8 px-12 dark:bg-black">
        <div class="hidden lg:flex  items-start  gap-5 flex-col text-sm break-keep min-w-fit dark:text-white">
            <div class="font-averta-bold " v-for="(categories,index) in allProductCategories" :key="index">
                <div class="cursor-pointer categories" @click="handleCategories(categories)">{{ capitalize(categories) }}</div>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 h-max dark:text-white mb-5" v-if="allProductDetails">
            <UCard v-for="(products,index) in allProductDetails?.products" :key="index" class="cursor-pointer" @click="cardHandler(products.id)" >
                <img :src="products?.thumbnail" :alt="products?.brand" class="h-48">
                <div class="font-averta-bold mt-2">{{capitalize(products?.brand) }}</div>
                <div class="flex gap-1 font-averta-bold "><span>$</span><span>{{ products?.price }}</span></div>
            </UCard>
        </div>
    </div>
        <UPagination v-model="page" :page-count="10" :total="allProductDetails?.total" size="lg" class="flex justify-center m-5"/>
</template>
<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore();
store.productCategories();
const router = useRouter()
const page = ref(1);
const { allProductCategories,allProductDetails } = storeToRefs(store) 

watch(page, (value) =>{
    store.productDetails(`https://dummyjson.com/products?limit=10&skip=${(value - 1) * 5}`)
}, { immediate: true })

const handleCategories = (categories)=>{
    store.productDetails(`https://dummyjson.com/products/category/${categories}`)
}
const cardHandler = (id)=>{
    router.push(`/products/${id}`)
}
</script>
<style scoped lang="scss">
.categories{
    position: relative;
    &::after{
        content : '';
        width: 0;
        transition: 0.3s;
    }
    &:hover{
        &::after{
            position: absolute;
            content: '';
            width: 100%;
            height: 2px;
            bottom: 0px;
            left: 0px;
            background-color: red;
        }
    }
}
</style>