
const target = "Answers"
const urlApi = "http://localhost:3000/"+target
const headers = { "Content-Type": "application/json" }
const Post = "POST"
const Delete = "DELETE"
const Update = "UPDATE"
const Get = "GET"


const addAnswer = (content,status) =>{
    fetch(urlApi,{
        method: Post,
        headers: headers,
        body: JSON.stringify(content,status)
    })
}

const editAnswer = (id,content,status) =>{
    fetch(urlApi, {
        method: Update,
        headers:  headers,
        body: JSON.stringify(id,content,status)
    })
}

const delAnswer = (id) => {
    fetch(urlApi, {
        method: Delete,
        headers: JSON.stringify(id)
    })
}

const viewAnswersContent = ()  =>{
    const table
    fetch(urlApi, {
        method:Get,
        headers:headers
    })
    .then(res => res.json)
    .then(data => table = data)
    return table
}