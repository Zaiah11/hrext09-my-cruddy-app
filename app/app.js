/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

*/

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
var prepPhase = function(currentPlayer) {
  
}
var battlePhase = function() {

}

///////////////////////////////////////////
//event handlers for the buttons and ... possibly the inputboxes
  //preventdefault on button clicks
$(document).ready(function() {
  // OPEN PLAYER SELECT ON START:
  // openMenu()
  // $('#submitPlayer').click(function(event) {
  //   event.preventDefault();
  //   var playerName = $("#playerName").val();
  //   if (playerName.length < 1) {
  //     alert("please name your character")
  //   }
  //   else {
  //   // createItem("Player", {currentValue:{"hp":10,"triumphs":0,"lvl":1,"loot":{},"ap":1}})
  //       var playerObj = {"hp":10,"lvl": 1,"loot":{},"triumphs":0}
  //       createItem(playerName, JSON.stringify(playerObj))
  //       closeMenu()
  //       //trigger prep phase
  //       prepPhase(playerName)
  //   }
  // })

    



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
