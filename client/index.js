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
    var $name = $('<div>');
    var $image = $('<div>');
    var $stats = $('<div>');
    $outerDiv.addClass('pokemon').attr('data-uri', pokemonObj.resource_uri);
    $name.addClass('name').text(pokemonObj.name);
    $image.addClass('image');
    $stats.addClass('stats');

    var $ul = $('<ul>');
    $stats.append($ul);

    $('#pokedex').append($outerDiv.append($name, $image, $stats));
  });
}

function getPokemon(){
  var $self = $(this);
  var domain = 'http://pokeapi.co/';
  var uri = $(this).data('uri');
  var url = domain + uri;
  $.getJSON(url, function(response){
    console.log(response);

    var $ul = $self.find('ul');
    var attributes = ['attack', 'defense', 'exp', 'hp'];

    var $lis = attributes.map(function(attribute){
      return '<li>' + attribute + ':' + response[attribute] + '</li>';
    });

    $ul.append($lis);

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
