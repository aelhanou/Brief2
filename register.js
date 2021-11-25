const Register = document.getElementById('Register')
const FullName = document.getElementById('FullName')
const speciality = document.getElementById('speciality')
const email = document.getElementById('email')
const password = document.getElementById('password')





Register.addEventListener("click", async(e) => {
    e.preventDefault()
    let resp = await fetch("http://localhost:3000/staff", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": email.value,
            "password": password.value,
            "fullName": FullName.value,
            "speciality": speciality.value
        })
    })
    let data = await resp.json()
    console.log(data);
})