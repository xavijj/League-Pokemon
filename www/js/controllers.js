angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) { $(document).ready(function() {
  fillProgressBar('cFija', '#f66', 80, 'Exp. 80%');
  
});

function newProgressBar(id) {
  var newCanvas =
    $('<canvas/>', {
      'id': id
    });
  newCanvas.attr("width", 100);
  newCanvas.attr("height", 100);
  $('.container').append(newCanvas);
}

function fillProgressBar(id, color, progress, text) {
  var p = 0;
  var interval = setInterval(function() {

    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    var radius = 50;
    var startAngle = 0;
    var endAngle = 2 * Math.PI;
    var counterClockwise = false;
    if (progress == null)
      progress = 100;

    context.clearRect(0, 0, 2, 2);

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.fillStyle = '#eee';
    context.fill();

    radius = 60;
    startAngle = 1.5 * Math.PI;
    //endAngle = 1.5 * Math.PI + (2 * Math.PI) * progress / 100;
    endAngle = 1.5 * Math.PI + (2 * Math.PI) * p / 100;

    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 20;
    context.strokeStyle = color;
    context.stroke();

    if (text == null)
      text = "HOLA";

    context.fillStyle = '#101010';
    context.font = "20px Arial";
    var xText = 100 - (context.measureText(text).width / 2);
    context.fillText(text, xText, 110);
    if (p == progress)
      clearInterval(interval);
    p++;
  }, 1);
}
})

.controller('ChatsCtrl', function($scope, Chats) {
let buttonSearch;
let inputPokemon;
let namePokemon;
let idPokemon;
let picturePokemon;
const spinner = document.querySelector('.spinner');

function reload() {
    document.getElementById('search-Pokemon').addEventListener('click', searchPokemon);
    inputPokemon = document.querySelector('.input-pokemon').value.toLowerCase();
    namePokemon = document.querySelector('.name-pokemon');
    idPokemon = document.querySelector('.id-pokemon');
    picturePokemon = document.querySelector('.img-pokemon');
    weightPokemon = document.getElementById('weight');
    heightPokemon = document.getElementById('height');
}

function spinnerLoading(param) {
    if (param === 'hide') {
        idPokemon.style.display = 'none';
        picturePokemon.style.display = 'none'
        namePokemon.style.display = 'none';
        spinner.style.display = 'block';

    }else{
        idPokemon.style.display = 'block';
        picturePokemon.style.display = 'block'
        namePokemon.style.display = 'block';
        spinner.style.display = 'none';
    }
}

function searchPokemon(e) {
    e.preventDefault();
    reload();
    spinnerLoading('hide');
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputPokemon}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw response;
        })
        .then((pokemon) => {
            spinnerLoading('show');
            let name = pokemon.name;
            let id = pokemon.id;
            let picture = pokemon.sprites.front_default;
            let weight = pokemon.weight;
            let height = pokemon.height;

            document.querySelector('.types-list').innerHTML = '';
            for (const key in pokemon.types) {
                if (pokemon.types.hasOwnProperty(key)) {
                    const types = pokemon.types[key].type.name;
                    document.querySelector('.types-list').innerHTML += `
                        <li>${types}</li>
                    `;
                }
            }

            namePokemon.innerHTML = name;
            idPokemon.innerHTML = `#${id}`;


            picturePokemon.setAttribute('src', picture);

            weightPokemon.innerHTML = `WEIGHT: ${weight}`;
            heightPokemon.innerHTML = `HEIGHT: ${height}`;

        })
        .catch((error) => {
            spinnerLoading('show');
            if (error.status === 404) {
                let oldId = idPokemon.innerHTML;
                let oldName = namePokemon.innerHTML;
                let oldPicture = document.querySelector('.img-pokemon').getAttribute('src');

                idPokemon.innerHTML = 'ERROR';
                namePokemon.innerHTML = 'DOES NOT EXIST';
                picturePokemon.setAttribute('src', 'https://raw.githubusercontent.com/SoyDiego/pokedex.js/master/img/emoji.png');

                setInterval(() => {
                    idPokemon.innerHTML = oldId;
                    namePokemon.innerHTML = oldName
                    picturePokemon.setAttribute('src', oldPicture);
                }, 2000);

                document.querySelector('.input-pokemon').value = '';

            }
        })
}

reload();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
$(document).ready(function(){
  
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SM10/SM10_ES_57.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/XYP/XYP_ES_XY84.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/XYP/XYP_ES_XY17.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/BW4/BW4_ES_8.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SM10/SM10_ES_131.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/BWP/BWP_ES_BW74.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SM35/SM35_ES_56.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SMP/SMP_ES_SM34.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/XYP/XYP_ES_XY116.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SM10/SM10_ES_57.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/XYP/XYP_ES_XY84.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/XYP/XYP_ES_XY17.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/BW4/BW4_ES_8.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SM10/SM10_ES_131.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/BWP/BWP_ES_BW74.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SM35/SM35_ES_56.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/SMP/SMP_ES_SM34.png",
"https://assets.pokemon.com/assets/cms2-es-es/img/cards/web/XYP/XYP_ES_XY116.png"
];
// verificacion de los clicks
function clicked() { 
  if ($(this).find(".inner-wrap").hasClass("flipped")) {
    return;
  }
  $(this).find(".inner-wrap").toggleClass("flipped");
  checkArray.push($(this).find("img").attr("src"));
  idArray.push($(this).attr("id"));
  check();
}

$(".carta").on("click", clicked);
  
//reiniciar el juego
function reiniciar() {
  $(".atras").find("img").remove(); //quitar todas las imagenes actuales
  $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
  checkArray = []; 
  idArray = [];
  contador = 0; 
  fin = 0;
  iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
  if (fin === 18) { //si todas las cartas estan volteadas
    alert("Juego finalizado, lo has logrado en " + contador + " intentos");
    reiniciar();
  }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

  

  var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
  for (var i = 0; i < fields.length; i++) {
    var img = document.createElement("img");
    img.src = arr[i];
    fields[i].appendChild(img);
  }


}

function check() {
  //si los fields se  han hecho dos clicks 
  if (checkArray.length === 2) {
    $(".carta").off("click", clicked); 
    setTimeout(function(){
      //si no hay match
      if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
        $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
        $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
        contador++;
        //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
        idArray = []; 
        //habilitar el click de nuevo
        $(".carta").on("click", clicked);
      } else {

        contador++;
        
        fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
        //vaciar los dos arrays
        checkArray = []; 
        idArray = []; 
        verificarFin(); 
        $(".carta").on("click", clicked); 
      }
      document.querySelector(".counter").innerHTML = contador;
    }, 800);  
  }
}



iniciarJuego();

});
})
