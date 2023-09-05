"use strict";
// document.getElementById("containerLoader").classList.remove("hidden");

let btnInicioBot = document.getElementById("btnInicioBot");

btnInicioBot.addEventListener("click", async () => {

    // const formData = new FormData()
    fetch('/inicioBot',{
        method: 'POST'
        // body: formData
      })
      .then(data => {
        try{
            console.log(data)
        }catch(err){
            console.log(err)
        }
    })

})

