<script setup>

const orderItemList = $ref([
    {
        "itemName": "Cheeseburger",
        "itemNumber": "01",
        "imagePath": "../mockup/images/cheeseburger.jpg",
        "selected": false
    }, {
        "itemName": "Drink",
        "itemNumber": "02",
        "imagePath": "../mockup/images/drink.jpg",
        "selected": true
    },
    {
        "itemName": "Secret Item",
        "itemNumber": "03",
        "imagePath": "null",
        "selected": false
    }
])

function selectItem(itemIndex) {
    var skip = false
    if (orderItemList[itemIndex].selected == true) {
        skip = true
    }
    for (let i = 0; i < orderItemList.length; i++) {
        orderItemList[i].selected = false
    }
    if (!skip) {
        orderItemList[itemIndex].selected = true
    }
}
</script>

<template>
    <div id="content">
        <div id="header">
            Booth Name
        </div>
        <div id="form">
            <label class="user-input-label">Item: </label>

            <table>
                <tbody>
                    <tr v-for="(item, index) in orderItemList" :key="item.itemNumber">
                        <td v-if="index % 2 === 0" @click="selectItem(index)" :class="item.selected ? 'selected' : ''">
                            <div class="item-select">
                                <img :src="item.imagePath" class="item-image" />
                                <span>{{ item.itemName }}</span>
                            </div>
                        </td>
                        <td v-if="index % 2 === 0 && index < orderItemList.length - 1" @click="selectItem(index + 1)"
                            :class="orderItemList[index + 1].selected ? 'selected' : ''">
                            <div class="item-select">
                                <img :src="orderItemList[index + 1].imagePath" class="item-image" />
                                <span>{{ orderItemList[index + 1].itemName }}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="personal-info">
                <div class="info-group">
                    <label class="user-input-label">Name: </label>
                    <input type="text" class="user-input" />
                </div>
                <div class="info-group">
                    <label class="user-input-label">Phone Number: </label>
                    <input type="text" class="user-input" />
                </div>

                <button>Submit</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
#content {
    text-align: center;
    margin: auto;
    margin-top: 0px;
    width: 80%;
    background-color: white;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#header {
    height: 80px;
    background-color: rgb(38, 176, 84);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#form {
    display: flex;
    flex-direction: column;
}

table {
    margin: auto;
}

td {
    border: 2px solid black;
}

td.selected {
    border: 4px solid green;
}

#personal-info {
    margin-top: 50px;
}

.info-group {
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10px;
}

.user-input {
    width: 250px;
    font-size: 30px;
}

.user-input-label {
    font-size: 30px
}

.item-image {
    width: 200px;
    height: 200px;
}

.item-select {
    display: flex;
    flex-direction: column;
    margin: auto;
}
</style>
