const Submitregister = document.getElementById('Register')
const FullName = document.getElementById('FullName')
const speciality = document.getElementById('speciality')
const email = document.getElementById('email')
const password = document.getElementById('password')
const users = document.querySelector('.users')

export class Register {
    constructor(email, password, FullName, speciality) {
        this.email = email;
        this.password = password;
        this.FullName = FullName;
        this.speciality = speciality;
    }

    getAllFormateurs = async () => {
        let resp = await fetch("http://localhost:4000/staff", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await resp.json()
        this.DisplayFormateurs(data)
        return data
    }

    DisplayFormateurs = (data) => {
        if (users) {
            users.innerHTML = ""

            data.map(e => {
                users.innerHTML += `
            <div class="flex w-full justify-between">
                <div class="flex flex-col w-full bg-black text-white text-center ">
                <div>FullName: ${e.fullName}</div>
                <div>Email: ${e.email}</div>
                <div>speciality: ${e.speciality}</div>
                </div>
                <button onclick="ObjRegister.delete(${e.id})" class="start text-white font-bold py-2 px-4 rounded  transition duration-500 ease-in-out bg-red-600 hover:bg-white hover:text-red-600 transform hover:-translate-y-0 hover:scale-110" >Delete</button>
            </div>
        `
            })
        }
    }

    delete = async (id) => {
        let resp = await fetch(`http://localhost:4000/staff/${id}`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await resp.json()
        this.getAllFormateurs()
    }

    register = async () => {
        let resp = await fetch("http://localhost:4000/staff", {
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

// let ObjRegister = new Register()

// ObjRegister.getAllFormateurs()

Submitregister && Submitregister.addEventListener("click", async () => {
    let obj = new Register(email.value, password.value, FullName.value, speciality.value)
    obj.register()
})