import { AddSubjects,AddLevel } from "./index.js"
const SubmitQst = document.querySelector('#SubmitQst')
const AddScore = document.querySelector('#AddScore')
const AddQuestion = document.querySelector('#AddQuestion')
const DisplayQst = document.querySelector('#DisplayQst')
const DisplayAnsw = document.querySelector('#DisplayAnsw')
const SubmitInputCount = document.querySelector('#SubmitInputCount')
const NumberOfInputs = document.querySelector('#NumberOfInputs')
const inputNbr = document.querySelectorAll('.inputNbr')
const CloseAnswer = document.querySelector('#CloseAnswer')
let IdOfParentQst = -1
let subData = []
let subjects = []








 export class AddQuestions extends AddSubjects {

    ParentQuestions = []
    DisplaySub = async () => {
        DisplayAnsw.style.display = "none"
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
                "id": uuid,
            })
        })
        let data = await resp.json()
        return data
    }

    getParent = async (e) => {
        IdOfParentQst = e

        let data = this.ParentSubjects.find(subject => e == subject.id)
        let childs = data.ArrayOfChilds.map(e => {
            return !data.hasQuestions ? this.ParentSubjects.find(question => e == question.id) : this.ParentQuestions.find(question => e == question.id)
        })
        DisplayQst.innerHTML = `<h3> ${data.Subject} :</h3>`

        DisplayQst.style.display = "block"
        DisplayQst.classList.add("ChooseParent", "overflow-y-scroll", "overflow-x-hidden", "h-64", "flex", "gap-2", "mt-2", "w-full", "bg-black", "text-white")
        console.log(childs);
        data.hasQuestions ?
            childs.map(({
                id,
                type,
                Question
            }) => {
                DisplayQst.innerHTML += `
                            
                            <div  id="${id}" onclick="setAnswers('${id}')" class="ChooseParent justify-evenly flex">               
                                    <div>Question : ${Question}</div>
                                    <div>type : ${type}</div>
                            </div>
                            `
            }) :
            childs.map(({
                id,
                type,
                Subject
            }) => {
                DisplayQst.innerHTML += `
                            
                            <div onclick="obj1click(${id})" id="${id}" class="ChooseParent justify-evenly flex">               
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
                <div onclick="obj1click(${e.id})" id="${e.id}" class="ChooseParent justify-evenly flex">               
                        <div>id : ${e.id}</div>
                        <div>Subject : ${e.Subject}</div>
                        <div>type : ${e.type}</div>
                </div>
                `
        })
    }
    addQuestionsInChild = async (ParentSub, InputQst, InputScore) => {
        let child = await this.addQuestion(InputQst, InputScore)
        let data = await this.getSubjectById(ParentSub)

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
        await this.getParent(IdOfParentQst)
    }
}


let obj1 = new AddQuestions()

export {obj1}
// obj1.DisplaySub()
// obj1.getAllQuestions()







SubmitQst.addEventListener("click", async () => {
    // Subjects Object
let obj1 = new AddSubjects()
    obj1.addQuestionsInChild(IdOfParentQst, AddQuestion.value, AddScore.value)
})











export class AddAnswers {


    SetAnswer = (id) => {
        DisplayAnsw.style.display = "block"
        this.GlobalId = id
    }

    NumberOfAnswers = async (nbr) => {
        // DisplayAnsw.style.display = "none"
        Array.from(inputNbr).map(e => e.style.display = 'none')
        this.makeInputAnswer(nbr)
    }

