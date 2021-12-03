const SubmitLvl = document.querySelector('#SubmitLvl')
const LevelType = document.querySelector('#LevelType')
const MaxLevel = document.querySelector('#MaxLevel')
const MinLevel = document.querySelector('#MinLevel')
const DisplayLevel = document.querySelector('.DisplayLevel')
const DisScore = document.querySelector('#DisplayScore')




class AddLevel {


    constructor(obj) {
        let {
            type,
            minScore,
            maxScore
        } = obj
        this.type = type
        this.minScore = minScore
        this.maxScore = maxScore
    }
    addLvL = async () => {
        if (this.type && this.MaxLevel && this.MinLevel) {
            let obj = {
                "type": this.type,
                "minScore": this.minScore,
                "maxScore": this.maxScore
            }
            let resp = await fetch("http://localhost:4000/Level", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            })
            let data = await resp.json()
            console.log(data);
        }
    }

    getAllLevel = async () => {
        let resp = await fetch("http://localhost:4000/Level", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await resp.json()
        this.displayLevel(data)
        return data
    }


    displayLevel = (data) => {
        DisplayLevel.innerHTML = ""

        data.map(({
            id,
            type,
            minScore,
            maxScore
        }) => {
            DisplayLevel.innerHTML += `
                <button onclick="objLvl.displayScore(${id})" id="${id}" class="w-full bg-white text-black" >Type: ${type}</button>
            `
        })
    }

    displayScore = async (idParent) => {
        DisScore.innerHTML = ""
        let resp = await fetch(`http://localhost:4000/Level/${idParent}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let {
            type,
            minScore,
            maxScore,
            id
        } = await resp.json()
        DisScore.innerHTML = `
            <div class="bg-white gap-2 mt-3 w-full flex flex-col items-center justify-center">
                <input type="text" value="${minScore}" placeholder="MinScore" class="inputMin w-full start outline text-white font-bold py-2 px-4 rounded   transition duration-500 ease-in-out bg-black text-center  transform hover:-translate-y-0 hover:scale-100" style="height: 60px;" >
                <input type="text" value="${maxScore}" placeholder="MaxScore" class="inputMax w-full start outline text-white font-bold py-2 px-4 rounded   transition duration-500 ease-in-out bg-black text-center transform hover:-translate-y-0 hover:scale-100" style="height: 60px;" >
            </div>
            <div class="w-full flex mt-3 justify-center">
                <button id="updateLevel" onclick="objLvl.updateLevel(${id})" class="start text-white font-bold py-2 px-4 rounded  transition duration-500 ease-in-out bg-black hover:bg-black hover:text-white transform hover:-translate-y-0 hover:scale-110" >Send</button>
            </div>
        `

    }

    updateLevel = async (id) => {
        const inputMin = document.querySelector('.inputMin')
        const inputMax = document.querySelector('.inputMax')

        let resp = await fetch(`http://localhost:4000/Level/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "minScore": inputMin.value ,
                "maxScore": inputMax.value
            })
        })
        let data = await resp.json()

        console.log(data);
    }

}



let objLvl = new AddLevel({})

objLvl.getAllLevel()




SubmitLvl.addEventListener("click", () => {

    let objData = {
        "type": LevelType.value,
        "minScore": MinLevel.value,
        "maxScore": MaxLevel.value,
    }
    let objLvl = new AddLevel(objData)
    objLvl.addLvL()
})