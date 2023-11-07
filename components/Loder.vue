<template>
    <div class="flex justify-center items-center h-[100dvh] w-full">
        <div class="spinner "></div>
    </div>
</template>
    
<style lang="scss">
.spinner {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: radial-gradient(farthest-side, #262ce8 94%, #0000) top/11.5px 11.5px no-repeat,
    conic-gradient(#0000 30%, #262ce8);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 11.5px), #000 0);
    animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
    100% {
        transform: rotate(1turn);
    }
}
</style>