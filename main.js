var canvas =  document.getElementById('canvas');
var ctx = canvas.getContext('2d')
//ctx.fillRect(0,0,50,50)

//VARIABLES GLOBALES
var winner= 1;
var beginMusic = 1
var aAereos = []
var cars = [];
var interval;
var frames = 0;
var images = {
    bg : './images/bg.png',
    mono : './images/mono.png',
    car : './images/car.png',
    boo : './images/frezer.png',
    boo1 : './images/boo1.png',
    boo2 : './images/boo2.png',
    vegeta : './images/bis.png',
    picoro : './images/jiren.png',
    esfera : './images/uno.png'
}




//CLASES
class Board{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image()
        this.image.src = images.bg
        this.image.onload = () =>{
            this.draw()
        }
        this.music = new Audio()
        this.music.src = 'mision.mp3'
    }
    draw(){
        this.x--
        if(this.x < -canvas.width) this.x = 0
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
        ctx.font = '50px Avenir'
        ctx.fillStyle = 'white'
        ctx.fillText(Math.floor(frames/60),100,100)

    }
}//termina Board
class Protagonist{
    constructor(){
        this.x = 50;
        this.y = 400;
        this.width = 70;
        this.height = 70;
        this.image = new Image()
        this.image.src = images.mono;
        this.image.onload = () =>{
            this.draw()
        }
        this.gravity = 1
    }
    draw(){
        if(this.y < 400) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    crashWith(item){    // item es cada uno de los pipes
        return  (this.x < item.x + item.width) && // tis representa a flappy, la x de ppie mas el ancho de pipe, si 
                (this.x + this.width > item.x) && // la x de flapy mas el ancho de flapi es mayor a pipe x
                (this.y < item.y + item.height) && //
                (this.y + this.height > item.y);  // esta funciona en comparacion de areas, funciona perfecto para cuadrados, si un area contiene una area, significa colision
                if(crash) this.crash.play()
                return crash;
    }
}// Protagonist

class ObsTerrestres{
    constructor(){
        this.x = canvas.width-60;
        this.y = canvas.height/2;
        this.width = 50;
        this.height = 50;
        this.image =  new Image()
        this.image.src = images.esfera
        this.image.onload = () =>{
            this.draw()
        }
        this.crash = new Audio()
        this.crash.src = "crash.mp3"
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    crashWith(item){
        var crash = (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y)
        if(crash) this.crash.play()
        return  crash;
    }
}//ObsTerrestres
class ObsAereos{
    constructor(y,boName){
        this.x = canvas.width -50
        this.y = y;
        this.width = 75;
        this.height = 75;
        this.image =  new Image()
        this.image.src = images[boName]
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.x -= 3
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    
}//ObsAereos

// INSTANCIAS
var board = new Board()
var principal = new Protagonist()
var obs = new ObsTerrestres()
//var boo1 = new ObsAereos()

//FUNCIONES PRINCIPALES

function update (){
    frames ++
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board.draw()
    principal.draw()
    obs.draw()
    //generateCars()
   // boo1.draw()
    generateAereos()
    drawBoos()
    checkCollitions()
    checkCollitions1()
    checkPlayer2()
}

function start (){
    if(interval) return
    aAereos = []
    frames = 0
    interval = setInterval(update,1000/60)
}

function gameOver(){
    clearInterval(interval)
    ctx.font = '80px Avenir'
    ctx.fillText('You Win',50,250)
    interval = null
    board.music.pause()
    principal.x = 10 
    winner = 0

}
function gameOver4(){
    clearInterval(interval)
    ctx.font = '80px Avenir'
    ctx.fillText('You Lose',50,250)
    interval = null
    board.music.pause()
    principal.x = 10
}

//FUNCIONES AUXILIARES

function generateAereos(){
    var y = Math.floor(Math.random()*500)
    var xramdomb1 = Math.floor(Math.random()*40)+60 
    var xramdomb2 = Math.floor(Math.random()*80)+60 
    var xramdomb3 = Math.floor(Math.random()*200)+60
    var xramdomb4 = Math.floor(Math.random()*300)+60
    var xramdomb5 = Math.floor(Math.random()*400)+60
    if(frames % xramdomb1 === 0 ){        
        var boos = new ObsAereos(y,'boo')               
        aAereos.push(boos)
    }
    if(frames % xramdomb2 === 0 ){  
        var boos1 =  new ObsAereos(y,'boo1')              
        aAereos.push(boos1)      
    }
    if(frames % xramdomb3 === 0 ){  
        var boos2 = new ObsAereos(y,'boo2')              
        aAereos.push(boos2)
    }
    if(frames % xramdomb4 === 0 ){  
        var vegetas = new ObsAereos(y,'vegeta')              
        aAereos.push(vegetas)
    }
    if(frames % xramdomb5 === 0 ){  
        var picoros = new ObsAereos(y,'picoro')              
        aAereos.push(picoros)
    }


}

function drawBoos(){
    aAereos.forEach(function(insectos){
        insectos.draw()
    })
}

function checkCollitions(){
    aAereos.forEach(function(insectos){
        if(principal.crashWith(insectos) && principal.x > 15){
            principal.x -= 10
        }
    })
}
function checkCollitions1(){
        if(principal.crashWith(obs)){
            gameOver()
        }
}

function checkPlayer2(){
    if(winner1 === false){
        gameOver4()
    }
}
//LOS OBSERVADOReSS
addEventListener('keydown',function(e){
    if(e.keyCode === 87  && principal.y > 30){  //izquierda
        principal.y -=30
       // principal.x +=25
    }
    if(e.keyCode === 68 && principal.x < 450){//pa delante
        principal.x +=30
       // principal.x +=25
    }
    if(e.keyCode === 65 && principal.x > 30){//pa atras
        principal.x -=30
       // principal.x +=25
    }
    if(e.keyCode === 83 && principal.y < 430){//abajo
        principal.y +=30
       // principal.x +=25
    }
    if(e.keyCode === 32){
        start()
        board.music.play()
        beginMusic = 0
    }
   
})
