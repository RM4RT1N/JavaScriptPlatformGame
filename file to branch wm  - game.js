const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5
const winReq = 22500

class Player {
	constructor() {
			this.speed = 10
			this.position = {
				x: 100,
				y: 300			
			}
		this.velocity = {
			x: 0,
			y: 1
		}
		this.width = 110
		this.height = 157

		this.image = createImage(spriteStandRight)
		this.frames = 0
		this.sprites = {
			stand: {
				right: createImage(spriteStandRight),
				left: createImage(spriteStandLeft),
			},
			run: {
				right: createImage(spriteRunRight),
				left: createImage(spriteRunLeft)
			}
		}

		this.currentSprite = this.sprites.stand.right
		this.currentCropWidth = 353
		this.leftOffset = 263
	}

	draw() {
		context.drawImage(
			this.currentSprite,
			(this.currentCropWidth+this.leftOffset)*this.frames,
			25,
			this.currentCropWidth,
			470,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		)
	}

	update() {
		this.frames++
		if(this.frames > 29) this.frames = 0
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + 
			this.velocity.y <= canvas.height)
			this.velocity.y += gravity
		//else this.velocity.y = 0
		// console.log("x",scrollOffset)
		// console.log("y",this.position.y)
	}
}

class Enemy {
	constructor(x, y) {
		this.position = {
			x,
			y		
		}
		this.velocity = {
			x: -0.5,
			y: 1
		}
		this.width = 80
		this.height = 80

		this.image = createImage(enemyRunLeft)
		this.frames = 0
		this.sprites = {
				right: createImage(enemyRunRight),
				left: createImage(enemyRunLeft)
		}
		

		this.currentSprite = this.sprites.left
		this.currentCropWidth = 225

		this.lives = 1
	}

	draw() {
		context.drawImage(
			this.image,
			// this.currentCropWidth*this.frames,
			// 0,
			// this.currentCropWidth,
			// 0,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		)
		//console.log("blahaj-draw")

	}

	update() {
		this.frames++
		if(this.frames > 2) this.frames = 0
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		if (this.position.y+this.height+this.velocity.y <= canvas.height)
            this.velocity.y += gravity

	}
}


class Platform {
	constructor({x, y, image}){
		this.position = {
			x,
			y
		}
		this.image = image
		this.width = image.width
		this.height = image.height
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y)
	}

}

class GenericObject {
	constructor({x, y, image}){
		this.position = {
			x,
			y
		}
		this.image = image
		this.width = image.width
		this.height = image.height
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y)
	}

}

let platform = '/img/platform.png'
let background = '/img/background.png'
let hills = '/img/hills.png'
let platformSmallTall = '/img/platformSmallTall.png'
let platformSmallShort = '/img/platformSmallShort.png'

let spriteRunLeft = '/img/spriteRunLeft.png'
let spriteRunRight = '/img/spriteRunRight.png'
let spriteStandLeft = '/img/spriteStandLeft.png'
let spriteStandRight = '/img/spriteStandRight.png'
let blahajSprite = '/img/blahajSprite.png'

let enemyRunLeft = '/img/enemyRunLeft.png'
let enemyRunRight = '/img/enemyRunRight.png'


function createImage(imageSrc){
	const image = new Image()
	image.src = imageSrc
	console.log(image.src)
	return image
}

let player = new Player()
let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let platformSmallShortImage = createImage(platformSmallShort)

let enemyRunLeftImage = createImage(enemyRunLeft)
let enemyRunRightImage = createImage(enemyRunRight)

let platforms = []
let genericObjects = []
let enemies = []

let keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	}
}

let scrollOffset = 0
let shownLoseAlert = false
let shownWinAlert = false
let blahajCollected = false

