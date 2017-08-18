<template>
  <div>
    <Navbar></Navbar> 
      <div class="columns " style="margin-top: 0px; margin-left: 0px; margin-right: 0px;">
        <!--a esta clase debes agregar is-hidden para q se oculte el menu/Aside -->
        <div class="column is-hidden-mobile" id="appmenu" >
          <appMenu></appMenu>
        </div>
        <div class="column" id="appBody">
          <div class="container">
            <router-view></router-view>
          </div>
          
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import appMenu from '@/components/Aside'

export default {

  name: 'Home',
  components: {
    Navbar,
    appMenu,
  }
};
</script>

<style lang="css">
.columns:last-child {
    margin-bottom: 0;
}

 #appmenu {
  background-color: #333;

 }


</style>