var canvas2 =  document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d')
//ctx2.fillRect(0,0,50,50)

//VARIABLES GLOBALES
var aAereos2 = []
var cars2 = [];
var interval2;
var frames2 = 0;
var images2 = {
    bg : 'https://orig00.deviantart.net/1c42/f/2014/158/3/2/middle_ground_city___night_by_saturnthereploid-d7lfowt.png?raw=true',
    mono : 'https://t7.rbxcdn.com/c05fde51d58feee794b473f3a975cc1a?raw=true',
    car : 'https://opengameart.org/sites/default/files/sprite6_0.png?raw=true',
    boo : 'https://vignette.wikia.nocookie.net/deathbattle/images2/c/ce/Majin_Buu_Sprite.png/revision/latest?cb=20160728194716?raw=true',
    boo1 : 'http://rs933.pbsrc.com/albums/ad177/darkkingpk2/BuuGohan.png~c200?raw=true',
    boo2 : 'https://pa1.narvii.com/6349/8dd3b408b15b30cab4623a5570abf36b9f1ffb12_hq.gif?raw=true',
    vegeta : 'https://vignette.wikia.nocookie.net/ultradragonball/images2/b/bd/Gaccu_Sprite_Right.png/revision/latest?cb=20130207014715?raw=true',
    ichigo : 'https://cdn2.scratch.mit.edu/get_image/user/19656560_90x90.png?raw=true',
    picoro : 'https://78.media.tumblr.com/tumblr_m3oi10rTo21r3t6jpo1_500.gif?raw=true'

}




//CLASES
class Board2{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas2.width;
        this.height = canvas2.height;
        this.image = new Image()
        this.image.src = images2.bg
        this.image.onload = () =>{
            this.draw()
        }
        this.music = new Audio()
        this.music.src = 'mision.mp3'
    }
    draw(){
        this.x--
        if(this.x < -canvas2.width) this.x = 0
        ctx2.drawImage(this.image, this.x,this.y,this.width,this.height)
        ctx2.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
        ctx2.font = '50px Avenir'
        ctx2.fillStyle = 'white'
        ctx2.fillText(Math.floor(frames2/60),100,100)

    }
}//termina Board2
class Protagonist2{
    constructor(){
        this.x = 50;
        this.y = 400;
        this.width = 70;
        this.height = 70;
        this.image = new Image()
        this.image.src = images2.mono;
        this.image.onload = () =>{
            this.draw()
        }
        this.gravity = 1
    }
    draw(){
        if(this.y < 400) this.y += this.gravity
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    crashWith(item){    // item es cada uno de los pipes
        return  (this.x < item.x + item.width) && // tis representa a flappy, la x de ppie mas el ancho de pipe, si 
                (this.x + this.width > item.x) && // la x de flapy mas el ancho de flapi es mayor a pipe x
                (this.y < item.y + item.height) && //
                (this.y + this.height > item.y);  // esta funciona en comparacion de areas, funciona perfecto para cuadrados, si un area contiene una area, significa colision
                if(crash) this.crash.play()
                return crash;
    }
}// Protagonist2

class ObsTerrestres2{
    constructor(){
        this.x = 200;
        this.y = 425;
        this.width = 50;
        this.height = 50;
        this.image =  new Image()
        this.image.src = images2.car
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.x--
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}//ObsTerrestres2
class ObsAereos2{
    constructor(y,boName){
        this.x = canvas2.width -50
        this.y = y;
        this.width = 75;
        this.height = 75;
        this.image =  new Image()
        this.image.src = images2[boName]
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw(){
        this.x -= 3
        ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}//ObsAereos2

// INSTANCIAS
var board2 = new Board2()
var principal2 = new Protagonist2()
var obs2 = new ObsTerrestres2()
//var boo1 = new ObsAereos2()

//FUNCIONES PRINCIPALES

function update2 (){
    frames2 ++
    ctx2.clearRect(0,0,canvas2.width,canvas2.height)
    board2.draw()
    principal2.draw()
    obs2.draw()
    //generateCars()
   // boo1.draw()
    generateAereos2()
    drawBoos2()
    checkCollitions2()
}

function start2 (){
    if(interval2) return
    aAereos2 = []
    frames2 = 0
    interval2 = setInterval(update2,1000/60)
}

function gameOver2(){
    clearInterval(interval2)
    ctx2.font = '80px Avenir'
    ctx2.fillText('Game Over',50,250)
    interval2 = null
    board2.music.pause()
}

//FUNCIONES AUXILIARES

function generateAereos2(){
    var y = Math.floor(Math.random()*500)
    var xramdomb1 = Math.floor(Math.random()*200)+60 
    var xramdomb2 = Math.floor(Math.random()*300)+60 
    var xramdomb3 = Math.floor(Math.random()*400)+60
    var xramdomb4 = Math.floor(Math.random()*500)+60
    var xramdomb5 = Math.floor(Math.random()*600)+60
    if(frames2 % xramdomb1 === 0 ){        
        var boos = new ObsAereos2(y,'boo')               
        aAereos2.push(boos)
    }
    if(frames2 % xramdomb2 === 0 ){  
        var boos1 =  new ObsAereos2(y,'boo1')              
        aAereos2.push(boos1)      
    }
    if(frames2 % xramdomb3 === 0 ){  
        var boos2 = new ObsAereos2(y,'boo2')              
        aAereos2.push(boos2)
    }
    if(frames2 % xramdomb3 === 0 ){  
        var boos2 = new ObsAereos2(y,'boo2')              
        aAereos2.push(boos2)
    }
    if(frames2 % xramdomb4 === 0 ){  
        var vegetas = new ObsAereos2(y,'vegeta')              
        aAereos2.push(vegetas)
    }
    if(frames2 % xramdomb5 === 0 ){  
        var picoros = new ObsAereos2(y,'picoro')              
        aAereos2.push(picoros)
    }


}

function drawBoos2(){
    aAereos2.forEach(function(insectos){
        insectos.draw()
    })
}

function checkCollitions2(){
    aAereos2.forEach(function(insectos){
        if(principal2.crashWith(insectos)){
            gameOver2()
        }
    })
}
//LOS OBSERVADOReSS
addEventListener('keydown',function(e){
    if(e.keyCode === 38  && principal2.y > 30){
        principal2.y -=30
       // principal2.x +=25
    }
    if(e.keyCode === 39 && principal2.x < 500){
        principal2.x +=30
       // principal2.x +=25
    }
    if(e.keyCode === 37 && principal2.x > 30){
        principal2.x -=30
       // principal2.x +=25
    }
    if(e.keyCode === 40 && principal2.y > 50){
        principal2.y +=30
       // principal2.x +=25
    }
    if(e.keyCode === 77){
        start2()
        board2.music.play()
    }
   
})
