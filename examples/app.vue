<template>
  <div class="app">
    <h1  @click="handleClick(name)" >Welcome To WATER-PRINTE {{ name }}.</h1>
    <div class="container" @click="handleClick">
      container
    </div>
  </div>
</template>

<script lang="ts" src="./app.ts">
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  height: 100%;
  background: #f1f1f1;

  .container {
    flex: 1;
    margin-top: 10px;
  }
}
</style>