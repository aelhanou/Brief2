
const target = "Levels"
const urlApi = "http://localhost:3000/"+target
const headers = { "Content-Type": "application/json" }
const Post = "POST"
const Delete = "DELETE"
const Update = "UPDATE"
const Get = "GET"


const addLevel = (description,minScore) =>{
    fetch(urlApi,{
        method: Post,
        headers: headers,
        body: JSON.stringify(description,minScore)
    })
}

const editLevel = (id,description,minScore) =>{
    fetch(urlApi, {
        method: Update,
        headers:  headers,
        body: JSON.stringify(id,description,minScore)
    })
}

const delLevel = (id) => {
    fetch(urlApi, {
        method: Delete,
        headers: JSON.stringify(id)
    })
}

const viewLevelsContent = ()  =>{
    const table
    fetch(urlApi, {
        method:Get,
        headers:headers
    })
    .then(res => res.json)
    .then(data => table = data)
    return table
}