    makeInputAnswer = async (nbr) => {
        DisplayAnsw.innerHTML = ""
        DisplayAnsw.innerHTML = "<h1 class='w-full text-center text-2xl'>Add Answers: </h1>"
        let div = document.createElement('div')
        let divBtn = document.createElement('div')
        divBtn.classList.add('w-full', "mt-4", "justify-center")
        div.classList.add("flex", "flex-col", "gap-4", "w-full", "h-64", "p-3", "overflow-scroll", "overflow-x-hidden", "mt-5")
        for (var i = 0; i < nbr; i++) {
            let input = document.createElement('input')
            let inputCheckBox = document.createElement('input')
            let span = document.createElement('span')
            let divAnswerWithCheckBox = document.createElement('div')
            input.setAttribute("class", "inputAnswer w-[80%] outline text-white font-bold py-2 px-4 rounded   transition duration-500 ease-in-out bg-black hover:bg-gray-300 hover:text-white transform hover:-translate-y-0 hover:scale-100")
            divAnswerWithCheckBox.setAttribute("class", "w-full flex gap-2 justify-center")
            inputCheckBox.type = "checkbox"
            inputCheckBox.checked = false
            inputCheckBox.setAttribute("class", "InputCheckBox")
            span.innerHTML = `Answer ${i + 1}`
            divAnswerWithCheckBox.appendChild(input)
            divAnswerWithCheckBox.appendChild(inputCheckBox)
            div.appendChild(span)
            div.appendChild(divAnswerWithCheckBox)
        }
        let level = document.createElement('div')
        let Levels = await objLvl.getAllLevel()
        console.log(Levels);
        level.setAttribute("class","w-full flex flex-col justify-center item-center")
        Levels.map(e=>{
        level.innerHTML += `
            <button onclick="getLevelById('${e.type}')" class="lvlChoose w-full bg-white text-black hover:bg-black hover:text-white"  >
                Level : ${e.type}
            </button>

         `
        })
        
        divBtn.innerHTML += `<button id='SubmitAnswersInput' onclick="getAllAnserwFromInputs()" class='  inputNbr start text-white font-bold py-2 px-4 rounded  transition duration-500 ease-in-out bg-black hover:bg-black hover:text-white transform hover:-translate-y-0 hover:scale-100' >Send</button>`
        DisplayAnsw.appendChild(level)
        DisplayAnsw.appendChild(div)
        DisplayAnsw.appendChild(divBtn)

    }


    getIdLevel = (type) =>{
        console.log(type);
        this.type = type
    }

    addLevelToQuestion = async () =>{
        let resp = await fetch(`http://localhost:4000/Questions/${this.GlobalId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await resp.json()
        let respLvl = await fetch(`http://localhost:4000/Questions/${this.GlobalId}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({...data,"level":  this.type})
        })
        let dataLevl = await respLvl.json()

        console.log(dataLevl);

    }

    getAllAnswersFromInput = () => {
        let inputAnswer = document.querySelectorAll('.inputAnswer')
        let InputCheckBox = document.querySelectorAll('.InputCheckBox')
        let Answer = Array.from(inputAnswer).map((e, i) => e.value)
        let checked = Array.from(InputCheckBox).map((e, i) => e.checked)
        let result = Answer.reduce((output, item, idx) => {
            return [...output, {
                answer: item,
                status: checked[idx]
            }]
        }, [])
        this.addAnswersToQuestion(result)
    }

    addAnswersToQuestion = async  (obj) => {
        let inputAnswer = document.querySelectorAll('.inputAnswer')
        let InputCheckBox = document.querySelectorAll('.InputCheckBox')
        let uuid = self.crypto.randomUUID();

        console.log(this.GlobalId);
        let resp = await fetch("http://localhost:4000/Answers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": uuid,
                "QuestionId": this.GlobalId,
                "AnswersPossible":obj
            }),
        })
        let Data = await resp.json()
        DisplayAnsw.style.display = "none"
        this.addLevelToQuestion()
        Array.from(inputAnswer).map(e => e.value = '')
        Array.from(InputCheckBox).map(e => e.checked = false)
    }
}


let objAnswer = new AddAnswers()
let objLvl = new AddLevel({})



SubmitInputCount.addEventListener("click", (e) => {
    e.preventDefault()
    objAnswer.NumberOfAnswers(NumberOfInputs.value, objAnswer.GlobalId)
})


CloseAnswer.addEventListener("click",()=>{
    DisplayAnsw.style.display = "none"
})





