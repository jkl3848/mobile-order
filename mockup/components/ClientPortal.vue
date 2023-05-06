<script setup>

</script>

<template>
    <div id="content">
        Hello
        <div id="form">
            <div class="item-select" v-for="item in orderItemList">
                <img :src="item.imagePath" />
            </div>
            <input type="text" />
            <input type="text" />
        </div>
    </div>
</template>

<script scoped>

</script>