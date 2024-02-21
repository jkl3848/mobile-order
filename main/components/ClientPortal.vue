<script setup>
import { onBeforeMount, onMounted, watch } from "vue";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();
const itemCollection = collection(db, "item-list");
const vendorCollection = collection(db, "vendor-list");

var confirmOrder = $ref(false);
var phoneNumber = $ref("");
var invalidNumber = $ref(false);
var itemForOrder = $ref("");
var userName = $ref("");

var vendorID = "1111";

let vendorInfo = $ref();
const orderItemList = $ref([
  // {
  //   itemName: "Cheeseburger",
  //   itemNumber: "01",
  //   imagePath: "../main/images/cheeseburger.jpg",
  //   inStock: true,
  // },
  // {
  //   itemName: "Drink",
  //   itemNumber: "02",
  //   imagePath: "../main/images/drink.jpg",
  //   inStock: true,
  // },
  // {
  //   itemName: "Secret Item",
  //   itemNumber: "03",
  //   imagePath: "null",
  //   inStock: false,
  // },
]);

function selectItem(itemIndex) {
  const selectedObject = orderItemList[itemIndex];
  console.log(selectedObject);
  itemForOrder = selectedObject.itemName;
}

function phoneVerification(inputNumber) {
  const numRe = /\(\d{3}\) \d{3}-\d{4}/;
  if (!inputNumber.match(numRe)) return false;

  return true;
}

async function submitOrder() {
  try {
    const docRef = await addDoc(collection(db, "order-list"), {
      vendor: vendorID,
      orderItem: itemForOrder,
      orderName: userName,
      phoneNumber: phoneNumber,
      itemStatus: "ordered",
      orderTime: new Date().getTime(),
    });
    console.log("Document written with ID: ", docRef.id);
    orderID++;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

onBeforeMount(async () => {
  await getItems();
  await getVendorInfo();
});

async function getItems() {
  const q = query(itemCollection, where("vendorId", "==", vendorID));

  const holder = await getDocs(q);
  holder.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    orderItemList.push(doc.data());
  });

  console.log(orderItemList);
}

async function getVendorInfo() {
  const q = query(vendorCollection, where("vendorId", "==", vendorID));

  const holder = await getDocs(q);
  holder.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    vendorInfo = doc.data();
  });

  console.log(vendorInfo);
}
</script>

<template>
  <div id="content">
    <div id="header">{{ vendorInfo.vendorName }}</div>
    <div v-if="vendorInfo.open" id="open-banner" class="vendor-status-banner">
      OPEN
    </div>
    <div v-else id="closed-banner" class="vendor-status-banner">CLOSED</div>

    <div id="form">
      <DataView :value="orderItemList">
        <template #list="slotProps">
          <div>
            <div
              v-for="(item, index) in slotProps.items"
              :key="index"
              class="item-slot"
              :class="index !== 0 ? 'bottom-top' : ''"
            >
              <div class="flex-row">
                <img
                  class="item-slot-image"
                  :src="item.imagePath"
                  :alt="item.itemName"
                />
                <div class="flex-column">
                  <div class="item-title">
                    {{ item.itemName }}
                  </div>
                  <div class="flex-column align-right">
                    <Tag
                      :value="item.inStock ? 'In Stock' : 'Out Of Stock'"
                      :severity="item.inStock ? 'success' : 'danger'"
                      class="stock-tag"
                    ></Tag>
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Order"
                      :disabled="!item.inStock || !vendorInfo.open"
                      @click="
                        selectItem(index);
                        confirmOrder = true;
                      "
                      class="order-button"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>

      <Dialog
        v-model:visible="confirmOrder"
        modal
        header=" "
        :style="{ width: '50rem', height: '40rem' }"
        dismissable-mask="true"
        block-scroll="true"
        draggable="false"
        id="order-dialog"
      >
        <div id="order-dialog-item">Order: {{ itemForOrder }}</div>
        <div id="personal-info">
          <div class="info-group flex-column">
            <label for="username" class="user-input-label">Name</label>
            <InputText
              id="username"
              v-model="userName"
              aria-describedby="username-help"
              class="user-input"
            />
          </div>
          <div class="info-group flex-column">
            <label for="phonenumber" class="user-input-label"
              >Phone Number</label
            >
            <InputMask
              id="phonenumber"
              type="text"
              class="user-input"
              :class="invalidNumber ? 'p-invalid' : ''"
              v-model="phoneNumber"
              mask="(999) 999-9999"
              placeholder="(999) 999-9999"
            />
          </div>
        </div>
        <Button
          id="order-submit"
          @click="submitOrder()"
          :disabled="!userName || !phoneVerification(phoneNumber)"
          label="Submit Order"
        />
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  height: 120px;
  background-color: var(--green-700);
  padding: 12px;

  font-size: 72px;
  text-align: center;
}

.vendor-status-banner {
  width: 100%;
  height: 40px;

  font-size: 36px;
  text-align: center;
}
#open-banner {
  background-color: var(--green-500);
}
#closed-banner {
  background-color: var(--orange-500);
}

#order-dialog {
}

.item-slot {
  height: 400px;
  padding: 20px;
}

.item-slot-image {
  height: 360px;
  width: 360px;
  border-radius: 20px;
}

.bottom-top {
  border-top: 1px solid var(--bluegray-500);
}

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-size: 48px;
  padding-left: 24px;
}

.stock-tag {
  width: 200px;
  height: 80px;
  font-size: 24px;
}

.order-button {
  width: 200px;
  height: 80px;
  font-size: 36px;

  margin-top: 12px;
}

.align-right {
  align-items: end;
}

.info-group {
  font-size: 36px;
  padding-bottom: 24px;
}

.user-input {
  height: 80px;
}

.user-input-label {
  padding-bottom: 24px;
}

#order-dialog-item {
  text-align: center;
  font-size: 48px;
  margin-bottom: 36px;
}

#order-submit {
  font-size: 30px;
  margin-top: 32px;
  height: 64px;
  width: 100%;
}
</style>
