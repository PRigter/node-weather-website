
 // Fetch é uma função que permite obter dados de uma forma assincrona! (tal como no node.js)
// o que significa que não teremos acesso a data imediatamente, em vez disso providenciamos uma função, e essa função será chamada num futuro, quando a DATA estiver disponivel 
// com fetch API - fornece uma interface JavaScript para accessar e manipular partes do pipeline HTTP, tais como os pedidos e respostas.
// Usamos o método .then no valor a ser devolvido from fetch, e aplicamos assim a callback function que queremos correr.
// e poder ter acesso à resposta, com apenas uma argumento "(response)" na função.
fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) =>{// vamos ter acesso aqui aos dados atraves da função .json(), e é também "desenhado" para trabalhar com a função .then(), de seguinda a callback function. Esta função vai correr DEPOIS do json DATA ter chegado, e depois é feito o parse desses dados. Estes dados são guardados no argumento da callback function que neste exemplo chamamos de "data"
        console.log(data)

    }) 
})

//Agora dentro da callback function, podemos dizer o que queremos fazer com a resposta.
// Como por exemplo extrair os dados e renderizá-la no browser / ou apenas enviar para a consola.
// Assim estamos a "dizer" fetch a data neste url, e depois "".then" corre esta função.

// -----------------------------------------------------------------------


// Goal: Fetch weather!

// 1. setup a call to fetch weather for Boston
// 2. Get the parse JSON response
//     - if error property, print error
//     - if no error property, print location and forecast

// fetch("http://127.0.0.1:3000/weather?address=Boston").then((response) => {
//     response.json().then((data) => {
//         if(data.error) { // erro foi definido na callback function do script geocode.js - em que dissemos que - caso haja um erro, dispara para a callback funtion algo, neste caso uma string com informação.
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
        
       
//     })
// })


const weatherForm = document.querySelector("form")
const searchInput = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")



// a ter em atenção que a chamada do script na pagina "index", terá que estar posicionado abaixo do form - em vez de estar no header.
// "Submit" callback abaixo -- 1º obtem o valor introduzido, é passado para a variavel "location", e deseguida é feito o feito dos dados
weatherForm.addEventListener("submit", (e)=> { // Precisamos de passar 2 argumentos para o nosso event listener, o 1º será o nome do evento "Submit", o segundo será a callback function, que vai correr sempre que este evento ocorre.
    e.preventDefault() // vai prevenir o comportamento normal o que é submeter a informação e refresh da página - útil para enquanto estamos a escrever o código e a testar o submit

    const location = searchInput.value
    
    messageOne.textContent = "Loading..." //Com este método passamos info para o paragrafo, mesmo antes da função fetch, assim que é submetido aparece primeiro a messagem "Loading..." e de seguida, já dentro da função fecht apresenta sim a informação
    messageTwo.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if(data.error) { // erro foi definido na callback function do script geocode.js - em que dissemos que - caso haja um erro, dispara para a callback funtion algo, neste caso uma string com informação.
            console.log(data.error)
            messageOne.textContent = data.error // caso haja algum erro, apresenta no 1º paragrafo o erro
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
        
       
    })
})
})