const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d') 

canvas.width = window.innerWidth -5
canvas.height = window.innerHeight -5
let distance = 0
const gravity = 0.5
class Player {
    constructor(){
        this.position = {
            x:20,
            y:100
        },
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height = 40,
        this.width = 40
        this.image = document.getElementById('player')



    }
    draw(){   
        c.drawImage(this.image,this.position.x,this.position.y, this.width,this.height)
        }
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y+this.height+this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    
    }

}
class Enemy {
    constructor(x,y){
        this.position = {
            x,
            y
        },
        this.velocity = {
            x: -0.5,
            y: 1
        }
        this.height = 30,
        this.width = 30
        this.image = document.getElementById('enemy')



    }
    draw(){
        
        c.drawImage(this.image,this.position.x,this.position.y, this.width,this.height)
        }
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y+this.height+this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        
    }

}
class Platform {
    constructor(x,y){
        this.position = {
            x:x,
            y:y
        }
        this.width = 100,
        this.height = 20
    }
    draw(){
        c.fillStyle = 'green'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
class Hole {
    constructor(x,y){
        this.position = {
            x:x,
            y:y
        }
        this.width = 100,
        this.height = 10
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
let enemies = []
for (let i =1 ; i<50;i++ ){
    if(Math.random() < 0.7){
    enemies.push(new Enemy(i*100,canvas.height-150))}
}
const player = new Player()
const platforms = []
const holes = []
for (let i =-3 ; i<100;i++ ){
    if(i>2){
        if(Math.random() < 0.2){
            platforms.push(new Platform(100*i,canvas.height-120))
            holes.push(new Hole(100*i,canvas.height-10))
            i++
        }
    }
    
    platforms.push(new Platform(100*i,canvas.height-20))
    if(Math.random()<0.3){
    platforms.push(new Platform(100*i,canvas.height-220))
    platforms.push(new Platform(100*(i-1),canvas.height-120))}

}
platforms.push(new Platform(2000,400))
platforms.push(new Platform(0,300))
platforms.push(new Platform(600,450))

const keys = {
    left:{
        pressed: false
    },
    right:{
        pressed: false
    },
    up:{
        pressed: false
    }
}
setInterval(() => {enemies.push(
    new Enemy(player.position.x+1000,canvas.height-100))}, 5000)
animate()
function animate(){
    
    
    if (distance > 8000){
        console.log('You Win')
    

    }
    else{
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    c.drawImage(document.getElementById('bg'),0,0,canvas.width,canvas.height)
    // console.log(enemies)
    player.update()
    enemies.forEach(enemy =>{enemy.update()})
    platforms.forEach(platform =>{
        platform.draw()
    })
    holes.forEach(hole =>{
        hole.draw()
    })
    if (keys.left.pressed && player.position.x > 0.2*canvas.width ) {
        player.velocity.x = -5
        distance -= 5
        }
    else if (keys.right.pressed && player.position.x < 0.8*canvas.width) {
        player.velocity.x = 5
        distance += 5
 }
    else {player.velocity.x = 0
        if (keys.left.pressed && distance > player.width){
            platforms.forEach(platform =>{
                platform.position.x += 5})
            enemies.forEach(enemy =>{
                enemy.position.x += 5})
            holes.forEach(hole =>{
                hole.position.x += 5
                
            })
            distance -= 5
            }
        else if (keys.right.pressed){platforms.forEach(platform =>{
            platform.position.x -= 5
            })
            enemies.forEach(enemy =>{
                enemy.position.x -= 5
            })
            holes.forEach(hole =>{
                hole.position.x -= 5
            })
            distance += 5
        }
        
    }

    
    platforms.forEach(platform =>{
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y 
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width){player.velocity.y = 0}
    })
    enemies.forEach(enemy =>{
        platforms.forEach(platform =>{
            if (enemy.position.y + enemy.height <= platform.position.y 
                && enemy.position.y + enemy.height + enemy.velocity.y >= platform.position.y 
                && enemy.position.x + enemy.width >= platform.position.x
                && enemy.position.x <= platform.position.x + platform.width){enemy.velocity.y = 0}
            }
        )
    })
    enemies.forEach(enemy =>{
        holes.forEach(hole =>{
            if (enemy.position.x  == hole.position.x + hole.width 
                || enemy.position.x + enemy.width == hole.position.x ){enemy.velocity.x = (enemy.velocity.x) *-1}
            }
        )
    })
    for (let i=0; i<enemies.length; i++){
        if (enemies[i].position.y > canvas.height){
            enemies.splice(i,1);
            
            
        }
    }
    enemies.forEach(enemy =>{
        if (enemy.position.x < player.position.x+player.width && enemy.position.x + enemy.width> player.position.x+player.width && enemy.position.y+enemy.height == player.position.y+ player.height
            || enemy.position.x + enemy.width > player.position.x && enemy.position.x  < player.position.x && enemy.position.y+enemy.height == player.position.y+ player.height){
            console.log('collision')
            let index = enemies.indexOf(enemy)
            console.log(index)
            enemies.splice(index,1)
            
        
        }
    })
    }
}


window.addEventListener('keydown',({keyCode}) => {
    switch (keyCode){
        case 65:
            keys.left.pressed = true
        break


        case 68:
            keys.right.pressed = true
        break

        case 87:
            if (player.velocity.y === 0 && (!(keys.up.pressed)))
                player.velocity.y -= 10

            keys.up.pressed = true

        break
    }
}
)

window.addEventListener('keyup',({keyCode}) => {
    switch (keyCode){
        case 65:
            keys.left.pressed = false
        break

        case 68:
            keys.right.pressed = false
        break

        case 87:
            keys.up.pressed = false

        break
    }
}
)
