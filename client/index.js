/* global pokedex:true */
/* jshint camelcase:false */

'use strict';

$(document).ready(init);

function init(){
  drawPokedex();
  $('#pokedex').on('click', '.pokemon', getPokemon)
}

function drawPokedex(){
  pokedex.pokemon.forEach(function(pokemonObj){
    var $outerDiv = $('<div>');
    $outerDiv.addClass('pokemon').attr('data-uri', pokemonObj.resource_uri);
    var $name = $('<div>');
    $name.addClass('name').text(pokemonObj.name);
    var $image = $('<div>');
    $image.addClass('image');

    $('#pokedex').append($outerDiv.append($name, $image));
  });
}

function getPokemon(){
  var $self = $(this);
  var domain = 'http://pokeapi.co/';
  var uri = $(this).data('uri');
  var url = domain + uri;
  $.getJSON(url, function(response){
    var spriteUrls = response.sprites.map(function(obj){
      return domain + obj.resource_uri;
    });
    spriteUrls.forEach(function(url){
      $.getJSON(url, function(response){
        console.log(domain + response.image);
        $self.children('.image').css('background-image', 'url(' + domain + response.image + ')');
      });
    });

  });
}
