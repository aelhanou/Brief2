const Submitlogin = document.getElementById('Submitlogin')
const email = document.getElementById('email')
const password = document.getElementById('password')

class Login {

    constructor(email, password) {
        this.email = email
        this.password = password
    }

    login = async () => {
        let Verified = false
        let resp = await fetch("http://localhost:4000/staff", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let users = await resp.json()
        users.map(e => {
            if (e.email == this.email && e.password == this.password) {
                localStorage.setItem(e.fullName,e.id)
                window.location.href = "dashboard.html"
                Verified = true
            }
        })

        if(!Verified){
            alert('the email or Password is not correct')
        }
        email.value = ""
        password.value = ""
    }
}


Submitlogin.addEventListener("click", async () => {
    let obj = new Login(email.value, password.value)
    obj.login()
})