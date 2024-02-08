<script setup>
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();

var confirmOrder = $ref(false);
var phoneNumber = $ref("");
var invalidNumber = $ref(false);
var itemForOrder = $ref("Cheeseburger");
var userName = $ref("");

var vendorID = "0001";
var orderID = $ref("0001");

const orderItemList = $ref([
  {
    itemName: "Cheeseburger",
    itemNumber: "01",
    imagePath: "../mockup/images/cheeseburger.jpg",
    inStock: true,
  },
  {
    itemName: "Drink",
    itemNumber: "02",
    imagePath: "../mockup/images/drink.jpg",
    inStock: true,
  },
  {
    itemName: "Secret Item",
    itemNumber: "03",
    imagePath: "null",
    inStock: false,
  },
]);

function selectItem(itemIndex) {
  const selectedObject = orderItemList[itemIndex];
  console.log(selectedObject);
  itemForOrder = selectedObject.itemName;
}

function phoneVerification() {
  var workingNumber = phoneNumber;

  if (/\(\d\d\d\)\d\d\d\-\d\d\d\d/.test(workingNumber)) {
    invalidNumber = false;
    return;
  }

  if (workingNumber.length > 10 || workingNumber.length < 10) {
    invalidNumber = true;
    return;
  } else if (!/^\d+$/.test(workingNumber)) {
    console.log(/^\d+$/.test(workingNumber));
    invalidNumber = true;
    return;
  }

  workingNumber =
    "(" +
    workingNumber.substr(0, 3) +
    ")" +
    workingNumber.substr(3, 3) +
    "-" +
    workingNumber.substr(6);

  phoneNumber = workingNumber;
  invalidNumber = false;
}

async function submitOrder() {
  try {
    const docRef = await addDoc(collection(db, "order-list"), {
      vendor: vendorID,
      orderID: orderID,
      orderItem: itemForOrder,
      orderName: userName,
      phoneNumber: phoneNumber,
      itemStatus: "ordered",
      orderTime: getCurrentTime(),
    });
    console.log("Document written with ID: ", docRef.id);
    orderID++;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function getCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", { hour12: false });
  return timeString;
}
</script>

<template>
  <div id="content">
    <div id="header">Booth Name</div>

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
                      :disabled="!item.inStock"
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
        header="Vendor Actions"
        :style="{ width: '25rem' }"
        dismissable-mask="true"
        id="order-dialog"
      >
        <div id="personal-info">
          <div class="info-group flex-column">
            <label for="username">Name</label>
            <InputText
              id="username"
              v-model="userName"
              aria-describedby="username-help"
            />
          </div>
          <div class="info-group flex-column">
            <label for="phonenumber">Phone Number</label>
            <InputMask
              id="phonenumber"
              type="text"
              class="user-input"
              :class="invalidNumber ? 'invalid' : ''"
              v-model="phoneNumber"
              mask="(999) 999-9999"
              placeholder="(999) 999-9999"
              maxlength="13"
            />
          </div>

          <Button @click="submitOrder()" label="Submit" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  height: 80px;
  background-color: var(--green-700);
  padding: 12px;
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
</style>
