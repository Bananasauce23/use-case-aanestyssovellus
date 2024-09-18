let kayttajalista = {}
let tavallisetkayttajat = {}
let yllapitajat = {}
let nimi = ""

// Lisää uuden käyttäjän
function lisaakayttaja(){
    let virhe = false
    nimi = document.getElementById("uusinimi").value
    let salasana = document.getElementById("uusisalasana").value

    virheet(nimi, salasana)

    // Tarkastaa, onko käyttäjälista tyhjä, ja onko nimi käytössä
    if (Object.keys(kayttajalista).length == 0){
        virhe = false
    }
    else{
        for (x in kayttajalista){
            if (nimi == x){
                alert("Käyttäjänimi on jo käytössä")
                virhe = true
            }
        }
    }

    // Lisää käyttäjän käyttäjälistaan + tavalliset käyttäjät/ylläpitäjät -listaan
    if (virhe == false && nimi != "" && salasana != ""){
        if (document.getElementById("tavallinenkayttaja").checked){
            tavallisetkayttajat[nimi] = salasana
        }
        else{
            yllapitajat[nimi] = salasana
        }
        kayttajalista[nimi] = salasana 
    }
}

// Näyttää virheet
function virheet(nimi, salasana){
    if (nimi == "" || salasana == ""){
        if (nimi == "" && salasana == ""){
            alert("Anna käyttäjänimi ja salasana")
        }
        else if (nimi == ""){
            alert("Anna käyttäjänimi")
        }
        else if (salasana == ""){
            alert("Anna salasana")
        }
    }
}

// Tarkistaa onko käyttäjänimen salasana oikein
function tarkistatiedot(){
    nimi = document.getElementById("vanhakayttajanimi").value
    let salasana = document.getElementById("vanhasalasana").value

    virheet(nimi, salasana)

    if (nimi in kayttajalista && Object.keys(kayttajalista).length != 0){
        if (salasana != kayttajalista[nimi]){
            alert("Väärä salasana, yritä uudelleen")
        }
        else{
            window.localStorage.setItem("yllapitajat", JSON.stringify(yllapitajat))
            localStorage.setItem("nimi", nimi)
            window.location.replace("aanestykset.html")
        }
    }
    else{
        alert("Käyttäjänimeä ei löytynyt")
    }
}