<template>
  <div>
      
    <Navbar></Navbar> 
     
    <div class="container" >
      <div class="columns ">
          <appMenu></appMenu>
        <div class="columns " id="appBody">
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

#main {
  margin-top: 5px;

}

#appBody {
   margin-right: 40px;
   margin-left: 0px;
   margin-top: 12px;

    border-style: solid;
    border-color: #ff0000 2px;

}
#cssAppMenu {
    background-color: blue;

}


</style>