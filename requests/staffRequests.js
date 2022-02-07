const target = "staff"
const urlApi = "http://localhost:3000/" + target
const headers = {
    "Content-Type": "application/json"
}
const Post = "POST"
const Delete = "DELETE"
const Update = "UPDATE"
const Get = "GET"


export const addStaff = (email, password, fullName, speciality) => {
    fetch(urlApi, {
        method: Post,
        headers: headers,
        body: JSON.stringify(email, password, fullName, speciality)
    })
}

export const editStaff = (id, email, password, fullName, speciality) => {
    fetch(urlApi, {
        method: Update,
        headers: headers,
        body: JSON.stringify(id, email, password, fullName, speciality)
    })
}

export const delStaff = (id) => {
    fetch(urlApi, {
        method: Delete,
        headers: JSON.stringify(id)
    })
}

export const viewStaffsContent = () => {
    const table
    fetch(urlApi, {
            method: Get,
            headers: headers
        })
        .then(res => res.json)
        .then(data => table = data)
    return table
}

export const login = (email, password) => {
    let users
    fetch(urlApi, {
            method: Delete,
            headers: JSON.stringify(email, password)
        })
        .then(res => res.json)
        .then(data => users = data)
    return users
}