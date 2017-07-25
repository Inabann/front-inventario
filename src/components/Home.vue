<template>
  <div>
  	<Navbar></Navbar>
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <appMenu></appMenu>
        </div>
        <div class="column is-10">
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

<style lang="css" scoped>

</style>