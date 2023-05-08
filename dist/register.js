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
function saveCredentials() {
    return __awaiter(this, void 0, void 0, function* () {
        // const registeredemail = (document.getElementById("registeremail")! as HTMLInputElement).value;
        const registeredname = document.getElementById("registerusername").value;
        const registeredpassword = document.getElementById("registerpassword").value;
        const confirmedpassword = document.getElementById("confirmpassword").value;
        const usednamespan = document.getElementById("usednamespan");
        const usedpasswordspan = document.getElementById("usedpasswordspan");
        const repeatedpasswordspan = document.getElementById("repeatedpasswordspan");
        if (registeredpassword !== confirmedpassword) {
            repeatedpasswordspan.innerText = "passwords do not match".toUpperCase();
            repeatedpasswordspan.classList.add("error-message");
            usedpasswordspan.innerText = "passwords do not match".toUpperCase();
            usedpasswordspan.classList.add("error-message");
            // alert("passwords don't match");  
        }
        const response = yield fetch('http://localhost:3000/users');
        const usersdetails = yield response.json();
        // console.log(usersdetails)    
        const checked = usersdetails.find(userdt => {
            if (userdt.username == registeredname) {
                return true;
            }
            return false;
        });
        // check if name already exists       
        if (checked) {
            usednamespan.innerText = "this user already exists..pick another name".toUpperCase();
            usednamespan.classList.add("error-message");
            // alert("pick another username")
        }
        else if (!checked) {
            // check if passwords are same
            if (registeredpassword === confirmedpassword) {
                // print passwords match
                // alert("passwords match");
                // object to hold credentials
                const credentials = {
                    // email: registeredemail,
                    username: registeredname,
                    password: registeredpassword
                };
                // console.log(credentials)
                // localStorage.setItem("credentials", JSON.stringify(credentials));
                postUserDetails(credentials);
            }
            if (registeredname == 'admin') {
                window.location.href = "/index.html";
            }
            else {
                window.location.href = "/user.html";
            }
            localStorage.setItem("auth", '1');
        }
    });
}
function postUserDetails(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`http://localhost:3000/users`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        });
    });
}
document.getElementById("registerform").addEventListener("submit", (event) => {
    event.preventDefault();
    saveCredentials();
});
