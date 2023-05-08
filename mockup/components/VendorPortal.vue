<script setup>
import { onMounted, watch } from "vue";
import OrderItem from "./OrderItem.vue";
import ActionMenu from "./ActionMenu.vue";

var actionMenuOn = $ref(false);
var waitTime = $ref(0);
var test = $ref([
  {
    orderNumber: "00001",
    item: "Cheeseburger",
    name: "Steve",
    number: "100",
    status: "started",
    orderTime: "5:00:00",
  },

  {
    orderNumber: "00002",
    item: "Cheeseburger",
    name: "John",
    number: "100",
    status: "started",
    orderTime: "5:00:37",
  },

  {
    orderNumber: "00003",
    item: "Soda",
    name: "Ted",
    number: "100",
    status: "ordered",
    orderTime: "5:02:08",
  },
  {
    orderNumber: "00004",
    item: "Soda",
    name: "Sarah",
    number: "100",
    status: "ordered",
    orderTime: "5:02:55",
  },
  {
    orderNumber: "00005",
    item: "Cheeseburger",
    name: "Alex",
    number: "100",
    status: "ordered",
    orderTime: "5:04:023",
  },
]);

function toggleActionMenu() {
  actionMenuOn = !actionMenuOn;
}

function sortedItemsList(list, itemStatus) {
  var finalList;

  if (itemStatus == "ordered") {
    finalList = list.filter((item) => {
      return item.status === "ordered";
    });
  } else if (itemStatus == "started") {
    finalList = list.filter((item) => {
      return item.status === "started";
    });
  } else if (itemStatus == "allInProg") {
    finalList = list.filter((item) => {
      return item.status !== "completed";
    });
  }

  return finalList;
}

function orderIsStarted(item) {
  if (item.status === "started") {
    return true;
  }
  return false;
}

function changeOrderStatus(item, status) {
  console.log("Changing item to " + status);
  let foundObj = test.find((obj) => obj.orderNumber === item.orderNumber);

  if (foundObj) {
    foundObj.status = status;
  }
}
watch(
  () => test,
  (newVal, oldVal) => {
    waitTime = Math.ceil(sortedItemsList(test, "allInProg").length * 0.5);
  },
  { deep: true }
);

onMounted(() => {
  waitTime = Math.ceil(test.length * 0.5);
});
</script>

<template>
  <ActionMenu v-if="actionMenuOn" @close-action-menu="toggleActionMenu" />
  <div id="header">
    <div>
      <span id="welcome-text">Welcome Vendor</span>
      <span>
        Est. Wait Time: {{ waitTime }} minute{{ waitTime > 1 ? "s" : "" }}</span>
    </div>
    <div id="action-button">
      <button @click="toggleActionMenu()">*</button>
    </div>
  </div>

  <div id="content" :class="actionMenuOn ? 'blur' : ''">
    <div v-if="sortedItemsList(test, 'started').length > 0" class="order-list" id="in-progress-orders">
      <span class="order-list-header">{{ sortedItemsList(test, "started").length }} Orders in Progress</span>
      <div v-for="item in sortedItemsList(test, 'started')" class="order-item-obj"
        :class="orderIsStarted(item) ? 'item-started' : 'item-not-started'" :key="item.orderNumber">
        <OrderItem :order="item" @change-order-status="changeOrderStatus($event[0], $event[1])" />
      </div>
    </div>

    <div v-if="sortedItemsList(test, 'ordered').length > 0" class="order-list" id="orders">
      <span class="order-list-header">{{ sortedItemsList(test, "ordered").length }} Orders Pending</span>
      <div v-for="item in sortedItemsList(test, 'ordered')" class="order-item-obj" :key="item.orderNumber">
        <OrderItem :order="item" @change-order-status="changeOrderStatus($event[0], $event[1])" />
      </div>
    </div>
  </div>

  <div id="footer">
    <button class="footer-button" id="manual-order-button">Manual Order</button>
    <button class="footer-button" id="pause-order-button">Pause Orders</button>
  </div>
</template>

<style scoped>
#header {
  height: 80px;
  background-color: rgb(38, 176, 84);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#content {
  text-align: center;
  margin: auto;
  margin-top: 0px;
  width: 80%;
  background-color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding-top: 1px;
  padding-bottom: 85px;
  padding-left: 10px;
  padding-right: 10px;
}

#footer {
  height: 80px;
  background-color: gray;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  z-index: 100;
}

#welcome-text {
  justify-content: center;
  margin-left: 42%;
}

#action-button {
  justify-content: right;
}

.order-list {
  margin-top: 30px;
}

.order-list-header {
  font-size: 60px;
}

.order-item-obj {
  border: 3px solid gray;
  border-radius: 15px;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 5px rgb(99, 99, 99);
}

.item-started {
  border-color: rgb(48, 92, 195);
}

.blur {
  filter: blur(8px) !important;
}

.footer-button {
  color: white;
  height: 60px;
  width: 350px;
  margin: auto;
  border-radius: 30px;
  font-size: 20px;
}

#pause-order-button {
  background-color: rgb(255, 139, 71);
  border: 3px solid rgb(170, 92, 47);
}

#manual-order-button {
  background-color: rgb(55, 189, 193);
  border: 3px solid rgb(34, 116, 119);
}
</style>
