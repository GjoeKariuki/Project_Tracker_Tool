const logOut= document.querySelector('#logout')! as HTMLDivElement

logOut.addEventListener('click', () => {
    window.location.href = '../login.html';
});