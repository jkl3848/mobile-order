<script setup>
import { onBeforeMount, onMounted, watch } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import OrderItem from "./OrderItem.vue";

const db = getFirestore();
const citiesRef = collection(db, "order-list");

var actionMenuOn = $ref(false);
var waitTime = $ref(0);
var vendorID = "0001";
var listOfOrders = $ref([]);

// var test = $ref([
//   {
//     orderNumber: "00001",
//     item: "Cheeseburger",
//     name: "Steve",
//     number: "100",
//     status: "started",
//     orderTime: "5:00:00",
//   },

//   {
//     orderNumber: "00002",
//     item: "Cheeseburger",
//     name: "John",
//     number: "100",
//     status: "started",
//     orderTime: "5:00:37",
//   },

//   {
//     orderNumber: "00003",
//     item: "Soda",
//     name: "Ted",
//     number: "100",
//     status: "ordered",
//     orderTime: "5:02:08",
//   },
//   {
//     orderNumber: "00004",
//     item: "Soda",
//     name: "Sarah",
//     number: "100",
//     status: "ordered",
//     orderTime: "5:02:55",
//   },
//   {
//     orderNumber: "00005",
//     item: "Cheeseburger",
//     name: "Alex",
//     number: "100",
//     status: "ordered",
//     orderTime: "5:04:023",
//   },
// ]);

function toggleActionMenu() {
  actionMenuOn = !actionMenuOn;
}

function sortedItemsList(list, itemStatus) {
  console.log(list);
  var finalList;

  list.sort((a, b) => {
    const timeA = a.orderTime ? a.orderTime.split(":") : [];
    const timeB = b.orderTime ? b.orderTime.split(":") : [];

    for (let i = 0; i < 3; i++) {
      const valueA = Number(timeA[i]) || 0;
      const valueB = Number(timeB[i]) || 0;

      if (valueA !== valueB) {
        return valueA - valueB;
      }
    }

    return 0;
  });

  console.log(list);

  if (itemStatus == "ordered") {
    finalList = list.filter((item) => {
      return item.itemStatus === "ordered";
    });
  } else if (itemStatus == "started") {
    finalList = list.filter((item) => {
      return item.itemStatus === "started";
    });
  } else if (itemStatus == "allInProg") {
    finalList = list.filter((item) => {
      return item.itemStatus !== "completed";
    });
  }

  return finalList;
}

function orderIsStarted(item) {
  if (item.itemStatus === "started") {
    return true;
  }
  return false;
}

function changeOrderStatus(item, status) {
  console.log("Changing item to " + status);
  let foundObj = listOfOrders.find((obj) => obj.orderID === item.orderID);

  if (foundObj) {
    foundObj.itemStatus = status;
  }
}
watch(
  () => listOfOrders,
  (newVal, oldVal) => {
    waitTime = Math.ceil(
      sortedItemsList(listOfOrders, "allInProg").length * 0.5
    );
  },
  { deep: true }
);

onMounted(() => {
  waitTime = Math.ceil(sortedItemsList(listOfOrders, "allInProg").length * 0.5);
});

onBeforeMount(async () => {
  var q = query(citiesRef, where("vendor", "==", "0001"));

  var holder = await getDocs(q);
  holder.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    listOfOrders.push(doc.data());
  });

  console.log(listOfOrders);
});
</script>

<template>
  <Dialog
    v-model:visible="actionMenuOn"
    modal
    header="Vendor Actions"
    :style="{ width: '25rem' }"
    dismissable-mask="true"
  >
    <span class="p-text-secondary block mb-5">Actions go here...</span>
  </Dialog>

  <div id="header">
    <span id="welcome-text">Welcome Vendor</span>

    <Button
      id="action-button"
      @click="toggleActionMenu()"
      rounded
      icon="pi pi-cog"
    />

    <span>
      Est. Wait Time: {{ waitTime }} minute{{ waitTime > 1 ? "s" : "" }}</span
    >
  </div>

  <div id="content" :class="actionMenuOn ? 'blur' : ''">
    <div
      v-if="sortedItemsList(listOfOrders, 'started').length > 0"
      class="order-list"
      id="in-progress-orders"
    >
      <div class="order-list-header">
        {{ sortedItemsList(listOfOrders, "started").length }} Orders in Progress
      </div>
      <div
        v-for="item in sortedItemsList(listOfOrders, 'started')"
        class="order-item-obj"
        :class="orderIsStarted(item) ? 'item-started' : 'item-not-started'"
        :key="item.orderID"
      >
        <OrderItem
          class="order-item"
          :order="item"
          @change-order-status="changeOrderStatus($event[0], $event[1])"
        />
      </div>
    </div>

    <div
      v-if="sortedItemsList(listOfOrders, 'ordered').length > 0"
      class="order-list"
      id="orders"
    >
      <div class="order-list-header">
        {{ sortedItemsList(listOfOrders, "ordered").length }} Orders Pending
      </div>
      <div
        v-for="item in sortedItemsList(listOfOrders, 'ordered')"
        class="order-item-obj"
        :key="item.orderID"
      >
        <OrderItem
          class="order-item"
          :order="item"
          @change-order-status="changeOrderStatus($event[0], $event[1])"
        />
      </div>
    </div>
  </div>

  <div id="footer">
    <Button
      class="footer-button"
      id="manual-order-button"
      label="Manual Order"
    />
    <Button
      class="footer-button"
      id="pause-order-button"
      label="Pause Orders"
      severity="danger"
    />
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  height: 80px;
  background-color: var(--green-700);
  padding: 12px;
}

#welcome-text {
  font-size: 48px;
}

#action-button {
  position: absolute;
  top: 12px;
  right: 12px;
  height: 56px;
  width: 56px;
}

.order-list-header {
  width: 100%;
  margin-top: 8px;
  font-size: 36px;
  text-align: center;
}

#content {
  margin-bottom: 84px;
}

#footer {
  position: fixed;
  bottom: 0;

  width: 100%;
  height: 80px;
  background-color: var(--green-700);
  padding: 12px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.footer-button {
  width: 400px;
  font-size: 30px;
}
</style>
