<template>
  <div id="app" class="container mt-4">
    <div class="row border-bottom pb-2">
      <div class="col">
          <router-link  to="/">Home</router-link>
          <router-link v-if="$route.path === '/databases'" to="/databases">/databases</router-link>
      </div>
        <div class="col justify-content-end">
            <toggle-button @change="(e)=>{DayNight(e.value)}" :labels="{checked:'Day',unchecked:'Night'}"/>
        </div>
    </div>
      <transition name="fade">
      <router-view></router-view>
      </transition>
  </div>
</template>

<script>

export default {
    name: 'App',
    data(){
        return{
            ColorClass:''
        }
    },
    methods:{
        DayNight(val) {
            if (val) {
               this.ColorClass = "Night"
            }else{
                this.ColorClass = "Day"
            }
        }
    }
    }
</script>

<style>
    .Night{
        background: #121212 ;
        color:white;
    }
    .Day{
        background:white;
        color:inherit;
    }
    .fade-enter-active{
        transition: opacity .5s;
    }
    .fade-leave-active{
        transition: opacity .01s;
    }
    .fade-enter{
        opacity: 0;
    }
    .fade-leave-to{
        opacity:0;
    }
</style>
