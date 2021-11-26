const target = "Questions"
const urlApi = "http://localhost:3000/" + target
const headers = {
    "Content-Type": "application/json"
}
const Post = "POST"
const Delete = "DELETE"
const Update = "UPDATE"
const Get = "GET"


const addQuestion = (question, score) => {
    fetch(urlApi, {
        method: Post,
        headers: headers,
        body: JSON.stringify(question, score)
    })
}

const editQuestion = (id, question, score) => {
    fetch(urlApi, {
        method: Update,
        headers: headers,
        body: JSON.stringify(id, question, score)
    })
}

const delQuestion = (id) => {
    fetch(urlApi, {
        method: Delete,
        headers: JSON.stringify(id)
    })
}

const viewQuestionsContent = () => {
    const table
    fetch(urlApi, {
            method: Get,
            headers: headers
        })
        .then(res => res.json)
        .then(data => table = data)
    return table
}