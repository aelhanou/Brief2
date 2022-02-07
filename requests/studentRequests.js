
const target = "Student"
const urlApi = "http://localhost:3000/"+target
const headers = { "Content-Type": "application/json" }
const Post = "POST"
const Delete = "DELETE"
const Update = "UPDATE"
const Get = "GET"


const addStudent = (email, password,fullName,phone) =>{
    fetch(urlApi,{
        method: Post,
        headers: headers,
        body: JSON.stringify(email, password,fullName,phone)
    })
}

const editStudent = (id,email, password,fullName,phone) =>{
    fetch(urlApi, {
        method: Update,
        headers:  headers,
        body: JSON.stringify(id,email, password,fullName,phone)
    })
}

const delStudent = (id) => {
    fetch(urlApi, {
        method: Delete,
        headers: JSON.stringify(id)
    })
}

const viewStudentsContent = ()  =>{
    const table
    fetch(urlApi, {
        method:Get,
        headers:headers
    })
    .then(res => res.json)
    .then(data => table = data)
    return table
}