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
  [X] - make battle phase
      [X] - write turn based combat
      [X] - write enemy generator function
      [X] - write attack button function
        - for player and enemy
      [X] - write use item function
      [X] - write run function
        [X] - reloop game and count triumph if player win
        [X] - write game over function if player death
  [ ] - finishinf touches for MVP
      [X] - finish giving all items an effect
      [ ] - give combat system some randomization

  EXTRA:
    [ ] - allow for actual game restart without needing to refresh browser
    [ ] - get rid of all alert boxes, replace them with pop up windows
    [ ] - make use item pop up buttons nicer
    [ ] - make item description menu better, 
        [ ] - display quantity of item
        [ ] - adjust rarity of items
    [ ] - translate ADVANCED list into check boxes
    [ ] - create high score local storage object 
        [ ] - display top highscore on opening screen

4. ADVANCED: 
    if I get through all of this and still have time 
      1. I would like to expand on the combat system:
        - I would like to add spcific skills to the player to deepen the battle phase
        - The player could also train specific skills in the prep phase
      2. I would like to add some more RPG elements to the prep phase:
        - Maybe scavenging for loot could have some random dialogue generated
      3. add music
      4. add hp bars
      5. add in randomized memos for each action button
      6. add animtations

  */

  //POTENTIAL ITEMS:
  var potentialLootObj = {
    "potion":{"qt":1,"desc":"Heals some hp"},
    "wand":{"qt":1,"desc":"Deals 5 magic damage to enemy"},
    "book":{"qt":1,"desc":"You feel a bit smarter already"},
    "lint":{"qt":1,"desc":"Not very useful"},
    "boots":{"qt":1,"desc":"You put on the boots and feel light as a feather."},
    "fairy":{"qt":1,"desc":"A mysterious little creature"}
  }
  var potentialEnemyNames = {"Imp":"Hisssss..", 
    "Hill Giant":"Fee Fi Fo Fum, I'm about to turn you into lunch.", 
    "Cave Troll":"Shreik.. gulp.. gurgle ", 
    "Mysterious Stranger":"A stranger who is also mysterious", 
    "Garden Gnome":"You think you can just walk into my... my.. my, my gardend unanounced?!", 
    "Ent":"I grow weary of your kind human.", 
    "Old Man":"oooh ma back..", 
    "Bart the Great":"I am Bart and I am great! <br>Prepare to meet your destiny."
  }
  var potentialEnemyLvls = {
    1:3,
    2:7,
    3:10
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
    if(type === "playerSelect") {
      $(".playerMenu").css("display", "block")
    }
    else if (type === "useItem") {
      $(".useItemMenu").css("display", "block")
    }
    else if (type === "gameOver") {
      $(".gameOver").css("display", "block")
    }
    $(".menu").css("display", "block")
  }
  var closeMenu = function(type){
    if(type === "playerSelect") {
      $(".playerMenu").css("display", "none")
    }
    else if (type === "useItem") {
      $(".useItemMenu").css("display", "none")
    }
    $(".menu").css("display", "none")
  }
  var gameOver = function(){
      openMenu("gameOver")
  }
  var rollDice = function(max){
    return Math.floor(Math.random() * Math.floor(max));
  }


  var launchGame = function(currentPlayer, phase) {
    //fill out window with all player obj data
    $("#playerNameInfoBox").text(currentPlayer)
    var playerData = currentPlayerObj(currentPlayer)
    var playerDataLoot = playerData["loot"]
    var enemyData;
    $("#numHP").text(playerData["hp"])
    //GET HP FUNCTION
    var getHp = function() {
      $("#numHP").text(playerData["hp"])
    }
    var getTriumphs = function(){
      $("#vic").text(playerData["triumphs"])
    }
    var getEnemyHp = function() {
      $("#enemyNumHP").text(enemyData["hp"])
    }
    //GHE LVL FUNCTION
    var getLvl = function() {
      $("#numLVL").text(playerData["lvl"])
    }
    //GET AP FUNCTION
    var getAp = function (phase) {
      if (phase === "prep") {
      playerData["ap"] = playerData["ap"] + 1
      }
      $("#numAP").text(playerData["ap"])
    }
    var consumeItem = function(item) {
      playerDataLoot[item]["qt"] = playerDataLoot[item]["qt"] - 1
      if (playerDataLoot[item]["qt"] < 1) {
        delete playerDataLoot[item]
      }
    }
    // GET LOOT FUNCTION
    var getLoot = function(divId, buttonClass) {
      var getLootKeys = function(){
        return Object.keys(playerDataLoot)
      }
      var lootArr = getLootKeys()
      $(divId).empty()
      for (let i of lootArr) {
        $(divId).append(`<button class=${buttonClass}>${i}</button>`)
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
    getLoot("#playerLootDisplay", "items")
    getAp("prep");



    // PREP PHASE BUTTONS
    // GET LOOT FUNCTION
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


    var resetToPrepPhase = function() {
      $(".vs").css("visibility", "hidden")
      $("#enemyBox").css("visibility", "hidden")
      $("#attackButton").css("visibility", "hidden")
      $("#runButton").css("visibility", "hidden")
      $(".prepButtons").css("visibility", "visible")
    }
  //GENERATE ENEMY FUNCTION
   var generateEnemy = function(enemyNameSource, enemyLvlSource) {
        var enemyNameArr = Object.keys(enemyNameSource)
        var enemyLvlArr = Object.keys(enemyLvlSource)
        var nameNum = enemyNameArr.length
        var lvlNum = enemyLvlArr.length
        function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
        }
        var nameIndex = getRandomInt(nameNum)
        var lvlIndex = getRandomInt(lvlNum)
        var currentEnemyName = enemyNameArr[nameIndex]
        var currentEnemyLvl = enemyLvlArr[lvlIndex]
        return [currentEnemyName, currentEnemyLvl]
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
      getLoot("#playerLootDisplay", "items")
      getAp()
      } else {
        alert("You do not have enough Action Points to search for loot right now \n \n \n*hint* Win fights to earn more AP")
      }
    });
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
    });
  // FIGHT BUTTON
    $("#fightButton").click(function(){
      alert("CHAMPION, \n \n \nFace your challenger")
   //ENEMY GENERATOR FUNCTION
      var newEnemy = generateEnemy(potentialEnemyNames, potentialEnemyLvls)
      var storeCurrentEnemy = {"name":newEnemy[0],"enemyQuote":potentialEnemyNames[newEnemy[0]],"lvl":newEnemy[1],"hp":potentialEnemyLvls[newEnemy[1]]}
      createItem("currentEnemy", JSON.stringify(storeCurrentEnemy))
      $("#enemyNameInfoBox").text(newEnemy[0])
      $("#enemyQuote").text(potentialEnemyNames[newEnemy[0]])
      $("#enemyNumLvl").text(newEnemy[1])
      $("#enemyNumHP").text(potentialEnemyLvls[newEnemy[1]])
      $(".vs").css("visibility", "visible")
      $("#enemyBox").css("visibility", "visible")
      $(".playerBattleButtons").css("visibility", "visible")
      $(".prepButtons").css("visibility", "hidden")
      enemyData = JSON.parse(getItem("currentEnemy"))
    })
    //BATTLE PHASE BUTTONS
    //ATTACK BUTTON
    $("#attackButton").click(function(){
      var dmg = 0;
      var playerAttack = function(){
        if (Number(playerData["lvl"]) > Number(enemyData["lvl"])) {
          dmg = (Number(playerData["lvl"]) + Number(enemyData["lvl"])) * 2
        }
        else if (Number(playerData["lvl"]) === Number(enemyData["lvl"])) {
          dmg = (Number(playerData["lvl"]) + Number(enemyData["lvl"]))
        }
        else {
          dmg = 2
        }
        alert("You dealt " + dmg +" damage")
        enemyData["hp"] = enemyData["hp"] - dmg
        getEnemyHp()
      }
      playerAttack()
      if (enemyData["hp"] < 1) {
        alert("You have slain an enemy!")
        playerData["triumphs"] = Number(playerData["triumphs"]) + 1
        deleteItem("currentEnemy")
        resetToPrepPhase()
        getAp("prep")
        getTriumphs()
      } else {
        enemyAttack()
        if (playerData["hp"] < 1) {
          gameOver()
        }
      }
    })
    //USE ITEM BUTTON
    $("#useItemButton").click(function(){
      if (Object.keys(playerData["loot"]).length < 1) {
        alert("You don\'t have any items")
      } else {
        getLoot("#storeItems", "battleItems")
        openMenu("useItem")
        var battleItemAlert = function(itemType) {
            alert(playerDataLoot[itemType]["desc"])
        }
        $(".battleItems").click(function() {
          //USE ITEM IN AND OUT OF BATTLE FUNCTIONS
            var continueCombat = function(){
              if (enemyData["hp"] < 1) {
                alert("You have slain an enemy!")
                playerData["triumphs"] = Number(playerData["triumphs"]) + 1
                deleteItem("currentEnemy")
                resetToPrepPhase()
                getAp("prep")
                getTriumphs()
              } else {
                enemyAttack()
                if (playerData["hp"] < 1) {
                  gameOver()
                }
              }
            }
            var initiateUseItemAlerts = function(itemName) {
              battleItemAlert(itemName)
              consumeItem(itemName)
              getLoot("#storeItems", "battleItems")
              getLoot("#playerLootDisplay", "items")
            }
            var battleItemEffect = function(item) {
              if (item === "potion"){
                playerData["hp"] = 10
                getHp()
                initiateUseItemAlerts(clickedItem)
              }
              else if (item === "boots") {
                if (getItem("currentEnemy")){
                  initiateUseItemAlerts(clickedItem)
                  alert("You escape unscathed")
                  deleteItem("currentEnemy")
                  resetToPrepPhase()
                } else {
                  alert("You could run fast in these!")
                }
              }
              else if (item === "wand") {
                if (getItem("currentEnemy")){
                enemyData["hp"] = enemyData["hp"] - 5
                getEnemyHp()
                initiateUseItemAlerts(clickedItem)
                continueCombat()
                } else {
                  alert("Save this item for combat")
                }
              }
              else if (item === "fairy") {
                if (getItem("currentEnemy")){
                  initiateUseItemAlerts(clickedItem)
                  enemyData["hp"] = 0
                  getEnemyHp()
                  alert("The fairy leaps from your hand and smights your enemy")
                  continueCombat()
                } else {
                  alert("A mysterious little creature")
                }             
              }
              else if (item === "book") {
                playerData["ap"] = playerData["ap"] + 3
                getAp()
                initiateUseItemAlerts(clickedItem)
                if (getItem("currentEnemy")){
                  continueCombat()
                }              
              }
              else if (item === "lint") {
              initiateUseItemAlerts(clickedItem)  
                if (getItem("currentEnemy")){
                  continueCombat()
                }                     
              }
            }
            var clickedItem = $(this).text()
            closeMenu("useItem")
            battleItemEffect(clickedItem)
        })
      }
    })
    $("#runButton").click(function(){
        var runRollDice = rollDice(2)
        if (runRollDice === 0)  {
          alert("You escape unscathed")
          deleteItem("currentEnemy")
          resetToPrepPhase()
        } else {
          alert("You turn to flee, \n \n \nbut your enemy is too fast")
          enemyAttack()
          if (playerData["hp"] < 1) {
          gameOver()
          }
        }    
    })




  var enemyAttack = function() {
      if (Number(playerData["lvl"]) < Number(enemyData["lvl"])) {
        dmg = Number(playerData["lvl"]) * 2
      }
      else if (Number(playerData["lvl"]) === Number(enemyData["lvl"])) {
        dmg = Number(playerData["lvl"]) + 1
      }
      else {
        dmg = 1
      } 
      alert(enemyData["name"] + " dealt " + dmg +" damage")
      playerData["hp"] = playerData["hp"] - dmg
      getHp()
  }

    // $("#numHP").text(playerData["hp"])
  }
  var currentPlayerObj = function(currentPlayer) {
      return JSON.parse(window.localStorage[currentPlayer])
  }
  ///////////////////////////////////////////
  //event handlers for the buttons and ... possibly the inputboxes
    //preventdefault on button clicks
  $(document).ready(function() {
    // OPEN PLAYER SELECT ON START:
    openMenu("playerSelect")
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
          closeMenu("playerSelect")
          //trigger prep phase
          launchGame(playerName, "prep")
      }
    }) 
});
    // $('#createButton').click(function(event) {
    //   event.preventDefault();

    //   var currentKey = $("#keyInput").val();
    //   var currentValue = $("#valueInput").val();
    //   if (keyExists(currentKey)) {
    //     //current key exists, do something error-handle-y
    //   } else {
    //     createItem(currentKey, currentValue);
    //   }
    // });

    // $('#updateButton').click(function(event) {
    //   event.preventDefault();

    //   var currentKey = $("#keyInput").val();
    //   var currentValue = $("#valueInput").val();
    //   if (keyExists(currentKey)) {
    //     updateItem(currentKey, currentValue);
    //   } else {
    //     //current key doesnt exist, do stuff
    //   }
    // });

