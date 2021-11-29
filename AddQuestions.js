const SubmitQst = document.querySelector('#SubmitQst')
const AddScore = document.querySelector('#AddScore')
const AddQuestion = document.querySelector('#AddQuestion')
const DisplayQst = document.querySelector('#DisplayQst')

let subData = []
let subjects = []




class AddQuestions extends AddSubjects {

    ParentQuestions = []
    DisplaySub = async () => {
        subData = await this.getAllSubjects()
        this.displayQst(subData)
    }

    getAllQuestions = async () => {
        let resp = await fetch("http://localhost:4000/Questions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await resp.json()
        this.ParentQuestions = data
        console.log(data);
        return data
    }
    
    addQuestion = async (Question, Score) => {
        let uuid = self.crypto.randomUUID();

        let resp = await fetch("http://localhost:4000/Questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Question": Question,
                "Score": Score,
                "type": "Question",
                "id" : uuid,
            })
        })
        let data = await resp.json()
        return data
    }

    getParent = async (e) => {
        IdOfParentSub = e

        let data = this.ParentSubjects.find(subject => e == subject.id)
        let childs = data.ArrayOfChilds.map(e => {
            return !data.hasQuestions?this.ParentSubjects.find(question => e == question.id):this.ParentQuestions.find(question => e == question.id)
        })
        DisplayQst.innerHTML = `<h3> ${data.Subject} :</h3>`

        DisplayQst.style.display = "block"
        DisplayQst.classList.add("ChooseParent", "overflow-y-scroll", "overflow-x-hidden", "h-64", "flex", "gap-2", "mt-2", "w-full", "bg-black", "text-white")
        console.log(this.ParentSubjects);
        console.log(childs);
        data.hasQuestions ?
        childs.map(({id,type,Question}) => {
            DisplayQst.innerHTML += `
                            
                            <div  id="${id}" class="ChooseParent justify-evenly flex">               
                                    <div>Question : ${Question}</div>
                                    <div>type : ${type}</div>
                            </div>
                            `
        })
        :
        childs.map(({id,type,Subject}) => {
            DisplayQst.innerHTML += `
                            
                            <div onclick="obj1.getParent(${id})" id="${id}" class="ChooseParent justify-evenly flex">               
                                    <div>Subject : ${Subject}</div>
                                    <div>type : ${type}</div>
                            </div>
                            `
        })

    }
    
    displayQst = (data) => {
        let ParentSubject = data.filter(e => e.type == "Parent")

        DisplayQst.innerHTML = ""
        DisplayQst.style.display = "block"
        DisplayQst.classList.add("ChooseParent", "overflow-y-scroll", "overflow-x-hidden", "h-64", "flex", "gap-2", "mt-2", "w-full", "bg-black", "text-white")
        ParentSubject.map(e => {
            DisplayQst.innerHTML += `
                <div onclick="obj1.getParent(${e.id})" id="${e.id}" class="ChooseParent justify-evenly flex">               
                        <div>id : ${e.id}</div>
                        <div>Subject : ${e.Subject}</div>
                        <div>type : ${e.type}</div>
                </div>
                `
        })
    }
    addQuestionsInChild = async (ParentSub, InputQst,InputScore) => {
        let child = await this.addQuestion(InputQst,InputScore)
        let data = await this.getSubjectById(ParentSub)

        // let child = {
        //     "Subject": InputValue,
        //     "type": "Parent",
        //     "ArrayOfChilds": [],
        //     "id": uuid
        // }
        data.ArrayOfChilds = [...data.ArrayOfChilds, child.id]
        data.hasQuestions = true
        let resp = await fetch(`http://localhost:4000/Subjects/${ParentSub}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        let Data = await resp.json()
        await this.getAllSubjects()
        await this.getAllQuestions()
        await this.getParent(IdOfParentSub)
    }
}

let obj1 = new AddQuestions()
obj1.DisplaySub()
obj1.getAllQuestions()







SubmitQst.addEventListener("click", async () => {

    obj1.addQuestionsInChild(IdOfParentSub,AddQuestion.value, AddScore.value)
})