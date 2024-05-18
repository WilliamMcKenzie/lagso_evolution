function showAlert(message){
  if(!document.getElementById("alert").classList.contains("hidden") && message == document.getElementById("alert_text").innerHTML) hideAlert()
  else {
      document.getElementById("alert").classList.remove("hidden")
      document.getElementById("alert_text").innerHTML = message
  }
}
function hideAlert(){
  document.getElementById("alert").classList.add("hidden")
}

var settings1HTML = `<div class="flex justify-center items-center">
        <h3 id="model_title" class="font-bold text-lg">Petri Parameters</h3>
        <div class="ml-auto join">
          <input onchange='swapSettingsPage(1)' class="join-item btn btn-square" type="radio" name="options" aria-label="1" checked />
          <input onchange='swapSettingsPage(2)' class="join-item btn btn-square" type="radio" name="options" aria-label="2" />
        </div>
      </div>
      
      <label class="input input-bordered flex items-center gap-2">
        Creature Density:
        <input id="creature_density" type="text" class="grow" placeholder="0.01" />
        <button onclick="showAlert('Creature Density is the chance for a creature to grow from a food.')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
        </button>
      </label>
      <label class="input input-bordered flex items-center gap-2">
        AI Complexity:
        <input id="ai_complexity" type="text" class="grow" placeholder="3" />
        <button onclick="showAlert('AI Complexity is the length of the ai string.')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
        </button>
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Reproduction Energy:
        <input id="reproduction_energy" type="text" class="grow" placeholder="100" />
        <button onclick="showAlert('Reproduction Energy is the amount of energy removed from a creature when reproducing.')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </button>
        </label>
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Food Density:
        <input id="food_density" type="text" class="grow" placeholder="0.5" />
        <button onclick="showAlert('Food Density is the chance for a food to appear on a tile.'')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </button>
        </label>
      </label>
      <label class="input input-bordered flex items-center gap-2">
        Food Nutrients:
        <input id="food_nutrients" type="text" class="grow" placeholder="50" />
        <button onclick="showAlert('Food Nutrients is the amount of energy gained from a food.')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </button>
        </label>
      </label>`
var settings2HTML = `<div class="flex justify-center items-center">
        <h3 id="model_title" class="font-bold text-lg">Creature AI</h3>
        <div class="ml-auto join">
          <input onchange='swapSettingsPage(1)' class="join-item btn btn-square" type="radio" name="options" aria-label="1" />
          <input onchange='swapSettingsPage(2)' class="join-item btn btn-square" type="radio" name="options" aria-label="2" checked/>
        </div>
      </div>
      
      <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Character</th>
        <th>Function</th>
        <th>Energy Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-base-200">
        <th><input id="m_checkbox" type="checkbox" checked="checked" class="checkbox checkbox-primary" /></th>
        <td>m</td>
        <td>Move forwards</td>
        <td><input id="move_cost" type="number" placeholder="10" value="10" class="input w-full max-w-xs" /></td>
      </tr>
      <tr class="bg-base-200">
        <th><input id="l_checkbox" type="checkbox" checked="checked" class="checkbox checkbox-primary" /></th>
        <td>l</td>
        <td>Turn left</td>
        <td><input id="left_cost" type="number" placeholder="5" value="5" class="input w-full max-w-xs" /></td>
      </tr>
      <tr class="bg-base-200">
        <th><input id="r_checkbox" type="checkbox" checked="checked" class="checkbox checkbox-primary" /></th>
        <td>r</td>
        <td>Turn right</td>
        <td><input id="right_cost" type="number" placeholder="5" value="5" class="input w-full max-w-xs" /></td>
      </tr>
      <tr class="bg-base-200">
        <th><input id="s_checkbox" type="checkbox" checked="checked" class="checkbox checkbox-primary" /></th>
        <td>s</td>
        <td>Sleep</td>
        <td><input id="sleep_cost" type="number" placeholder="3" value="3" class="input w-full max-w-xs" /></td>
      </tr>
    </tbody>
  </table>
</div>`

function swapSettingsPage(num){
  var settingsContainer = document.getElementById("settings_container")

  if(num == 1){
    settingsContainer.innerHTML = settings1HTML
    activeSettings = 1
  }
  else {
    settingsContainer.innerHTML = settings2HTML
    activeSettings = 2
  }

  setInputUpdater()
}

function setInputUpdater(){
  // Make sure to update petri in real time
  var inputList = document.querySelectorAll(".input, .checkbox")

  for(input of inputList){
    input.onchange = function(){
      updatePetriInfo()
    }
  }
}
swapSettingsPage(1)