<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>


<style lang="css">
   @import '../node_modules/bulma/css/bulma.css';
   @import '../node_modules/font-awesome/css/font-awesome.css';

.columns:last-child {
    margin-bottom: 0;
}
</style>
