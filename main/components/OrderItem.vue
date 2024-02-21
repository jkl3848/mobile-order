<script setup>
const props = defineProps({
  order: Object,
  expandDetails: Boolean,
});

console.log(props.order);

const emit = defineEmits(["changeOrderStatus"]);

function convertMillisecondsToTime(milliseconds) {
  // Create a new Date object
  var date = new Date(milliseconds);

  // Extract hours, minutes, and seconds
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds();

  // Convert to 12-hour format
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Format the time components to have leading zeros if needed
  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  // Return the formatted time string
  return hours + ":" + minutes + ":" + seconds + " " + ampm;
}
</script>
<template>
  <Card>
    <template #title>
      <span id="order-item">{{ order.orderItem }}</span>
    </template>
    <template #subtitle>
      <span id="order-time"
        >Time Ordered: {{ convertMillisecondsToTime(order.orderTime) }}</span
      >
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
