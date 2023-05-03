import { logins } from "../../data/loginInfo.js";

var loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", verifyLogin);

function verifyLogin() {
  var loginPath = "../mockup/vendorTest.html";

  window.location.href = loginPath;
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
