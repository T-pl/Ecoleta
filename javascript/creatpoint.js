function populateUFs(){
    const ufselect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()})
    .then(states => {

        for( const state of states ) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`


        }


    } )
}

populateUFs()


function getcities(event){
    const cityselect = document.querySelector("select[name=city]")

    const stateinput = document.querySelector("input[name=state]")

    const ufvalue = event.target.value
    
    const indexofselectstate = event.target.selectedindex

    stateinput.value = event.target.options[indexofselectstate]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    cityselect.innerHTML = " <option value> Selecione a Cidade </option> "
    cityselect.disabled = true

    fetch(url)
    .then( (res) => {return res.json()} )
    .then( cities => {
        
        

        for( const city of cities ) {
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`


        }

        cityselect.disabled = false

    })


}



document
        .querySelector("select[name=uf]")
        .addEventListener("change", getcities)
    

// Items de Coleta

const itemstocollect = document.querySelectorAll(".items-grid li")

for( const item of itemstocollect){
    item.addEventListener("click", handleselectecitem)
}

const colecteditems = document.querySelector("input[name=items]")

let selecteditems = [];

function handleselectecitem (event){

    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadyselected = selecteditems.findIndex(item =>{
        const itemfound = item == itemId
        return itemfound
    })

    if(alreadyselected >= 0){

        const filtereditems = selecteditems.filter(item => {
            const itemisdiferents = item != itemId
            return itemisdiferents
        })

        selecteditems = filtereditems

    } else{

        selecteditems.push(itemId)
    }

    
    colecteditems.value = selecteditems

   
}


