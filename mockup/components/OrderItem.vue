<script setup>
const props = defineProps({
  order: Object,
  expandDetails: Boolean,
});

console.log(props.order);

const emit = defineEmits(["changeOrderStatus"]);
</script>
<template>
  <Card>
    <template #title>
      <span id="order-item">{{ order.orderItem }}</span>
    </template>
    <template #subtitle>
      <span id="order-time">Time Ordered: {{ order.orderTime }}</span>
    </template>
    <template #content>
      <div id="card-content">
        <span id="client-name"> {{ order.orderName }} </span>
        <span id="client-number"> {{ order.phoneNumber }} </span>
      </div>
    </template>
    <template #footer>
      <div class="flex-row">
        <Button
          class="order-button"
          id="start-button"
          @click="emit('changeOrderStatus', [order, 'started'])"
          label="Start"
          severity="success"
        />
        <Button
          class="order-button"
          id="complete-button"
          @click="emit('changeOrderStatus', [order, 'completed'])"
          label="Complete"
          severity="warning"
        />
      </div>
    </template>
  </Card>
</template>
<style scoped>
.p-card {
  margin: 12px;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
#order-item {
  font-size: 48px !important;
}
.p-button {
  font-size: 36px;
  width: 360px;
  height: 60px;
}
#card-content {
  text-align: right;
}
#client-name {
  font-size: 36px;
  padding-right: 12px;
}
</style>
