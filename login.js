const Submitlogin = document.getElementById('Submitlogin')
const email = document.getElementById('email')
const password = document.getElementById('password')




Submitlogin.addEventListener("click", async () => {

    let LoginVerify = {
        "email": email.value,
        "password": password.value
    }
    let resp = await fetch("http://localhost:3000/staff", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let users = await resp.json()
    users.map(e => {
        if (e.email == LoginVerify.email && e.password == LoginVerify.password) {
            window.location.href = "dashboard.html"
        }
    })
    email.value = ""
    password.value = ""
})