<script setup>
import OrderItem from "./OrderItem.vue";

var currentTime = $ref();
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
    status: "ordered",
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
]);

function sortedItemsList(list, isStarted) {
  var finalList;

  if (!isStarted) {
    finalList = list.filter((item) => {
      return item.status === "ordered";
    });
  } else {
    finalList = list.filter((item) => {
      return item.status === "started";
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

function getTime() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  currentTime =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);
}
setInterval(getTime, 1000);
</script>

<template>
  <div id="content">
    <div id="header">Welcome Vendor</div>

    <div
      v-if="sortedItemsList(test, true).length > 0"
      class="order-list"
      id="in-progress-orders"
    >
      <span class="order-list-header"
        >{{ sortedItemsList(test, true).length }} Orders in Progress</span
      >
      <div
        v-for="item in sortedItemsList(test, true)"
        class="order-item-obj"
        :class="orderIsStarted(item) ? 'item-started' : 'item-not-started'"
      >
        <OrderItem
          :order="item"
          @change-order-status="changeOrderStatus($event[0], $event[1])"
        />
      </div>
    </div>

    <div
      v-if="sortedItemsList(test, false).length > 0"
      class="order-list"
      id="orders"
    >
      <span class="order-list-header"
        >{{ sortedItemsList(test, false).length }} Orders Pending</span
      >
      <div v-for="item in sortedItemsList(test, false)" class="order-item-obj">
        <OrderItem
          :order="item"
          @change-order-status="changeOrderStatus($event[0], $event[1])"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#welcome-text {
  justify-content: center;
  margin-left: 42%;
}

#action-button {
  justify-content: right;
}

#content {
  text-align: center;
  margin: auto;
  width: 80%;
  background-color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.order-list {
  margin-top: 50px;
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
}
</style>
