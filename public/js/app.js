const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", function(e){
    e.preventDefault();

    messageOne.textContent = "Loading..";
    messageTwo.textContent = "";

    const location = search.value;
    
    fetch("/weather?address=" + location).then(function (response){
        response.json().then(function(data){
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});