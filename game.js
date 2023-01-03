
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

function initGame() {
canvas.width = 1024
canvas.height = 576
}
initGame();
    // Your game can start here, but define separate functions, don't write everything in here :)
const gravity = 1.5
<<<<<<< Updated upstream
const winReq = 2000
=======
const winReq = 22500

>>>>>>> Stashed changes
class Player {
	constructor() {
			this.speed = 10
			this.position = {
				x: 100,
				y: 100			
			}
		this.velocity = {
			x: 0,
			y: 1
		}
		this.width = 66
		this.height = 150

		this.image = createImage(spriteStandRight)
		this.frames = 0
		this.sprites = {
			stand: {
				right: createImage(spriteStandRight),
				left: createImage(spriteStandLeft),
				cropWidth: 177
			},
			run: {
				right: createImage(spriteRunRight),
				left: createImage(spriteRunLeft),
				cropWidth: 340
				//width: 127.875
			}
		}

		this.currentSprite = this.sprites.stand.right
<<<<<<< Updated upstream
		this.currentCropWidth = 177
=======
		this.currentCropWidth = 353
		this.leftOffset = 263
		this.lives=3
>>>>>>> Stashed changes
	}

	draw() {
		context.drawImage(this.currentSprite,
			this.currentCropWidth*this.frames,
			0,
			this.currentCropWidth,
			400,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		)
	}

	update() {
		this.frames++
		if(this.frames > 28) this.frames = 0
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y

		if (this.position.y + this.height + 
			this.velocity.y <= canvas.height)
			this.velocity.y += gravity
		//else this.velocity.y = 0
<<<<<<< Updated upstream
=======
		// console.log("x",scrollOffset)
		// console.log("y",this.position.y)
>>>>>>> Stashed changes
	}
}

class Platform {
	constructor({x, y, image}){
		this.position = {
			x,
<<<<<<< Updated upstream
			y
		}
		this.image = image
		this.width = image.width
		this.height = image.height
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y)
	}

=======
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
		this.turningPoints={
			left:this.position.x +30,
			right:this.position.x -30
		}

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
		if (this.position.x + this.velocity.x == this.turningPoints.left){
			this.velocity.x= -0.5
		}else if (this.position.x + this.velocity.x == this.turningPoints.right){
			this.velocity.x= +0.5
		}
	}
