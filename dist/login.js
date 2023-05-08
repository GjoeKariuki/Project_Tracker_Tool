"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function validateLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        // get our values
        const loginedusername = document.getElementById("loginusername").value;
        const loginedpassword = document.getElementById("loginpassword").value;
        const loginForm = document.getElementById('loginform');
        // fetch username and passwords from db
        // put into function    
        // const usersdetails = getUsersDetails(); 
        const response = yield fetch('http://localhost:3000/users');
        const usersdetails = yield response.json();
        // console.log(usersdetails)
        const userdetail = usersdetails.find(userdt => {
            if (userdt.username == loginedusername && userdt.password == loginedpassword) {
                return userdt.id;
            }
            return false;
        });
        if (userdetail) {
            console.log("nikuzuri");
            //console.log(userdetail);
            document.getElementById("usernamespan").classList.remove("error-message");
            document.getElementById("usernamespan").innerText = "";
            document.getElementById("passwordspan").classList.remove("error-message");
            document.getElementById("passwordspan").innerText = "";
            // redirect
            loginForm.submit();
            if (loginedusername == 'admin') {
                window.location.href = "/index.html";
            }
            else {
                window.location.href = "/user.html";
            }
            localStorage.setItem("auth", '1');
        }
        else if (!userdetail) {
            // redirect
            console.log("nikubad");
            for (let i = 0; i < usersdetails.length; i++) {
                if (usersdetails[i].username != loginedusername && usersdetails[i].password != loginedpassword) {
                    document.getElementById("usernamespan").innerText = "usernames do not match".toUpperCase();
                    document.getElementById("usernamespan").classList.add("error-message");
                    document.getElementById("passwordspan").innerText = "passwords do not match".toUpperCase();
                    document.getElementById("passwordspan").classList.add("error-message");
                }
                else if (usersdetails[i].password == loginedpassword && usersdetails[i].username != loginedusername) {
                    document.getElementById("usernamespan").innerText = "usernames do not match".toUpperCase();
                    document.getElementById("usernamespan").classList.add("error-message");
                    document.getElementById("passwordspan").classList.remove("error-message");
                    document.getElementById("passwordspan").innerText = "";
                }
                else if (usersdetails[i].username == loginedusername && usersdetails[i].password != loginedpassword) {
                    document.getElementById("passwordspan").innerText = "passwords do not match".toUpperCase();
                    document.getElementById("passwordspan").classList.add("error-message");
                    document.getElementById("usernamespan").classList.remove("error-message");
                    document.getElementById("usernamespan").innerText = "";
                }
            }
            // console.log(userdetail);        
        }
    });
}
// form trigger
document.getElementById('loginform').addEventListener("submit", (event) => {
    event.preventDefault(); // prevents form from submittin
    validateLogin(); // call validation
});
