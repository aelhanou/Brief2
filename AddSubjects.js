const add = document.querySelectorAll(".add")
const Choices = document.querySelectorAll(".Choices")
const DisplaySub = document.querySelector('#DisplaySub')
const chooseSubject = document.querySelector('#chooseSubject')
const inputSubject = document.querySelector('#inputSubject')
const SubmitSub = document.querySelector('#SubmitSub')
const SubmitTypeOfSub = document.querySelector('#SubmitTypeOfSub')
let Parent = ''
let Child = ''
let IdOfParentSub = -1
let GlobalDataForChildSub = ''


class AddSubjects {
    dataGlobal = []
    ParentSubjects = []
    display = () => {
        Array.from(add).map(e => {
            e.addEventListener("click", () => {
                Array.from(Choices).map(f => {
                    if (f.getAttribute('dataset') != e.id) {
                        f.style.display = "none"
                    } else {
                        f.style.display = "block"
                    }
                })
            })
        })
    }

    getAllSubjects = async () => {
        let resp = await fetch("http://localhost:4000/Subjects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await resp.json()
        this.ParentSubjects = data
        return data
    }

    getSubjectById = async (id) => {
        let resp = await fetch(`http://localhost:4000/Subjects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await resp.json()
        return data
    }

    addSubjects = async (Question, type) => {

        let resp = await fetch("http://localhost:4000/Subjects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Subject": Question,
                "type": type,
                "ArrayOfChilds": []
            }),
        })
        let data = await resp.json()

        // GlobalDataForChildSub = data
        return data
    }
    getParent = async (e) => {
        IdOfParentSub = e
        let data = this.ParentSubjects.find(subject => e == subject.id)
        let childs = data.ArrayOfChilds.map(e => {
            return this.ParentSubjects.find(subject => e == subject.id)
        })

        DisplaySub.innerHTML = ""
        DisplaySub.style.display = "block"
        DisplaySub.classList.add("ChooseParent", "overflow-y-scroll", "overflow-x-hidden", "h-64", "flex", "gap-2", "mt-2", "w-full", "bg-black", "text-white")
        childs.map(e => {
            DisplaySub.innerHTML += `
                            <h3> subjects of ${data.Subject} :</h3>
                            <div onclick="obj.getParent(${e.id})" id="${e.id}" class="ChooseParent justify-evenly flex">               
                                    <div>id : ${e.id}</div>
                                    <div>Subject : ${e.Subject}</div>
                                    <div>type : ${e.type}</div>
                            </div>
                            `
        })
        console.log(childs);
    }
    addChildsToParent = async (ParentSub, InputValue, Child) => {
        let child = await this.addSubjects(InputValue, Child)
        let data = await this.getSubjectById(ParentSub)

        data.ArrayOfChilds = [...data.ArrayOfChilds, child.id]
        let resp = await fetch(`http://localhost:4000/Subjects/${ParentSub}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        let Data = await resp.json()
        console.log(Data);
    }

    switchBetweenComponents = () => {
        inputSubject.style.display = "block"
        chooseSubject.style.display = "none"
        SubmitTypeOfSub.style.display = "none"
        SubmitSub.style.display = "block"
    }

}


let obj = new AddSubjects()
obj.display()
obj.getAllSubjects()


SubmitTypeOfSub.addEventListener("click", async () => {
    if (chooseSubject.value == "Parent") {
        Parent = "Parent"
        obj.switchBetweenComponents()
    } else if (chooseSubject.value == "Child") {
        Child = "Child"
        obj.switchBetweenComponents()
        let a = await obj.getAllSubjects()
        let ParentSubject = a.filter(e => e.type == "Parent")
        if (Object.keys(a).length !== 0) {
            DisplaySub.innerHTML = ""
            DisplaySub.style.display = "block"
            DisplaySub.classList.add("ChooseParent", "overflow-y-scroll", "overflow-x-hidden", "h-64", "flex", "gap-2", "mt-2", "w-full", "bg-black", "text-white")
            ParentSubject.map(e => {
                DisplaySub.innerHTML += `
                            <div onclick="obj.getParent(${e.id})" id="${e.id}" class="ChooseParent justify-evenly flex">               
                                    <div>id : ${e.id}</div>
                                    <div>Subject : ${e.Subject}</div>
                                    <div>type : ${e.type}</div>
                            </div>
                            `
            })

        }
    }
})



SubmitSub.addEventListener("click", async (event) => {
    if (Parent == "Parent") {
        if (inputSubject.value != "") {
            event.preventDefault();
            obj.addSubjects(inputSubject.value, Parent)
        }
    } else if (Child == "Child") {
        if (IdOfParentSub != -1) {

            obj.addChildsToParent(IdOfParentSub, inputSubject.value, Child)
        }
    }


})