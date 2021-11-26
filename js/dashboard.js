const add = document.querySelectorAll(".add")
const Choices = document.querySelectorAll(".Choices")
const SubmitQst = document.querySelector('#SubmitQst')
const AddScore = document.querySelector('#AddScore')
const AddQuestion = document.querySelector('#AddQuestion')

class Add {

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
    addQuestion = async (Question, Score) => {
        let resp = await fetch("http://localhost:3000/Questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Question": Question,
                "Score": Score
            })
        })
        let data = await resp.json()

    }
}


let obj = new Add()
obj.display()

SubmitQst.addEventListener("click", () => {
    obj.addQuestion(AddQuestion.value, AddScore.value)
})