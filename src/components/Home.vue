<template>
  <div>
    <Navbar></Navbar> 
      <div class="columns ">
        <div class="column" id="appmenu">
          <appMenu></appMenu>
        </div>
        <div class="column">
          <div class="columns " id="appBody">
            <div class="column">
              <router-view></router-view>
            </div>
            
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

#main {
  margin-top: 5px;

}

#appBody {
   margin-right: 30px;
   margin-left: 0px;
   margin-top: 20px;

    /*border-style: solid;
    border-color: #ff0000 2px;*/

}
 #appmenu {
  background-color: #333;
  padding-left: 25px;
  padding-top: 25px; 
 }


</style>