<script setup>
const props = defineProps({
  order: Object,
});

const emit = defineEmits(["changeOrderStatus"]);
</script>
<template>
  <div id="order-details">
    <span id="order-item">{{ order.item }}</span
    ><span id="order-time">Time Ordered: {{ order.orderTime }}</span>
  </div>
  <div>
    <button
      class="order-button"
      id="start-button"
      @click="emit('changeOrderStatus', [order, 'started'])"
    >
      Start
    </button>
    <button
      class="order-button"
      id="complete-button"
      @click="emit('changeOrderStatus', [order, 'completed'])"
    >
      Complete
    </button>
  </div>
</template>
<style scoped>
#order-details {
  width: 95%;
  text-align: left;
  padding-left: 20px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#order-item {
  font-size: 50px;
}

#order-time {
  justify-content: right;
  font-size: 20px;
  margin: right;
}

.order-button {
  color: white;
  height: 40px;
  width: 250px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 12px;
  font-size: 20px;
}

#start-button {
  background-color: rgb(48, 92, 195);
  border: 3px solid rgb(30, 58, 124);
}

#complete-button {
  background-color: rgb(38, 176, 84);
  border: 3px solid rgb(24, 109, 52);
}
</style>
