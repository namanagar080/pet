var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedtheDog;
var foodObj;

var feed,lastFedRef;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedtheDog=createButton("feed the dog");
  feedtheDog.position(900,95);
  feedtheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  lastFedRef=database.ref("feedTime");
  lastFedRef.on("value",function (data){
    lastFed=data.val();
  })
  
 
  drawSprites();
  

  if(lastFed>=12){
    textSize(25);
    fill("red");
    text (lastFed%12+" PM",100,25);
  }
  else{
    textSize(25);
  fill("red");
  text (lastFed+" AM",100,25);
  }
}
 
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  database.ref("/").update({
    feedTime:hour(),
    Food:foodObj.getFoodStock()
  })
  dog.addImage(happyDog);
var food_stock_val=foodObj.getFoodStock();
if(food_stock_val<=0){
foodObj.updateFoodStock(food_stock_val*0);
}
  else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
  
}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