function init(){
player = new Player()
enemies = []
enemies.push(new Enemy(300,100))
enemies.push(new Enemy(1600,50))

platforms = [
	//new Platform({x: 360, y: 240, image: enemyRunLeftImage}),
	new Platform({x: platformSmallTallImage.width * 5 + 180, y: 420, image: platformSmallTallImage}),
	new Platform({x: -1, y: 520, image: platformImage}),
	new Platform({x: platformImage.width-4, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 2 + 200, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 3 + 550, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 4 + 550, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 6 + 150, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 7 + 280, y: 410, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 7 + 320, y: 180, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 8 + 120, y: 320, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 8 + 180, y: 150, image: platformImage}),
	new Platform({x: platformImage.width * 10 + 0, y: 550, image: platformImage}),
	new Platform({x: platformImage.width * 11 + 50, y: 420, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 12 - 100, y: 290, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 13 - 220, y: 170, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 13 - 220, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 14 - 220, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 15 - 160, y: 400, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 16 - 300, y: 270, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 17 - 380, y: 140, image: platformImage}),
	new Platform({x: platformImage.width * 17 + 270, y: 450, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 17 - 380, y: 520, image: platformImage}),
	new Platform({x: platformImage.width * 18, y: 410, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 18 + 200, y: 510, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 19 - 90, y: 310, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 20 + 150, y: 290, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 20 , y: 350, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 20 + platformSmallTallImage.width - 2, y: 350, image: platformSmallTallImage}),
	new Platform({x: platformImage.width * 19 + 480, y: 410, image: platformSmallShortImage}),
	//blahaj collected
	new Platform({x: platformImage.width * 21 - 1, y: 550, image: platformImage}),
	new Platform({x: platformImage.width * 22 + 140, y: 500, image: platformImage}),
	new Platform({x: platformImage.width * 23 + 280, y: 460, image: platformImage}),
	new Platform({x: platformImage.width * 24 + 420, y: 330, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 24, y: 200, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 24 + 420, y: 90, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 25 + 250, y: 100, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 26, y: 200, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 26, y: 350, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 26, y: 500, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 26 - platformSmallShortImage.width/2, y: 500, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 27 - 150, y: 250, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 27 - 150, y: 400, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 28 - 150, y: 325, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 29 - 150, y: 325, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 29, y: 325, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 30 - 100, y: 210, image: platformSmallShortImage}),
	new Platform({x: platformImage.width * 30 - 100, y: 510, image: platformImage}),

	new Platform({x: platformImage.width * 20 + 250, y: 130, image: createImage(blahajSprite)}),
]
genericObjects = [
	new GenericObject({x: -1, y: -1, image: createImage(background)}),
	new GenericObject({x: -1, y: -1, image: createImage(hills)})
]

keys = {
	right: {
		pressed: false
	},
	left: {
		pressed: false
	}
}

scrollOffset = 0
shownLoseAlert = false
shownWinAlert = false
blahajCollected = false
}

