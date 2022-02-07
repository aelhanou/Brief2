


class Staff {

    register(email, password, FullName, speciality) {
        addStaff(email,password,FullName,speciality);
        
    }
    singnin(email, password){
        login(email,password)
    }


}

let Submitregister = document.querySelector('#Register')
let Submitlogin = document.querySelector('#Submitlogin')


Submitregister.onclick = () => {

    const FullName = document.getElementById('FullName')
    const speciality = document.getElementById('speciality')
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    let register = new Staff()
    register.register(email.value, password.value, FullName.value, speciality.value)

}

Submitlogin.onclick = () => {

    const email = document.getElementById('email')
    const password = document.getElementById('password')
    let login = new Staff
    login.singnin(email.value, password.value)

}