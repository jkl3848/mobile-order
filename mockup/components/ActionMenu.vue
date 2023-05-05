<script setup>
const emit = defineEmits(["closeActionMenu"]);
</script>
<template>
  <div id="action-menu-overlay">
    <div id="content">
      <div id="header">
        <span id="header-text">Action Menu</span>
        <button id="close-button" @click="emit('closeActionMenu')">X</button>
      </div>
      <div>
        Actions
        <ul>
          <li>See Analytics</li>
          <li>Close Store (End Session)</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
#action-menu-overlay {
  opacity: 0.8;
  background-color: #bababa;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 1000;
  text-align: center;
}

#content {
  height: 100%;
  width: 80%;
  background-color: white;
  margin: auto;
}

#header {
  padding-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#header-text {
  justify-content: center;
  margin-left: 38%;
  font-size: 40px;
}

#close-button {
  font-size: 30px;
  justify-content: right;
  background-color: white;
  border: 0px solid black;
  text-shadow: 2px 1px 5px black;
  margin-right: 5px;
}
</style>
