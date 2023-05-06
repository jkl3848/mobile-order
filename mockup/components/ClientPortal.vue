<script setup>

const orderItemList = $ref([
    {
        "itemName": "Cheeseburger",
        "itemNumber": "01",
        "imagePath": "../mockup/images/cheeseburger.jpg"
    }, {
        "itemName": "Drink",
        "itemNumber": "02",
        "imagePath": "../mockup/images/drink.jpg"
    }
])
</script>

<template>
    <div id="content">
        <div id="header">
            Booth Name
        </div>
        <div id="form">
            <label class="user-input-label">Item: </label>
            <div class="item-select" v-for="item in orderItemList" :key="item.itemNumber">
                <img :src="item.imagePath" class="item-image" />
                <span>{{ item.itemName }}</span>
            </div>
            <label class="user-input-label">Name: </label>
            <input type="text" class="user-input" />
            <label class="user-input-label">Phone Number: </label>
            <input type="text" class="user-input" />

            <button>Submit</button>
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

.user-input {
    width: 200px;
    font-size: 30px;
}

.item-image {
    width: 100px;
    height: 100px;
}
</style>
