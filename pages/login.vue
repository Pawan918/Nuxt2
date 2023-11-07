<template>
    <div class="bg-[#A7D7C5] p-8 flex justify-center items-center">
        <div class="w-[700px] bg-[#F6FBF9] rounded-2xl flex justify-center items-center flex-col py-8 ">
            <div class="text-5xl mb-2  font-normal text-[#212B27]">Sign To  Account</div>
            <div class="text-xl flex flex-col items-center text-[#32403B] mb-10">
                <p>Create an account to enjoy all the services </p>
                <p>without any ads for free!</p>
            </div>
            <div class="flex flex-col items-center gap-6">
                <input v-model="username" type="text" placeholder="Email Address" class="rounded-2xl w-[580px] h-[80px] border-2 border-solid border-[#0000001a]  outline-none pl-8">
                <input v-model="password" type="password" placeholder="Password" class="rounded-2xl w-[580px] h-[80px] border-2 border-solid border-[#0000001a]  pl-8 outline-none">
            </div>
            <div class="bg-[#84C7AE] rounded-2xl text-white px-16 py-6 mt-8 text-3xl font-bold cursor-pointer" @click="signInHandler">Sign In</div>
            <div class="text-[#32403B] text-xl mt-4 ">Already Have An Account? <NuxtLink to="/" class="underline hover:text-blue-500">Sign In</NuxtLink></div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from "~/stores/user"

const router = useRouter();
const user = useUserStore();
const username = ref("")
const password = ref("")
const toast = useToast();

const signInHandler = ()=>{
    user.authUser(username,password)
    toast.add({title : "You are Logged In"})
    setTimeout(()=>{

        router.push('/')
    },500)
}
definePageMeta({
    middleware : [
        function(to,from,next){
            const user = useUserStore();
            const toast = useToast()
            if(user.isLoggedIn){
                    return navigateTo('/')

           }    
        },
    ]
})

</script>
<style scoped lang="scss">

</style>