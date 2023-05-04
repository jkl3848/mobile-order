<script setup>
import OrderItem from "./OrderItem.vue"

var test = [
  {
    "orderNumber": "00001",
    "item": "food",
    "name": "Steve",
    "number": "100",
    "status": "started",
    "orderTime": "5:00"
  },

  {
    "orderNumber": "00002",
    "item": "food",
    "name": "John",
    "number": "100",
    "status": "ordered",
    "orderTime": "5:01"
  },

  {
    "orderNumber": "00003",
    "item": "drink",
    "name": "Ted",
    "number": "100",
    "status": "ordered",
    "orderTime": "5:04"
  }
]

function sortedItemsList(list, isStarted) {
  var finalList

  if (!isStarted) {
    finalList = list.filter((item) => {
      return item.status === "ordered"
    })
  } else {
    finalList = list.filter((item) => {
      return item.status === "started"
    })
  }

  console.log(finalList)

  return finalList
}


function orderIsStarted(item) {
  if (item.status === "started") {
    return true
  }
  return false
}
</script>

<template>
  <div id="content">
    <div id="header">
      Welcome Vendor
    </div>

    <div class="order-list" id="in-progress-orders">
      Orders in Progress
      <div v-for="item in sortedItemsList(test, true)" class="order-item-obj"
        :class="orderIsStarted(item) ? 'item-started' : 'item-not-started'">
        <OrderItem :order="item" />
      </div>
    </div>

    <div class="order-list" id="orders">
      Orders
      <div v-for="item in sortedItemsList(test, false)" class="order-item-obj">
        <OrderItem :order="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.order-item-obj {
  width: 100%;
  border: 5px solid gray;
  border-radius: 15px;
  padding: 5px
}

.item-started {
  border-color: blue
}
</style>
