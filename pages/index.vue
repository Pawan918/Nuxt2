<template>
    <div class="relative h-screen">
        <!-- <div class="">Hello</div> -->
        <div class="h-screen  main "/>
        <UButton
            icon="i-mdi-cart"
            size="xl"
            color='indigo'
            label="Shop Now"
            variant='solid'
            :trailing="true"
            to="/products/"
            class="text-white font-averta absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl " 
            :ui="{icon : {
                size : 'text-4xl'
            }}"
        />
        <!-- <button class="text-white text-4xl bg-[#FF3864] py-3 px-4 rounded-xl font-averta absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Shop Now <UIcon name="i-mdi-cart" class="w-8 h-8"></UIcon></button> -->
    </div>
</template>
<style scoped lang="scss">
.main{
    background-image: url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-repeat: no-repeat;    
    object-fit: contain;
    background-position: center;
    filter: brightness(0.6);
    // overflow: hidden;
}
</style>