>>>>>>> Stashed changes
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
class EnemyMedusa {
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

class InterfaceLife {
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

let medusaRight = '/img/medusa/Idle1.png'

let spriteRunLeft = '/img/spriteRunLeft.png'
let spriteRunRight = '/img/spriteRunRight.png'
let spriteStandLeft = '/img/spriteStandLeft.png'
let spriteStandRight = '/img/spriteStandRight.png'
<<<<<<< Updated upstream
=======
let blahajSprite = '/img/blahajSprite.png'
let lives = '/img/hearth.png'

let enemyRunLeft = '/img/enemyRunLeft.png'
let enemyRunRight = '/img/enemyRunRight.png'
>>>>>>> Stashed changes


function createImage(imageSrc){
	const image = new Image()
	image.src = imageSrc
	console.log(image.src)
	return image
}
function livesUpdate(){
let xvalue= 50
let yvalue=50
for (let i=0; i<player.lives; i++){
		interfaceLives.push(new InterfaceLife({x:xvalue,y:yvalue,image:livesImage}))
		xvalue+= 48
	}

}

<<<<<<< Updated upstream

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let medusaImage = createImage(medusaRight)
let platforms = []
let genericObjects = []
let enemies=[]
=======
let player = new Player()
let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let platformSmallShortImage = createImage(platformSmallShort)
let livesImage= createImage(lives)
let enemyRunLeftImage = createImage(enemyRunLeft)
let enemyRunRightImage = createImage(enemyRunRight)


let platforms = []
let genericObjects = []
let enemies = []
let interfaceLives=[]


>>>>>>> Stashed changes

let keys = {
	left: {
		pressed: false
	},
	left: {
		pressed: false
	}
}

let scrollOffset = 0
let shownLoseAlert = false
let shownWinAlert = false
<<<<<<< Updated upstream
=======
let blahajCollected = false
>>>>>>> Stashed changes

function init(){
player = new Player()
enemies = []
enemies.push(new Enemy(900,50))
enemies.push(new Enemy(1600,50))
livesUpdate()

<<<<<<< Updated upstream

enemies = [
	new EnemyMedusa({x:300,y:360, image:medusaImage})
]

platforms = [
	new Platform({x: platformSmallTallImage.width * 5 + 180, y: 320, image: platformSmallTallImage}),
	new Platform({x: -1, y: 460, image: platformImage}),
	new Platform({x: platformImage.width-4, y: 460, image: platformImage}),
	new Platform({x: platformImage.width * 2 + 200, y: 460, image: platformImage}),
	new Platform({x: platformImage.width * 3 + 510, y: 460, image: platformImage})

=======

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
>>>>>>> Stashed changes
]
genericObjects = [
	new GenericObject({x: -1, y: -1, image: createImage(background)}),
	new GenericObject({x: -1, y: -1, image: createImage(hills)})
]


<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
blahajCollected = false
>>>>>>> Stashed changes
}

function animate(){
	requestAnimationFrame(animate)
	context.fillStyle = 'white'
	context.fillRect(0,0,canvas.width,canvas.height)
	//console.log("x",player.position.x)
	//console.log("y",player.position.y)
	
	genericObjects.forEach(genericObjects =>{
		genericObjects.draw()
	})

	platforms.forEach(platform => {
		platform.draw()
	})
<<<<<<< Updated upstream
	
	enemies.forEach(enemy =>{
		enemy.draw()
	})

=======
	interfaceLives.forEach(live =>[
		live.draw()
	])
	enemies.forEach(enemy => {
		enemy.update()
	})
	
>>>>>>> Stashed changes
	player.update()


	
	if (keys.right.pressed && player.position.x < 400) {
		player.velocity.x = player.speed
	} else if ((keys.left.pressed && player.position.x > 100)
		|| (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
		player.velocity.x = -player.speed
	} else {
		player.velocity.x = 0

		if (keys.right.pressed) {
			scrollOffset += player.speed
			platforms.forEach((Platform) => {
				Platform.position.x -= player.speed
			})
<<<<<<< Updated upstream
			genericObjects.forEach((GenericObject) => {
				GenericObject.position.x -=player.speed * 0.66
			})
			enemies.forEach((enemy) => {
				enemy.position.x -= player.speed * 0.66
			})
=======
			enemies.forEach((Enemy) => {
				Enemy.position.x -= player.speed
				Enemy.turningPoints.left -= player.speed
				Enemy.turningPoints.right -= player.speed
			})		
			genericObjects[0].position.x -=player.speed * 0.5
			genericObjects[1].position.x -=player.speed * 0.66
>>>>>>> Stashed changes
		} else if (keys.left.pressed && scrollOffset > 0){
			scrollOffset -= player.speed
			platforms.forEach((Platform) => {
				Platform.position.x += player.speed
			})
<<<<<<< Updated upstream
			genericObjects.forEach((GenericObject) => {
				GenericObject.position.x +=player.speed * 0.66
			})
			enemies.forEach((enemy) => {
				enemy.position.x += player.speed * 0.66
			})
=======
			enemies.forEach((Enemy) => {
				Enemy.position.x += player.speed
				Enemy.turningPoints.left += player.speed
				Enemy.turningPoints.right += player.speed
			})
			genericObjects[0].position.x +=player.speed * 0.5
			genericObjects[1].position.x +=player.speed * 0.66
>>>>>>> Stashed changes
		}
	}

	// platform collision detection
	platforms.forEach(platform => {
		if (player.position.y + player.height <= platform.position.y &&
			player.position.y + player.height + player.velocity.y >= platform.position.y &&
<<<<<<< Updated upstream
			player.position.x + player.width >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width
=======
			player.position.x + player.width-40 >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width -15
>>>>>>> Stashed changes
			) {
			player.velocity.y = 0
		}
	})
<<<<<<< Updated upstream
	// // enemy detection
	enemies.forEach(enemy =>{
	if (player.position.y + player.height <= enemy.position.y &&
		player.position.y + player.height + player.velocity.y >= enemy.position.y &&
		player.position.x + (player.width/2) >= enemy.position.x &&
		player.position.x <= enemy.position.x + (enemy.width/2)
		) {
		enemies=[]
	} else if (
		player.position.x  >= enemy.position.x &&
		player.position.x <= enemy.position.x + (enemy.width/2)&&
		player.position.y+player.height < enemy.position.y+enemy.height &&
		player.position.y+player.height > enemy.position.y) {
			alert("You lose!")
			shownLoseAlert = true
			init()
	}
})
	

=======

	enemies.forEach(enemy =>{
		if (player.position.y + player.height <= enemy.position.y &&
			player.position.y + player.height + player.velocity.y >= enemy.position.y &&
			player.position.x + (player.width) >= enemy.position.x &&
			player.position.x <= enemy.position.x + enemy.width
			) {
				let index = enemies.indexOf(enemy)
				enemies.splice(index,1)
		} else if (
			player.position.x + player.width-35  >= enemy.position.x &&
			player.position.x <= enemy.position.x + enemy.width &&
			player.position.y+player.height < enemy.position.y+enemy.height &&
			player.position.y+player.height > enemy.position.y) {
				player.velocity.x=-140
				player.velocity.y=-22
				player.lives--
				interfaceLives.pop(0,1)
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
>>>>>>> Stashed changes
	//win condition
	if (scrollOffset > winReq  && shownWinAlert==false) {
		alert('You Win!')
		shownWinAlert = true
		init()
	}

	//lose condition
	if(player.position.y - 3*player.height > canvas.height && shownLoseAlert==false) {
		alert("You lose!")
		shownLoseAlert = true
		enemies = []
		init()
	}
}

init()
animate()

window.addEventListener('keydown', ({key}) => {
	console.log(key)
	switch (key){
		case 'a':
			console.log('left')
			keys.left.pressed = true
			player.currentSprite = player.sprites.run.left
			player.currentCropWidth = player.sprites.run.cropWidth
			break

		case 's':
<<<<<<< Updated upstream
			console.log('down')
=======
			if (player.position.y < 360) player.velocity.y += gravity
>>>>>>> Stashed changes
			break

		case 'd':
			console.log('right')
			keys.right.pressed = true
			player.currentSprite = player.sprites.run.right
			player.currentCropWidth = player.sprites.run.cropWidth
			break

		case 'w':
<<<<<<< Updated upstream
		case "ArrowUp":
		case "":
			console.log('up')
			player.velocity.y -= 20
=======
			var now = new Date()
			if (now - lastPressed < 0) player.velocity.y = 0
			else {
			if (event.repeat) { return }
			player.velocity.y -= 20
			lastPressed = new Date()
			}
>>>>>>> Stashed changes
			break
	}
})

window.addEventListener('keyup', ({key}) => {
	console.log(key)
	switch (key){
		case 'a':
			console.log('left')
			keys.left.pressed = false
			break

		case 's':
			console.log('down')
			break

		case 'd':
			console.log('right')
			keys.right.pressed = false
			break

		case 'w':
			console.log('up')
			break
	}
})
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