function animate(){
	requestAnimationFrame(animate)
	context.fillStyle = 'white'
	context.fillRect(0,0,canvas.width,canvas.height)
	//console.log("x",player.position.x)
	//console.log("y",player.position.y)
	enemies.forEach(Enemy => {
		console.log(Enemy.position.x,Enemy.position.y)
	
	})
	console.log(player.position.x,player.position.y)
	genericObjects.forEach(GenericObject =>{
		GenericObject.draw()
	})
	platforms.forEach(Platform => {
		Platform.draw()
	})
	enemies.forEach(enemy => {
		enemy.update()
	})
	
	player.update()
	
	if (keys.right.pressed && player.position.x < 400) {
		player.velocity.x = player.speed
	} else if ((keys.left.pressed && player.position.x > 100)
		|| (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
		player.velocity.x = -player.speed
	} else {
		player.velocity.x = 0

		if (keys.right.pressed && scrollOffset < winReq) {
			scrollOffset += player.speed
			platforms.forEach((Platform) => {
				Platform.position.x -= player.speed
			})
			enemies.forEach((Enemy) => {
				Enemy.position.x -= player.speed
			})		
			genericObjects[0].position.x -=player.speed * 0.5
			genericObjects[1].position.x -=player.speed * 0.66
		} else if (keys.left.pressed && scrollOffset > 0){
			scrollOffset -= player.speed
			platforms.forEach((Platform) => {
				Platform.position.x += player.speed
			})
			enemies.forEach((Enemy) => {
				Enemy.position.x += player.speed
			})
			genericObjects[0].position.x +=player.speed * 0.5
			genericObjects[1].position.x +=player.speed * 0.66
		}
	}

	// platform collision detection
	platforms.forEach(platform => {
		if (player.position.y + player.height <= platform.position.y &&
			player.position.y + player.height + player.velocity.y >= platform.position.y &&
			player.position.x + player.width-40 >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width -15
			) {
			player.velocity.y = 0
		}
	})

	enemies.forEach(enemy =>{
		if (player.position.y + player.height <= enemy.position.y &&
			player.position.y + player.height + player.velocity.y >= enemy.position.y &&
			player.position.x + (player.width) >= enemy.position.x &&
			player.position.x <= enemy.position.x + enemy.width
			) {
				let index = enemies.indexOf(enemy)
				enemies.splice(index,1)
		} else if (
			player.position.x  >= enemy.position.x &&
			player.position.x <= enemy.position.x + (enemy.width/2)&&
			player.position.y+player.height < enemy.position.y+enemy.height &&
			player.position.y+player.height > enemy.position.y) {
				alert("You lose!")
				shownLoseAlert = true
				init()
		}})
	// platform enemy collision detection
	enemies.forEach(enemy => {
		platforms.forEach(platform => {
			if (enemy.position.y + enemy.height <= platform.position.y &&
				enemy.position.y + enemy.height + enemy.velocity.y >= platform.position.y &&
				enemy.position.x + enemy.width-60 >= platform.position.x &&
				enemy.position.x <= platform.position.x + platform.width
				) {
				enemy.velocity.y = 0
			}
	})}
	)
	
	//player.position.x =
	if (scrollOffset > 11400
		&& (player.position.y > 120 && player.position.y < 300)
		&& blahajCollected == false){
		blahajCollected = true
		platforms.pop()
	}
	if (blahajCollected == true) {
		scrollOffset = 11400
		player.position.y = 110
	}
	//win condition
	if (scrollOffset > winReq
		&& shownWinAlert == false) {
		alert('You Win!')
		shownWinAlert = true
		init()
	}

	//lose condition
	if ((player.position.y - 3*player.height > canvas.height
		|| player.lives == 0)
		&& shownLoseAlert==false) {
		alert("You lose!")
		shownLoseAlert = true
		enemies = []
		init()
	}
}

init()
animate()

var lastPressed = 0
window.addEventListener('keydown', ({key}) => {
	switch (key){
		case 'a':
			keys.left.pressed = true
			player.currentSprite = player.sprites.run.left
			player.currentCropWidth = 353 
			player.leftOffset = 263
			break

		case 's':
			if (player.position.y < 360) player.velocity.y += gravity
			break

		case 'd':
			keys.right.pressed = true
			player.currentSprite = player.sprites.run.right
			player.currentCropWidth = 353 
			player.leftOffset = 263
			break

		case 'w':
			var now = new Date()
			if (now - lastPressed < 0) player.velocity.y = 0
			else {
			if (event.repeat) { return }
			player.velocity.y -= 20
			lastPressed = new Date()
			}
			break
	}
})

window.addEventListener('keyup', ({key}) => {
	switch (key){
		case 'a':
			keys.left.pressed = false
			player.currentSprite = player.sprites.stand.left
			break

		case 's':
			break

		case 'd':
			keys.right.pressed = false
			player.currentSprite = player.sprites.stand.right
			break

		case 'w':
			break
	}
})
