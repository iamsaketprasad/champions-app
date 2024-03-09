import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-8dfc6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsements = ref(database, "endorsements")

const textEl = document.getElementById("text-el")
const btnEl = document.getElementById("btn-el")
const ulEl = document.getElementById("ul-el")

btnEl.addEventListener("click", function() {
    let textValue = textEl.value
    push(endorsements, textValue)
    clearTextFeild()
})

onValue(endorsements, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
        clearEndorsements()
        for (let i = 0; i < endorsementsArray.length; i++) {
            let currentEndorsement = endorsementsArray[i]
            addEndorsement(currentEndorsement)
        }
    } else {
        ulEl.innerHTML = "Your words will make a difference!"
    }
})

function clearEndorsements() {
    ulEl.innerHTML = ""
}

function clearTextFeild() {
    textEl.value = ""
}

function addEndorsement(endorsement) {
    let endorsementId = endorsement[0]
    let endorsementValue = endorsement[1]
    let liEl = document.createElement("li")
    liEl.textContent = endorsementValue
    liEl.addEventListener("dblclick", function() {
        let removerThisEndorsement = ref(database, `endorsements/${endorsementId}`)
        remove(removerThisEndorsement)
    })
    ulEl.append(liEl)
}