document.addEventListener("load", lisaaYllapitajan())
document.getElementById("takaisinnappi").addEventListener("click", takaisin)

let i = 0

//localStorage.clear()

// Tarkistaa localStoragen sisällön
if (localStorage.getItem("index") == null){
    localStorage.setItem("index", JSON.stringify(0))
}
i = JSON.parse(localStorage.getItem("index"))

if (localStorage.getItem("aanestykset") == null){
    localStorage.setItem("aanestykset", JSON.stringify({}))
}
let aanestykset = JSON.parse(localStorage.getItem("aanestykset"))

for (aanestys in aanestykset){
    let listaElementti = document.createElement("li")
    let kuvausListaElementti = document.createElement("p")
    listaElementti.innerText = aanestykset[aanestys].nimi + " - Puolesta: " + aanestykset[aanestys].puolesta + " - Vastaan: " + aanestykset[aanestys].vastaan
    listaElementti.id = aanestys

    kuvausListaElementti.innerText = aanestykset[aanestys].kuvaus + " (p = puolesta v = vastaan)"
    kuvausListaElementti.id = aanestys + "kuvaus"

    document.getElementById("aanestyslista").append(listaElementti)
    document.getElementById("aanestyslista").append(kuvausListaElementti)

    document.getElementById(aanestys).onclick = function()
    {   
        let kohde = event.target
        let valinta = prompt(aanestykset[kohde.id].kuvaus + " (p = puolesta v = vastaan)")
        valinta = valinta.toLowerCase()
        while (valinta != "p" && valinta != "v"){
            alert("Anna joko p (puolesta) tai v (vastaan).")
            valinta = prompt(aanestykset[kohde.id].kuvaus + " (p = puolesta v = vastaan)")
            valinta = valinta.toLowerCase()
        }
        if (valinta == "p"){
            aanestykset[kohde.id].puolesta += 1
        }
        else if (valinta == "v"){
            aanestykset[kohde.id].vastaan += 1
        }
        kohde.innerHTML = aanestykset[kohde.id].nimi + " - Puolesta: " + aanestykset[kohde.id].puolesta + " - Vastaan: " + aanestykset[kohde.id].vastaan
    }
}

//Takaisin
function takaisin(){
    localStorage.setItem("nimi", nimi)
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

        if (aanestysNimi == null){
            i -= 1
        }

        while (aanestysNimi.length <= 0){
            alert("Anna äänestyksen nimi")
            aanestysNimi = prompt("Anna äänestyksen nimi.")
        }

        let aanestysKuvaus = prompt("Anna äänestyksen kuvaus.")
        
        if (aanestysKuvaus == null){
            i -= 1
        }

        while (aanestysKuvaus.length <= 0){
            alert("Anna äänestyksen kuvaus")
            aanestysKuvaus = prompt("Anna äänestyksen kuvaus.")
        }

        const uusiAanestys = document.createElement("li")
        uusiAanestys.id = "aanestys" + i

        const aanestyksenKuvaus = document.createElement("p")
        aanestyksenKuvaus.id = "aanestys" + i + "kuvaus"

        let string = {"nimi": aanestysNimi, "kuvaus": aanestysKuvaus, "puolesta": 0, "vastaan": 0}
        aanestykset["aanestys" + i] = string
        localStorage.setItem("aanestykset", JSON.stringify(aanestykset))

        uusiAanestys.innerHTML = aanestykset["aanestys" + i].nimi + " - Puolesta: " + aanestykset["aanestys" + i].puolesta + " - Vastaan: " + aanestykset["aanestys" + i].vastaan
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

// Näyttää äänestyksen kuvauksen klikattaessa ja antaa äänestää
function naytaKuvaus(aanestysKuvaus){
    document.getElementById("aanestys" + i).onclick = function()
    {   
        let kohde = event.target
        let valinta = prompt(aanestysKuvaus + " (p = puolesta v = vastaan)")
        valinta = valinta.toLowerCase()
        while (valinta != "p" && valinta != "v"){
            alert("Anna joko p (puolesta) tai v (vastaan).")
            valinta = prompt(aanestysKuvaus + " (p = puolesta v = vastaan)")
            valinta = valinta.toLowerCase()
        }
        if (valinta == "p"){
            aanestykset[kohde.id].puolesta += 1
        }
        else if (valinta == "v"){
            aanestykset[kohde.id].vastaan += 1
        }
        kohde.innerHTML = aanestykset[kohde.id].nimi + " - Puolesta: " + aanestykset[kohde.id].puolesta + " - Vastaan: " + aanestykset[kohde.id].vastaan
    }
}