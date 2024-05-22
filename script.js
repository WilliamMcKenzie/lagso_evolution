// # m - move
// # l - turn right
// # r - turn left
// # s - sleep
// # f - food (conditional, ex f(m))

// Global variables
var brush = "c"
var stopSignal = false

// Petri attributes
var creature_density = 0.01
var food_density = 0.1
var food_nutrients = 50
var petriSpeed = 1

// Creature attributes
var reproduction_energy = 100
var ai_complexity = 3

// General creature objects
var ai_instructions_costs = {
  "m" : 10,
  "l" : 5,
  "r" : 5,
  "s" : 3
}
var ai_instructions = ["m", "l", "r", "s"]
var direction_vectors = {"N": [-1, 0], "E": [0, 1], "S": [1, 0], "W": [0, -1]}
var directional_relations = {
    "N": ["E", "W"],
    "E": ["S", "N"],
    "S": ["W", "E"],
    "W": ["N", "S"]
}
var directions = ["N", "S", "E", "W"]
var creature_icons = {"N": "⬆️ ", "E": "➡️ ", "S": "⬇️ ", "W": "⬅️ "}

// Class helper functions
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function generate_ai(complexity){
   var stack = ""
   for(var j = 0; j < complexity; j++) stack += choose(ai_instructions)
   return stack
}

// Mutate a creatures ai string
function mutate(energy, orientation, ai, mem_1, y, x, reproduction_energy){
  var seed = getRandomBetween(8, 12) / 10
  var newai = ai

  for(var i = 0; i < newai.length; i++){
    var aiseed = getRandomBetween(8,10.5) / 10  
    if(newai[i] == "f" && aiseed > 1){
      continue;
    }
    else if(aiseed > 1){
      newai = newai.replaceAt(i, choose(ai_instructions))
    }
  }
  return new Creature(energy, orientation, newai, mem_1, y, x, reproduction_energy * seed, 1)
}

// Classes

// Tile

class Tile {
  constructor() {

  }
}
Tile.prototype.toString = function tileToString() {
  return `tile`;
};

// Food

class Food {
  constructor(n) {
    this.nutrients = n
  }
}
Food.prototype.toString = function foodToString() {
  return `food`;
};

// Creature

class Creature {
  constructor(energy, orientation, ai, mem_1, y, x, reproduction_energy, checked) {
      this.self = self;
      this.energy = energy;
      this.orientation = orientation;
      this.ai = ai;
      this.mem_1 = mem_1;
      this.y = y;
      this.x = x;
      this.reproduction_energy = reproduction_energy;

    // To make sure we dont loop over the same crature twice
      this.checked = checked;
  }

  ai_step(petri){
    
    if(this.checked == 1){
      return
    }
    this.checked = 1
    this.mem_1 += 1
    if(this.mem_1 >= this.ai.length){
      this.mem_1 = 0
    }
    var task = this.ai[this.mem_1]
    switch(task){
        case "m":
            this.energy -= ai_instructions_costs["m"]
            this.move(petri)
            break;
        case "l":
            this.energy -= ai_instructions_costs["l"]
            this.turn("l")
            break;
        case "r":
            this.energy -= ai_instructions_costs["r"]
            this.turn("r")
            break;
        case "s":
            this.energy -= ai_instructions_costs["s"]
            break;
    }
    // if(task == "f" && this.checkNextTile(petri) == "f"){
    //   var nextTask = this.ai[this.mem_1+1]
    //   this.mem_1 += 1
    //   switch(nextTask){
    //       case "m":
    //           this.energy -= 10
    //           this.move(petri)
    //       case "l":
    //           this.energy -= 5
    //           this.turn("l")
    //       case "r":
    //           this.energy -= 5
    //           this.turn("r")
    //       case "s":
    //           this.energy -= 5
    //   }
    // }
    // else if(task == "f"){
    //   this.energy -= 5
    //   this.mem_1 += 1
    //   if(this.mem_1 >= this.ai.length){
    //     this.mem_1 = 0
    //   }
    // }
    if(this.energy < 1){
      this.kill(petri)
      return
    }
  }

