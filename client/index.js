'use strict';

$(document).ready(init);

function init(){
  drawPokedex();
}

function drawPokedex(){
  pokedex.pokemon.forEach(function(pokemonObj){
    var $outerDiv = $('<div>');
    $outerDiv.addClass('pokemon').attr('data-uri', pokemonObj.resource_uri);
    var $innerDiv = $('<div>');
    $innerDiv.addClass('name').text(pokemonObj.name);
    $('#pokedex').append($outerDiv.append($innerDiv));
  });
}
