<template>
  <div>
  	<Navbar></Navbar>
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <appMenu></appMenu>
        </div>
        <div class="column is-4">
          <cliente></cliente>
        </div>
  		</div>
  	</div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import appMenu from '@/components/Aside'
import cliente from '@/components/clientes'

export default {

  name: 'Home',
  components: {
  	Navbar,
    appMenu,
    cliente
  }
};
</script>

<style lang="css" scoped>

</style>