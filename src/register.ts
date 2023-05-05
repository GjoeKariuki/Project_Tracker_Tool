function saveCredentials()
{
    const registeredemail = (document.getElementById("registeremail")! as HTMLInputElement).value;
    const registeredname = (document.getElementById("registerusername")! as HTMLInputElement).value;
    const registeredpassword = (document.getElementById("registerpassword")! as HTMLInputElement).value;
    const confirmedpassword = (document.getElementById("confirmpassword")! as HTMLInputElement).value;
    

    // check if passwords are same
    if(registeredpassword === confirmedpassword){
        // print passwords match
        // alert("passwords match");
        // object to hold credentials
        const credentials = {
            email: registeredemail,
            username: registeredname,
            password: registeredpassword
        };
        // console.log(credentials)
        // localStorage.setItem("credentials", JSON.stringify(credentials));
        postUserDetails(credentials);   
            
    }
    else if(registeredpassword !== confirmedpassword)
    {
        alert("passwords don't match");    
    }   
}

async function postUserDetails(obj:{})
{
    await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body:JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    });
}



document.getElementById("registerform")!.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCredentials();
});