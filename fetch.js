const urlApi = "http://localhost:3000/Questions"



const addQuestion = (question, score) =>{
    fetch(urlApi,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question,score)
    })
}