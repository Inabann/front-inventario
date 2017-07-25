<template>
  <div>
    <Navbar></Navbar> 
    <div class="container" id="main">
      <div class="columns">
        <div class="column is-2">
          <appMenu></appMenu>
        </div>
        <div class="column">
          <router-view></router-view>
        </div>
        
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
  margin-top: 15px;
}
</style>