  turn(petri){
    if(this.ai[this.mem_1] == "r"){
      this.orientation = directional_relations[this.orientation][0]
    }
    else if(this.ai[this.mem_1] == "l"){
      this.orientation = directional_relations[this.orientation][1]
    }
  }

  checkNextTile(petri){
    var _y = this.y + direction_vectors[this.orientation][0]
    var _x = this.x + direction_vectors[this.orientation][1]

    try {
      if(petri.grid[_y][_x] instanceof Creature){
        return "c"
      }
      if(petri.grid[_y][_x] instanceof Food){
        return "f"
      }
      if(petri.grid[_y][_x] instanceof Tile){
        return "t"
      }
    }
    catch(error){
        return "t"
    }
  }

  move(petri){
    var _y = this.y + direction_vectors[this.orientation][0]
    var _x = this.x + direction_vectors[this.orientation][1]

    try {
      if(petri.grid[_y][_x] instanceof Creature) return

      if(_y < 0 || _x < 0 || _y > petri.grid.length || _x > petri.grid[_y].length){
        return
      }

      var isfood = petri.grid[_y][_x] instanceof Food
      var istile = petri.grid[_y][_x] instanceof Tile

      if(istile || isfood){
        if(isfood) this.energy += petri.grid[_y][_x].nutrients
        petri.grid[_y][_x] = this
        petri.grid[this.y][this.x] = this.reproduce(petri.grid, this.y, this.x)
        this.y = _y
        this.x = _x
      }
    }
    catch(error){
    }
  }

  kill(petri){
    petri.grid[this.y][this.x] = new Food(food_nutrients)
    return petri
  }

  reproduce(grid, y, x){
    if(this.energy/2 < this.reproduction_energy) return new Tile()
    this.energy -= this.reproduction_energy
    return mutate(this.reproduction_energy, choose(directions), this.ai, 0, y, x, this.reproduction_energy)
  }
}

Creature.prototype.toString = function creatureToString() {
  return this.orientation
};

// Petri

class Petri {
  constructor(x_width, y_width, age){
    this.x_width = x_width
    this.y_width = y_width
    this.age = age

    var grid = []
    for(var i = 0; i < y_width; i++){
      grid[i] = []
      for(var k = 0; k < x_width; k++){
        grid[i][k] = new Tile()
      }
    }
    this.grid = grid
    this.commonAI = ("", -1)
  }

  fillUpPetriDish(creature_density, food_density, nutrient_density){
    for(var y = 0; y < this.y_width; y++){
      for(var x = 0; x < this.x_width; x++){
        if(Math.random() < food_density){
          this.grid[y][x] = new Food(nutrient_density)
          if(Math.random() < creature_density){
            this.grid[y][x] = new Creature(100, choose(directions), generate_ai(ai_complexity), 0, y, x, 100, 0)
          }
        }
      }
    }
    this.grid[0][0] = new Creature(100, choose(directions), generate_ai(ai_complexity), 0, 0, 0, reproduction_energy, 0)
  }

  petriStep(){
    console.log(food_density)
    for(var y = 0; y < this.y_width; y++){
      for(var x = 0; x < this.x_width; x++){
        if(this.grid[y][x] instanceof Creature){
          this.grid[y][x].checked = 0
        }
        else if(this.grid[y][x] instanceof Tile){
          if(Math.random() < food_density){
            this.grid[y][x] = new Food(food_nutrients)
          }
        }
        else if(this.grid[y][x] instanceof Food){
          if(Math.random() < creature_density){
            this.grid[y][x] = new Creature(100, choose(directions), generate_ai(ai_complexity), 0, y, x, reproduction_energy, 0)
          }
        }
      }
    }
  }

