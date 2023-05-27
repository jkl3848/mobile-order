<script setup>
import { logins } from "../../data/loginInfo.js";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

function verifyLogin() {

    router.push({
        name: "VendorPortal",
    });
    // var username = document.getElementById("login-field-username").value;
    // var password = document.getElementById("login-field-password").value;
    // var userType = "";
    // var id;

    // console.log(username);
    // console.log(password);

    // var userInfo = logins.find((obj) => obj.user === username);

    // console.log(userInfo);
    // if (userInfo.password === password) {
    //   id = userInfo.id;
    //   userType = userInfo.type;

    //   var loginPath = `../vendor/${userType}/vendorMain.html`;

    //   window.location.href = loginPath;
    // } else {
    // }
}

function gotToClient() {
    router.push({
        name: "ClientPortal",
    });
}

// onMounted(() => {

//     var loginButton = document.getElementById("login-button");
//     loginButton.addEventListener("click", verifyLogin);
// })

</script>

<template>
    <div id="content">
        <!-- <div id="welcome">Welcome to the APS Mobile Order System</div>

        <div id="login-area">
            <label for="login-field-username">Username:</label>
            <input class="login-field" type="text" id="login-field-username" />
            <label for="login-field-password">Password:</label>
            <input class="login-field" type="password" id="login-field-password" />

            <button id="login-button">Login</button>
        </div> -->
        <div>
            <button @click="verifyLogin()">Vendor</button>
            <button @click="gotToClient()">Client</button>
        </div>
    </div>
</template>

<style scoped>
#content {
    padding-top: 20px;
    padding-bottom: 20px;
}

button {
    height: 60px;
    width: 350px;
    margin: auto;
    border-radius: 30px;
    font-size: 20px;
}
</style>