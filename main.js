var canvas =  document.getElementById('canvas');
var ctx = canvas.getContext('2d')
//ctx.fillRect(0,0,50,50)

//VARIABLES GLOBALES
var aAereos2 = []
var cars = [];
var interval;
var frames = 0;
var images = {
    bg : 'https://orig00.deviantart.net/1c42/f/2014/158/3/2/middle_ground_city___night_by_saturnthereploid-d7lfowt.png?raw=true',
    mono : 'https://t7.rbxcdn.com/c05fde51d58feee794b473f3a975cc1a?raw=true',
    car : 'https://opengameart.org/sites/default/files/sprite6_0.png?raw=true',
    boo : 'https://vignette.wikia.nocookie.net/deathbattle/images/c/ce/Majin_Buu_Sprite.png/revision/latest?cb=20160728194716?raw=true',
    boo1 : 'http://rs933.pbsrc.com/albums/ad177/darkkingpk2/BuuGohan.png~c200?raw=true',
    boo2 : 'https://pa1.narvii.com/6349/8dd3b408b15b30cab4623a5570abf36b9f1ffb12_hq.gif?raw=true',
    vegeta : 'https://vignette.wikia.nocookie.net/ultradragonball/images/b/bd/Gaccu_Sprite_Right.png/revision/latest?cb=20130207014715?raw=true',
    ichigo : 'https://cdn2.scratch.mit.edu/get_image/user/19656560_90x90.png?raw=true',
    picoro : 'https://78.media.tumblr.com/tumblr_m3oi10rTo21r3t6jpo1_500.gif?raw=true'

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
        this.x = 200;
        this.y = 425;
        this.width = 50;
        this.height = 50;
        this.image =  new Image()
        this.image.src = images.car
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.x--
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
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
}

function start (){
    if(interval) return
    aAereos2 = []
    frames = 0
    interval = setInterval(update,1000/60)
}

function gameOver(){
    clearInterval(interval)
    ctx.font = '80px Avenir'
    ctx.fillText('Game Over',50,250)
    interval = null
    board.music.pause()
}

//FUNCIONES AUXILIARES

function generateAereos(){
    var y = Math.floor(Math.random()*500)
    var xramdomb1 = Math.floor(Math.random()*200)+60 
    var xramdomb2 = Math.floor(Math.random()*300)+60 
    var xramdomb3 = Math.floor(Math.random()*400)+60
    var xramdomb4 = Math.floor(Math.random()*500)+60
    var xramdomb5 = Math.floor(Math.random()*600)+60
    if(frames % xramdomb1 === 0 ){        
        var boos = new ObsAereos(y,'boo')               
        aAereos2.push(boos)
    }
    if(frames % xramdomb2 === 0 ){  
        var boos1 =  new ObsAereos(y,'boo1')              
        aAereos2.push(boos1)      
    }
    if(frames % xramdomb3 === 0 ){  
        var boos2 = new ObsAereos(y,'boo2')              
        aAereos2.push(boos2)
    }
    if(frames % xramdomb3 === 0 ){  
        var boos2 = new ObsAereos(y,'boo2')              
        aAereos2.push(boos2)
    }
    if(frames % xramdomb4 === 0 ){  
        var vegetas = new ObsAereos(y,'vegeta')              
        aAereos2.push(vegetas)
    }
    if(frames % xramdomb5 === 0 ){  
        var picoros = new ObsAereos(y,'picoro')              
        aAereos2.push(picoros)
    }


}

function drawBoos(){
    aAereos2.forEach(function(insectos){
        insectos.draw()
    })
}

function checkCollitions(){
    aAereos2.forEach(function(insectos){
        if(principal.crashWith(insectos)){
            gameOver()
        }
    })
}
//LOS OBSERVADOReSS
addEventListener('keydown',function(e){
    if(e.keyCode === 87  && principal.y > 30){
        principal.y -=30
       // principal.x +=25
    }
    if(e.keyCode === 68 && principal.x < 500){
        principal.x +=30
       // principal.x +=25
    }
    if(e.keyCode === 65 && principal.x > 30){
        principal.x -=30
       // principal.x +=25
    }
    if(e.keyCode === 83 && principal.y > 50){
        principal.y +=30
       // principal.x +=25
    }
    if(e.keyCode === 13){
        start()
        board.music.play()
    }
   
})
