<script setup>

const props = defineProps({
    order: Object
})

function startOrder() {
    props.order.status = "started"
}

function completeOrder() {
    props.order.status = "complete"

}
</script>
<template>
    <div id="order-details"><span id="order-item">{{ order.item
    }}</span><span id="order-time">{{ order.orderTime
}}</span></div>
    <div>
        <button class="order-button" id="start-button" @click="startOrder()">Start</button>
        <button class="order-button" id="complete-button" @click="completeOrder()">Complete</button>
    </div>
</template>
<style scoped>
#order-details {
    width: 100%;
    text-align: left;
    font-size: 50px;
    padding-left: 20px;

    display: flex;
    flex-direction: row;

}

.order-button {
    color: white;
    height: 40px;
    width: 250px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 12px;
    font-size: 20px;
}

#start-button {
    background-color: rgb(48, 92, 195);
    border: 3px solid rgb(30, 58, 124);
}

#complete-button {
    background-color: rgb(38, 176, 84);
    border: 3px solid rgb(24, 109, 52);
}

.order-item {
    justify-content: left;
}

.order-time {
    justify-content: right;
}
</style>