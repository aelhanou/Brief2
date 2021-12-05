import { AddSubjects } from "./AddSubjects.js"
import { AddLevel } from "./AddLevel.js"
import { AddQuestions,AddAnswers} from "./AddQuestions.js"
import { Register } from "./Register.js"
import { Login } from "./Login.js"
import { Dashboard } from "./Dashboard.js"
// const register = document.getElementById('register')


// register.addEventListener("click",()=>{
//     window.location.href = "Register.html"
// })



// register.onclick = () => {
//     window.location.href = "Register.html"
// }

// Subjects Object

let obj = new AddSubjects()
const SubjectsAwait = async () => {
    obj.display()
    let AllSubjects = await obj.getAllSubjects()
    return AllSubjects
}

SubjectsAwait()


window.objclick =  (id) => {
    console.log(id);
    obj.getParent(id)
}

// Question Object

let obj1 = new AddQuestions()
let objAnswer = new AddAnswers()


const QuestionAwait = async () => {
    obj1.DisplaySub()
    let AllQuestions = await obj1.getAllQuestions()
    console.log(AllQuestions);
    return AllQuestions
}
QuestionAwait()
window.obj1click =  (id) => {
    obj1.getParent(id)
}

window.setAnswers = (id) =>{
    objAnswer.SetAnswer(id)
}
window.getLevelById = (id) =>{
    objAnswer.getIdLevel(id)
}
window.getAllAnserwFromInputs = () =>{
    objAnswer.getAllAnswersFromInput()
}



// Level Object

let objLvl = new AddLevel({})
objLvl.getAllLevel()


window.addLevel = (id) =>{ 
    objLvl.updateLevel(id)
}

window.displayScore = (id) =>{
    objLvl.displayScore(id)
}




// Dashboard Object

let objDashboard = new Dashboard()
objDashboard.isLogined()

// Register Object

let ObjRegister = new Register()
ObjRegister.getAllFormateurs()



export {AddLevel,AddSubjects,AddQuestions,Dashboard,Login,Register}
