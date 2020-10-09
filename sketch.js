//Create variables here
var dog, normalDog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  normalDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(normalDog);
  dog.scale = 0.2;

  database = firebase.database();

  foodS = database.ref('Food');
  foodS.on("value", readStock);
}


function draw() {  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)&&foodS>0){
    foodS--;
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  stroke("black");
  fill("white");
  textSize(15);
  text("Note: Press the up arrow key to feed your dog!", 20,20);
  text("Food Remaining: "+foodS, 100,150);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food: x 
  })
}

