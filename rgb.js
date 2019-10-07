var gameBoxes = document.querySelectorAll('.gamebox')
var spanChosenColor = document.querySelectorAll('.colornumber')
var newColors = document.getElementById('newcolors')
var navEasy = document.getElementById('naveasy')
var navHard = document.getElementById('navhard')
var hardBoxes = document.querySelectorAll('.hard')
var header = document.getElementById('header')
var disclaimer = document.getElementById('disclaimer')
var gameover = false
var difficulty = 6
var chosenBox= restartGame(gameDifficulty(difficulty))

newColors.addEventListener('click', function(){
	chosenBox = restartGame(difficulty)
})

navEasy.addEventListener('click', function(){
	difficulty = 3
	chosenBox = restartGame(gameDifficulty(difficulty))
})

navHard.addEventListener('click', function(){
	difficulty = 6
	chosenBox = restartGame(gameDifficulty(difficulty))
})

for (var i = 0; i < gameBoxes.length; i++){
	gameBoxes[i].addEventListener('click',function(){
		if(this.id !== chosenBox && !gameover){
			this.style.background = 'black'
			this.style.transition = 'all 1s'
			disclaimer.textContent = "Try Again!"
		}
		else if(this.id === chosenBox && !gameover) {
			disclaimer.textContent = "CORRECT"
			newColors.textContent = "PLAY AGAIN?"
			for (var i = 0; i < gameBoxes.length; i++){
				gameBoxes[i].style.background = this.style.background
				this.style.transition = 'none'
			}
			header.classList.remove("bg-primary")
			header.style.background = this.style.background

			gameover = true
			newColors.classList.add('text-white')
			newColors.classList.add('bg-primary')
		}
	})
}

function gameDifficulty(difficulty){
	if(difficulty === 3){
		navEasy.classList.remove('text-primary')
		navEasy.classList.add('text-white')
		navEasy.classList.add('bg-primary')
		navHard.classList.add('text-primary')
		navHard.classList.remove('text-white')
		navHard.classList.add('bg-primary')
		navHard.classList.remove('bg-primary')
		for (var i = 0; i < 3; i++){
			hardBoxes[i].classList.add('easy-hide')
		}
		return 3
	}
	else if(difficulty === 6){
		navHard.classList.remove('text-primary')
		navHard.classList.add('text-white')
		navHard.classList.add('bg-primary')
		navEasy.classList.add('text-primary')
		navEasy.classList.remove('text-white')
		navEasy.classList.add('bg-primary')
		navEasy.classList.remove('bg-primary')
		for (var i = 0; i < 3; i++){
			hardBoxes[i].classList.remove('easy-hide')
		}
		return 6
	}
}

function generateColors(sets){
	results = []
	for(var i=1; i <= sets; i++){
		var color = generateColor()
		while(results.indexOf(color) !== -1){
			color = generateColor()
		}
		results.push(color)
	}
	return results
}

function generateColor(){
	return [Math.floor(Math.random() * 256),
			Math.floor(Math.random() * 256),
			Math.floor(Math.random() * 256)]
}

function restartGame(boxes){
	gameover = false
	if(!header.classList.contains("bg-primary")){
		header.classList.add("bg-primary")
	}
	var gameColors = generateColors(boxes)
	var chosenBox = Math.floor(Math.random() * boxes)
	var chosenColor = gameColors[chosenBox]
	disclaimer.textContent = ""
	newColors.textContent = "NEW COLORS"
	newColors.classList.remove('text-white')
	newColors.classList.remove('bg-primary')
	for(var i = 0; i <=2; i++){
		spanChosenColor[i].textContent = chosenColor[i]
	}
	for(var i = 0; i < boxes; i++){
		gameBoxes[i].style.background = 'rgb('+gameColors[i][0] 
				+ ',' + gameColors[i][1] +',' + gameColors[i][2]
				+ ')'
	}
	return 'sq'+String(chosenBox+1)
}