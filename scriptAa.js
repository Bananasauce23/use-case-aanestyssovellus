window.addEventListener('load', loadData)
document.addEventListener("load", lisaaYllapitajan())
document.getElementById("takaisinnappi").addEventListener("click", takaisin)

let i = 0
let JSONdata = null

//Lataa äänestys-json
function loadData(){
    let ajax = new XMLHttpRequest()
    ajax.onload = function(){
        JSONdata = JSON.parse(this.responseText)
    }
    ajax.open("GET", "aanestykset.json", true)
    ajax.send()
}

//Takaisin
function takaisin(){
    window.localStorage.setItem("yllapitajat", JSON.stringify(yllapitajat))
    localStorage.setItem("nimi", nimi)
    window.localStorage.setItem("aanestykset", JSONdata.aanestykset)
    window.location.replace("index.html")
}

//Lisää ylläpitäjän paneelin, jos ylläpitäjä kirjautunut
function lisaaYllapitajan(){
    let yllapitajalista = window.localStorage.getItem("yllapitajat")
    nimi = localStorage.getItem("nimi")
    let yllapitajat = JSON.parse(yllapitajalista)

    for (kayttaja in yllapitajat)
        if (kayttaja == nimi){
            const otsikko = document.createElement("h2")
            otsikko.innerText = "Ylläpitäjän paneeli"
            document.getElementById("yllapitajaotsikko").appendChild(otsikko)
        
            const uusiAanestysNappi = document.createElement("button")
            uusiAanestysNappi.innerText = "Uusi äänestys"
            uusiAanestysNappi.id = "uusiaanestys"
            document.getElementById("lisaanappi").appendChild(uusiAanestysNappi)
        
            const poistaAanestysNappi = document.createElement("button")
            poistaAanestysNappi.innerText = "Poista äänestys"
            poistaAanestysNappi.id = "poistaaanestys"
            document.getElementById("poistanappi").appendChild(poistaAanestysNappi)
            
            lisaaAanestys()
        }
}

//Lisää äänestyksen
function lisaaAanestys(){
    document.getElementById('uusiaanestys').onclick = function()
    {
        i += 1

        let aanestysNimi = prompt("Anna äänestyksen nimi.")

        while (aanestysNimi.length <= 0){
            alert("Anna äänestyksen nimi")
            aanestysNimi = prompt("Anna äänestyksen nimi.")
        }

        while (aanestysNimi.length <= 0){
            alert("Anna äänestyksen nimi")
            aanestysNimi = prompt("Anna äänestyksen nimi.")
        }

        let aanestysKuvaus = prompt("Anna äänestyksen kuvaus.")

        while (aanestysKuvaus.length <= 0){
            alert("Anna äänestyksen kuvaus")
            aanestysKuvaus = prompt("Anna äänestyksen kuvaus.")
        }

        const uusiAanestys = document.createElement("li")
        uusiAanestys.id = "aanestys" + i

        const aanestyksenKuvaus = document.createElement("p")
        aanestyksenKuvaus.id = "kuvaus" + i

        let string = {"nimi": aanestysNimi, "kuvaus": aanestysKuvaus, "puolesta": 0, "vastaan": 0}
        JSONdata.aanestykset["aanestys" + i] = string

        uusiAanestys.innerHTML = aanestysNimi + " - Puolesta: " + JSONdata.aanestykset["aanestys" + i].puolesta + " - Vastaan: " + JSONdata.aanestykset["aanestys" + i].vastaan
        aanestyksenKuvaus.innerHTML = aanestysKuvaus

        document.getElementById("aanestyslista").appendChild(uusiAanestys)
        document.getElementById("aanestyslista").appendChild(aanestyksenKuvaus)

        naytaKuvaus(aanestysKuvaus)
        poistaAanestys()
    }
}

// Poistaa äänestyksen
function poistaAanestys(){
    document.getElementById("poistaaanestys").onclick = function()
    {
        aanestys = event.target
        document.getElementById(aanestys.id).removeAttribute("onclick", naytaKuvaus)
        document.getElementById("poistaaanestys").innerHTML = "Valitse äänestys, jonka haluat poistaa"
    }
}

// Näyttää äänestyksen kuvauksen klikatessa ja antaa äänestää
function naytaKuvaus(aanestysKuvaus){
    document.getElementById("aanestys" + i).onclick = function()
    {   
        let aanestys = event.target
        let valinta = prompt(aanestysKuvaus + " (p = puolesta v = vastaan)")
        valinta = valinta.toLowerCase()
        while (valinta != "p" && valinta != "v"){
            alert("Anna joko p (puolesta) tai v (vastaan).")
            valinta = prompt(aanestysKuvaus + " (p = puolesta v = vastaan)")
            valinta = valinta.toLowerCase()
        }
        if (valinta == "p"){
            JSONdata.aanestykset[aanestys.id].puolesta += 1
        }
        else if (valinta == "v"){
            JSONdata.aanestykset[aanestys.id].vastaan += 1
        }
        aanestys.innerHTML = JSONdata.aanestykset[aanestys.id].nimi + " - Puolesta: " + JSONdata.aanestykset[aanestys.id].puolesta + " - Vastaan: " + JSONdata.aanestykset[aanestys.id].vastaan
    }
}