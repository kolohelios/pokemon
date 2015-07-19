/* global pokedex:true */
/* jshint camelcase:false */

'use strict';

(function(){
  $(document).ready(init);

  function init(){
    drawPokedex();
    $('#pokedex').on('click', '.pokemon:not(.filled)', getPokemon);
    $('#pokedex').on('click', '.filled', pickPlayers);
    $('#clear').click(clearPokemon);
    $('#fight').click(fight);
  }

  function pickPlayers(){
    if($(this).hasClass('p1')){
      $(this).removeClass('p1').addClass('p2');
    }
    else if($(this).hasClass('p2')){
      $(this).removeClass('p2');
    }
    else{
      $(this).addClass('p1');
    }
  }

  function fight(){
    var $p1 = $('.p1');
    var $p2 = $('.p2');

    var p1 = {}, p2 = {};

    ['attack', 'defense', 'exp', 'hp'].map(function(attr, i){
      p1[attr] = $('.p1').find('li:nth-child(' + (i + 1) + ')').text().split(':')[1] * 1;
    });
    ['attack', 'defense', 'exp', 'hp'].map(function(attr, i){
      p2[attr] = $('.p2').find('li:nth-child(' + (i + 1) + ')').text().split(':')[1] * 1;
    });

    hit(p1, p2);
    hit(p2, p1);

    $('.p1').find('li:nth-child(4)').text('hp:' + p1.hp);
    $('.p2').find('li:nth-child(4)').text('hp:' + p2.hp);

    if(p1.hp <= 0){
      $p1.remove();
    }
    if(p2.hp <= 0){
      $p2.remove();
    }
  }

  function hit(p1, p2){
    var attack = p1.attack * (p1.exp / 100);
    var defense = p2.defense * (p2.exp / 100);
    var final = attack - defense;
    final = 0 || final;
    var random = Math.floor(Math.random() * final);
    console.log(random);

    $('.p2').find('li:nth-child(4)').text();
    p2.hp -= random;
  }

  function clearPokemon(){
    $('.pokemon:not(.filled)').remove();
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
      $self.addClass('filled');

      var $ul = $self.find('ul');
      var attributes = ['attack', 'defense', 'exp', 'hp'];

      var $lis = attributes.map(function(attribute){
        return '<li>' + attribute + ': ' + response[attribute] + '</li>';
      });

      $ul.empty().append($lis);

      var spriteUrls = response.sprites.map(function(obj){
        return domain + obj.resource_uri;
      });
      spriteUrls.forEach(function(url){
        $.getJSON(url, function(response){
          $self.children('.image').css('background-image', 'url(' + domain + response.image + ')');
        });
      });

    });
  }
})();
