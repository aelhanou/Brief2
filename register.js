const Submitregister = document.getElementById('Register')
const FullName = document.getElementById('FullName')
const speciality = document.getElementById('speciality')
const email = document.getElementById('email')
const password = document.getElementById('password')

class Register {
    constructor(email, password, FullName, speciality) {
        this.email = email;
        this.password = password;
        this.FullName = FullName;
        this.speciality = speciality;
    }
    register = async () => {
        let resp = await fetch("http://localhost:3000/staff", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": this.email,
                "password": this.password,
                "fullName": this.FullName,
                "speciality": this.speciality
            })
        })
        let data = await resp.json()
        if (data) {
            window.location.href = "login.html"
        }
    }

}

Submitregister.addEventListener("click", async () => {
    let obj = new Register(email.value, password.value, FullName.value, speciality.value)
    obj.register()
})