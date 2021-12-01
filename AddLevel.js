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
        if(this.type && this.MaxLevel && this.MinLevel){
        let obj = {
            "type" : this.type,
            "minScore" : this.minScore,
            "maxScore" : this.maxScore
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

    getAllLevel = async () =>{
        let resp = await fetch("http://localhost:4000/Level", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await resp.json()
        this.displayLevel(data)
    }


    displayLevel = (data) => {
        DisplayLevel.innerHTML = ""

        data.map(({id,type,minScore,maxScore}) =>{
            DisplayLevel.innerHTML += `
                <button onclick="objLvl.displayScore(${id})" id="${id}" class="w-full bg-white text-black" >Type: ${type}</button>
            `
        })
    }

    displayScore = async (idParent) =>{
        DisScore.innerHTML = ""
        let resp = await fetch(`http://localhost:4000/Level/${idParent}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let {type,minScore,maxScore,id} = await resp.json()
        console.log(minScore);
        console.log(maxScore);
        DisScore.innerHTML=`
            <input type="text" value="${minScore}" placeholder="MinScore" class="start outline text-black font-bold py-2 px-4 rounded   transition duration-500 ease-in-out bg-white  transform hover:-translate-y-0 hover:scale-110" style="width: 400px;height: 60px;" >
            <input type="text" value="${maxScore}" placeholder="MaxScore" class="start outline text-black font-bold py-2 px-4 rounded   transition duration-500 ease-in-out bg-white  transform hover:-translate-y-0 hover:scale-110" style="width: 400px;height: 60px;" >
        `

        console.log(DisScore);
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