  countCreatures(){
    this.commonAI = ["NA", -1]
    var aiCounts = {}
    for(var y = 0; y < this.y_width; y++){
      for(var x = 0; x < this.x_width; x++){
        if(this.grid[y][x] instanceof Creature){
          var ai = this.grid[y][x].ai

          if(ai in aiCounts){
            aiCounts[ai] = aiCounts[ai] + 1
            if(aiCounts[ai] > this.commonAI[1]){
              this.commonAI = [ai, aiCounts[ai]]
            }
          }
          else {
            aiCounts[ai] = 1
            if(this.commonAI[1] < 1){
              this.commonAI = [ai, 1]
            }
          }
        }
      }
    }
    // display creature leaderboard in table
    renderTable(aiCounts, this.y_width)
    return this.commonAI
  }

  async run(steps, speed, render){
    for(var k = 0; k < steps; k++){
      if(stopSignal){
        stopSignal = false;
        break;
      }
      this.commonAI = ["NA", -1]
      this.petriStep()
      for(var y = 0; y < this.y_width; y++){
        for(var x = 0; x < this.x_width; x++){
          if(this.grid[y][x] instanceof Creature){
            this.grid[y][x].ai_step(this)
          }
        }
      }
      if(render){
        this.countCreatures()
        renderPetri(this)
      }
      if(stopSignal){
        stopSignal = false;
        break;
      }
      else await sleep(speed/petriSpeed)
    }
  }
}
Petri.prototype.toString = function petriToString() {
  var stack = ``
  for(var i = 0; i < this.y_width; i++){
    stack += this.grid[i].toString()
    stack += `
    `
  }
  stack += this.countCreatures()  
  return stack
};

// Functional Code

var petri = new Petri(5, 5, 0)

function renderPetri(petriRef){
  var grid = document.getElementById("grid")
  grid.innerHTML = ``
  
  for(var y = 0; y < petriRef.y_width; y++){
    var gridRow = `<div class="grid_row">`
    for(var x = 0; x < petriRef.x_width; x++){
      gridRow += `<button onclick="placeSelection(${y}, ${x})" class="btn"><img src="images/${petriRef.grid[y][x].toString()}.png"></button>`
    }
    gridRow += `</div>`
    grid.innerHTML += gridRow
  }
}
function renderTable(aiCounts, rows){
  var tableEle = document.getElementById("ai_leaderboard")
  var tableBody = ``
  var aiArr = []
  tableEle.innerHTML = ``

  for (var ai in aiCounts) {
    aiArr.push({ai: ai, count: aiCounts[ai]})
  }
  aiArr.sort((a, b) => (a.count - b.count))
  aiArr.reverse()

  var i = 0
  for (var i = 0; i < Math.min(aiArr.length, Math.floor(parseInt(rows)*1.5)); i++) {
    tableBody += 
            `<tr>
              <th>${i+1}</th>
              <td>${aiArr[i].ai}</td>
              <td>${aiArr[i].count}</td>
            </tr>`
  }

  tableEle.innerHTML = tableBody
}

var activeSettings = 1

var max_x = Math.floor(window.screen.width*(12/1500))
var max_y = Math.floor(window.screen.height*(12/1500))

// Make sure to update petri in real time
var inputList = document.querySelectorAll(".input")

for(input of inputList){
  input.onchange = function(){
    updatePetriInfo()
  }
}

function isNumeric(n){
  if(isNaN(n)) return false
  if(n.replaceAll(" ") == "") return false
  return true
}
function testValidity(val, alt){
  return isNumeric(val) ? parseFloat(val) : alt
}

