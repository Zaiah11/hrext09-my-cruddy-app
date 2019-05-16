/*

MVP:
[X] - design html layout for game
[X] - track player data
[X] - write char gen screen
[X] - diplay char data
[X] - create a loot diplay [x] - make loot clickable with descriptions
[X] - write search for loot button function
    [X] - create array of potential loot
    [X] - write function that gives player a random item from array
    [X] - should have all loot functionality
    [X] - should display messge to player about found loot
    [X] - should consume one AP
[X] - write train combat lvl function
    [X] - should cost 3 AP
    [X] - if player doest not have AP alert player
    [X] - else increase lvl by one
    [X] - cap lvls at 3
    [X] - if player tries to train above this alert player
    [X] - display lvl changes to player
[ ] - make battle phase
    [ ] - write turn based combat
    [ ] - write enemy generator function
    [ ] - write attack button function
      - for player and enemy
    [ ] - write use item function
    [ ] - write run function
      [ ] - reloop game and count triumph if player win
      [ ] - write game over function if player death



EXTRA:
  [ ] - make item description menu better



*/

//POTENTIAL ITEMS:
var potentialLootObj = {
  "potion":{"qt":1,"desc":"Heals some hp"},
  "wand":{"qt":1,"desc":"Deals 5 magic damage to enemy"},
  "book":{"qt":1,"desc":"You feel a bit smarter already"},
  "lint":{"qt":1,"desc":"Not very useful"},
  "boots":{"qt":1,"desc":"You can run faster in these"},
  "fairy":{"qt":1,"desc":"A mysterious little creature","affect":"magicWand"}
}



//localStorage interaction function
//get item
var getItem = function(key) {
  return window.localStorage.getItem(key);
}

//create
var createItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

//update
var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

//delete
var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

//clear everything
var clearEverything = function() {
  return window.localStorage.clear();
}

var keyExists = function(key) {
  var currentValue = getItem(key);
  return currentValue !== null;
}
//popup menu
var openMenu = function(type) {
  $(".menu").css("display", "block")
}
var closeMenu = function(type){
  $(".menu").css("display", "none")
}

var launchGame = function(currentPlayer, phase) {
  //fill out window with all player obj data
  $("#playerNameInfoBox").text(currentPlayer)
  var playerData = currentPlayerObj(currentPlayer)
  var playerDataLoot = playerData["loot"]
  $("#numHP").text(playerData["hp"])
  //GHE LVL FUNCTION
  var getLvl = function() {
    $("#numLVL").text(playerData["lvl"])
  }
  //GET AP FUNCTION
  var getAp = function (phase) {
    if (phase === "prep") {
    playerData["ap"] = playerData["ap"] + 9
    }
    $("#numAP").text(playerData["ap"])
  }
  // GET LOOT FUNCTION
  var getLoot = function() {
    var getLootKeys = function(){
      return Object.keys(playerDataLoot)
    }
    var lootArr = getLootKeys()
    $("#playerLootDisplay").empty()
    for (let i of lootArr) {
      $("#playerLootDisplay").append(`<button class="items">${i}</button>`)
    }
      // ITEM FUNCTIONS:
      // GET ITEM DESCRIPTIONS WHEN CLICKED:
    var itemFunc = function(itemType) {
        alert(playerDataLoot[itemType]["desc"])
    }
    $(".items").click(function() {
        itemFunc($(this).text())
    })
  }
  getLvl()
  getLoot()
  getAp(phase);



  // PREP PHASE BUTTONS
  var getLootButton = function(lootSource) {
    var lootSourceKeys = Object.keys(lootSource)
    var num = lootSourceKeys.length
    function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
    }
    var index = getRandomInt(num)
    var itemName = lootSourceKeys[index]
    alert("You found a " + itemName)
    return itemName
  }
// SEARCH FOR LOOT BUTTON
  $("#lootButton").click(function() {
    // CHECK AP
    if (playerData["ap"] > 0) {
    var currentLoot = getLootButton(potentialLootObj)
    playerData["ap"] = playerData["ap"] - 1
    // CHECK IF PLAYER ALREADY HAS ITEM
    var currentPlayerItems = Object.keys(playerDataLoot)
    if (currentPlayerItems.includes(currentLoot)) {
      playerDataLoot[currentLoot]["qt"] = playerDataLoot[currentLoot]["qt"] + 1
    }
    else {
      playerDataLoot[currentLoot] = potentialLootObj[currentLoot]
    }
    getLoot()
    getAp()
    } else {
      alert("You do not have enough Action Points to search for loot right now \n \n \n*hint* Win fights to earn more AP")
    }
  })
// TRAIN COMBAT LVL BUTTON
  $("#trainButton").click(function() {
    if (playerData["ap"] >= 3) {
      if (playerData["lvl"] < 3){
        alert("You do some training")
        playerData["lvl"] = playerData["lvl"] + 1
        playerData["ap"] = playerData["ap"] - 3
        if (playerData["lvl"] === 3) {
        alert("CONGRADULTATIONS CHAMPION, \n \n \nYou have reached the MAX COMBAT LVL")
        }
        getLvl()
        getAp()
      } else {
        alert("You cannot train any higher, \n \n \nYou have reached the MAX COMBAT LVL")
      }
    } else {
      alert("You do not have enough Action Points to train right now \n \n \n*hint* Win fights to earn more AP")
    }

  })
  // $("#numHP").text(playerData["hp"])

}
var battlePhase = function() {

}
var currentPlayerObj = function(currentPlayer) {
    return JSON.parse(window.localStorage[currentPlayer])
}

///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  // OPEN PLAYER SELECT ON START:
  openMenu()
  $('#submitPlayer').click(function(event) {
    event.preventDefault();
    var playerName = $("#playerName").val();
    if (playerName.length < 1) {
      alert("please name your character")
    }
    else {
    // createItem("Player", {currentValue:{"hp":10,"triumphs":0,"lvl":1,"loot":{},"ap":1}})
        var playerObj = {"hp":10,"lvl": 1,"loot":{},"triumphs":0, "ap":0}
        createItem(playerName, JSON.stringify(playerObj))
        createItem("potentialLoot", JSON.stringify(potentialLootObj))
        closeMenu()
        //trigger prep phase
        launchGame(playerName, "prep")

    }
  }) 


  $('#createButton').click(function(event) {
    event.preventDefault();

    var currentKey = $("#keyInput").val();
    var currentValue = $("#valueInput").val();
    if (keyExists(currentKey)) {
      //current key exists, do something error-handle-y
    } else {
      createItem(currentKey, currentValue);
    }
  });

  $('#updateButton').click(function(event) {
    event.preventDefault();

    var currentKey = $("#keyInput").val();
    var currentValue = $("#valueInput").val();
    if (keyExists(currentKey)) {
      updateItem(currentKey, currentValue);
    } else {
      //current key doesnt exist, do stuff
    }
  });
});
