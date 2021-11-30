const btnLogin = document.querySelector('#btnLogin')
const btnRegister = document.querySelector('#btnRegister')
const btnLogout = document.querySelector('#btnLogout')
const DisProfile = document.querySelector('.DisProfile')




class Dashboard extends Register {


    isLogined = async () => {
        let formateurs = await this.getAllFormateurs()
        let [{
            id,
            fullName
        }] = this.isInLocalStorage()
        if (id && fullName) {
            btnLogin.style.display = "none"
            btnRegister.style.display = "none"
            btnLogout.style.display = "block"
            this.displayProfile(id)
        } else {

            btnLogout.style.display = "none"
            btnLogin.style.display = "block"
            btnRegister.style.display = "block"
            window.location.href = "./Login.html"
        }
        formateurs.map(e => {
            // this.isInLocalStorage(e.fullName)
        })

    }

    isInLocalStorage = () => {
        let idUser = []
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                idUser.push({
                    id: localStorage.getItem(localStorage.key(i)),
                    fullName: localStorage.key(i)
                })
            }
        }

        // localStorage.getItem(fullName) && idUser.push(...idUser,localStorage.getItem(fullName))
        if(idUser.length == 0) {
            return [{id: '',fullName: ''}]
        }
        return idUser

    }

    displayBtn = () => {
        btnLogout.style.display = "none"
        btnLogin.style.display = "block"
        btnRegister.style.display = "block"
    }

    isLogOut = () => {
        localStorage.clear();
        window.location.href = "Login.html"
    }

    displayProfile = async (id) => {
        let resp = await fetch(`http://localhost:4000/staff/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let {fullName,email,speciality} = await resp.json()

        DisProfile.innerHTML = ""
        
        DisProfile.innerHTML = `
            <div> Full Name is : ${fullName} <div>
            <div> Email is     : ${email} <div>
            <div> Speciality is: ${speciality} <div>
        `


    }

}



let objDashboard = new Dashboard()
objDashboard.isLogined()



btnLogout && btnLogout.addEventListener("click",() =>{
    objDashboard.isLogOut()
})