function updatePetriInfo(){
  if(activeSettings == 1){
    // Petri attributes inputs
    var creatureDensityEle = document.getElementById("creature_density")
    var aiComplexityEle = document.getElementById("ai_complexity")
    var foodDensityEle = document.getElementById("food_density")
    var foodNutrientsEle = document.getElementById("food_nutrients")
    var reproductionEle = document.getElementById("reproduction_energy")

    // Assign base petri params
    creature_density = testValidity(creatureDensityEle.value, 0.01)
    ai_complexity = testValidity(aiComplexityEle.value, 3)
    food_density = testValidity(foodDensityEle.value, 0.5)
    food_nutrients = testValidity(foodNutrientsEle.value, 100)
    reproduction_energy = testValidity(reproductionEle.value, 100)
  }

  if(activeSettings == 2){
    // Creature moves inputs
    var moveActive = document.getElementById("m_checkbox").checked
    var moveCost = document.getElementById("move_cost").value

    var leftActive = document.getElementById("l_checkbox").checked
    var leftCost = document.getElementById("left_cost").value

    var rightActive = document.getElementById("r_checkbox").checked
    var rightCost = document.getElementById("right_cost").value

    var sleepActive = document.getElementById("s_checkbox").checked
    var sleepCost = document.getElementById("sleep_cost").value

    // Assign creature moves their respective energy costs
    var possibleInstructions = ["m", "l", "r", "s"]
    var isActive = {
      "m": moveActive,
      "l": leftActive,
      "r": rightActive,
      "s": sleepActive
    }
    ai_instructions_costs = {
      "m": moveCost,
      "l": leftCost,
      "r": rightCost,
      "s": sleepCost
    }
    var res = []

    for(var instruction of possibleInstructions){
      if(isActive[instruction]){
        res.push(instruction)
      }
    }

    ai_instructions = res
  }
}

function runSimulator(){
  var runButton = document.getElementById("run_button")
  runButton.innerHTML = "Stop"
  runButton.classList.add("btn-error")
  runButton.classList.remove("btn-success")
  runButton.onclick = function() { stopSimulator(runSimulator) }
  
  var dimensions = document.getElementById("dimensions").value.includes("x") ? document.getElementById("dimensions").value.split("x") : [5,5]
  // Check for max dimensions
  if(dimensions[0] > max_x) dimensions[0] = max_x
  if(dimensions[1] > max_y) dimensions[1] = max_y
  
  // petri.fillUpPetriDish(creature_density, food_density, food_nutrients)
  if (petri.grid.length != dimensions[1] || petri.grid[0].length != dimensions[0]) petri = new Petri(dimensions[0], dimensions[1], 0)
  petri.run(Infinity, 1000, true)
}

// When either user stops or petri stops
function stopSimulator(runSimulator){
  var runButton = document.getElementById("run_button")
  stopSignal = true
  
  runButton.innerHTML = "Run"
  runButton.classList.remove("btn-error")
  runButton.classList.add("btn-success")
  runButton.onclick = function() { runSimulator() }
}

// To speed up the petri
function fastForward(){
  var buttonEle = document.getElementById("fast_forward")
  if(buttonEle.classList.contains("btn-accent")){
    buttonEle.classList.add("btn-primary")
    buttonEle.classList.remove("btn-accent")
    petriSpeed = 2
  }
  else if(buttonEle.classList.contains("btn-primary")){
    buttonEle.classList.add("btn-secondary")
    buttonEle.classList.remove("btn-primary")
    petriSpeed = 4
  }
  else if(buttonEle.classList.contains("btn-secondary")){
    buttonEle.classList.add("btn-accent")
    buttonEle.classList.remove("btn-secondary")
    petriSpeed = 100000
  }
}

// To change what creature you will place down
function selectBrush(selection){
  brush = selection
  document.querySelector(".selected").classList.remove("selected")
  document.getElementById(`${brush}_selector`).classList.add("selected")
}
// To place it down
function placeSelection(y, x){
  
  if(brush == "c"){
    petri.grid[y][x] = new Creature(100, choose(directions), generate_ai(ai_complexity), 0, y, x, reproduction_energy, 0)
  }
  if(brush == "t"){
    petri.grid[y][x] = new Tile()
  }

  if(brush == "f"){
    petri.grid[y][x] = new Food()
  }

  renderPetri(petri)
  petri.countCreatures()
}