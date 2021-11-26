
const Submitregister = document.getElementById('Register')
const Submitlogin = document.getElementById('Submitlogin')


class Staff {

    addStaff(email, password, FullName, speciality)
    login(email,password)


}

Submitregister.onclick = () => {

    const FullName = document.getElementById('FullName')
    const speciality = document.getElementById('speciality')
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    let register = new Staff()
    register.addStaff(email.value, password.value, FullName.value, speciality.value)

}

Submitlogin.onclick = () => {

    const email = document.getElementById('email')
    const password = document.getElementById('password')
    let login = new Staff
    login.login(email.value, password.value)

}

