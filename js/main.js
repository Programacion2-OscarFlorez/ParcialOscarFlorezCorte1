let word = document.getElementById("wordEnglish-input")
let tr
let table
document.getElementById("btnSearch").onclick = function () {
    let api = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ word.value
    if(word.value == ""){
        alert("Debes Ingresar una palabra")
    }else if(!api){

    }else{
        fetch(api)
	    .then(response => response.json())
	    .then(data => {
            tr = document.createElement("tr")
            table = document.getElementById("body-table")
            let tdW = document.createElement("td")
            let tdD = document.createElement("td")
            let tdU = document.createElement("td")
            let tdE = document.createElement("td")
            let tdP = document.createElement("audio")
            let br = document.createElement("br")
            data.map((element) => {
                tdW.innerHTML += element.word
                for(let i = 0;i < element.meanings.length; i++ ){
                    for(let j = 0; j < element.meanings[i].definitions.length; j++){
                        tdD.innerHTML += (j+1)+") " + element.meanings[i].definitions[j].definition
                        tdD.appendChild(br)
                        if(element.meanings[i].definitions[j].example != undefined){
                            tdE.appendChild(br)
                            tdE.innerHTML += (j+1) + ") " + element.meanings[i].definitions[j].example
                        } 
                    }
                    tdU.innerText += (i+1)+") " + element.meanings[i].partOfSpeech          
                }
                tdP.setAttribute("controls", "")
                tdP.setAttribute("src", element.phonetics[0].audio)
                tdP.innerHTML = element.phonetics[0].audio

            });
            tr.appendChild(tdW)
            tr.appendChild(tdD)
            tr.appendChild(tdU)
            tr.appendChild(tdE)
            tr.appendChild(tdP)
            table.appendChild(tr)
        })
    }
}