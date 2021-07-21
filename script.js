// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, colorMode, HSB, width, height, 
          random, background, fill, color, random
          rect, ellipse, stroke, image, loadImage, 
          collideCircleCircle, collideRectCircle, collideRectRect, text, mouseX, mouseY, strokeWeight, line, mouseIsPressed, textSize
          mouseButton, RIGHT, noStroke, keyCode, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, noLoop, createAudio */

          var width = 1000;
          var height = 800;
          var button;
          
          let backgroundImage, backgroundVelocity, bgpic, hookImage, hook, plastic_bottles, plasticBottleImage, glass_bottles, glassBottleImage, plastic_bags, plasticBagImage, i;
          let fishImage, fish_array, lives, score;
          let heartImage, game;
          
          function setup() {
            var canvas = createCanvas(1000, 700);
            createCanvas(width, height);
            colorMode(HSB, 360, 100, 100);
            background(210, 50, 100);
            backgroundImage = loadImage("https://cdn.glitch.com/66c6e998-4211-4f1d-aa82-de870a22769d%2Fwater.jpg?v=1595029133541");
            hookImage = loadImage("https://cdn.glitch.com/66c6e998-4211-4f1d-aa82-de870a22769d%2Fhook.png?v=1595030562946");
            glassBottleImage = loadImage("https://cdn.glitch.com/66c6e998-4211-4f1d-aa82-de870a22769d%2Fbottle-png--2200.png?v=1595018349952");
            plasticBottleImage = loadImage("https://cdn.glitch.com/66c6e998-4211-4f1d-aa82-de870a22769d%2Fgarbage.png?v=1595018748083");
            plasticBagImage = loadImage("https://cdn.glitch.com/66c6e998-4211-4f1d-aa82-de870a22769d%2Fplastic_bag_PNG35.png?v=1595018762589");
            fishImage = loadImage("https://cdn.glitch.com/66c6e998-4211-4f1d-aa82-de870a22769d%2Fclipart-fish-transparent-background.png?v=1595017776227");
            heartImage = loadImage("https://cdn.glitch.com/66c6e998-4211-4f1d-aa82-de870a22769d%2Flives.png?v=1595040121950");
           
            glass_bottles = [];
            plastic_bottles = [];
            plastic_bags = [];
            fish_array = [];
            lives = 3;
            score = 0;
            
            for (i = 0; i < 15; i++){
              glass_bottles.push(new GlassBottle(200*i, -400*i));
              plastic_bottles.push(new PlasticBottle(random(width), -200*i));
              plastic_bags.push(new PlasticBag(random(width), -100+400*i));
              fish_array.push(new Fish(random(width), height-500*i));
            }
            console.log(glass_bottles);
            
            bgpic = new Background();
            hook = new Hook();
            game = new gameLife(50, 80);
            
          }
          
          function draw() {
            if(lives != 0) {
              bgpic.move();
            }
            
            bgpic.show();
            hook.show();
            game.show();
            game.over();
          
            for(i = 0; i < glass_bottles.length; i++){
              if(lives != 0){
                glass_bottles[i].move();
                glass_bottles[i].show();
                glass_bottles[i].checkHookCollision();
                plastic_bottles[i].move();
                plastic_bottles[i].show();
                plastic_bottles[i].checkHookCollision();
                plastic_bags[i].move();
                plastic_bags[i].show();
                plastic_bags[i].checkHookCollision();
                fish_array[i].move();
                fish_array[i].show();
                fish_array[i].checkHookCollision();
              }
            }
          }
          
          //background picture class needed to treat the background picture as an object
          class Background{
            constructor(){
              this.x = 0;
              this.y = -height;
              this.velocity = 3;
              this.width = width;
              this.height = height*2+20;
            }
            
            move(){
              if(this.y<0){
                this.y+=this.velocity;
              }else{
              this.y = -height;
              }  
            }
            
            show(){
              backgroundImage.resize(this.width,this.height);
              image(backgroundImage, this.x, this.y);
            }
          }
          
          //hook class - the hook parameters are here
          class Hook{
            constructor(){
              this.x = width;
              this.y = height;
              this.width = 50;
              this.height = 50;
            }
            show(){
              if (mouseX < width && mouseX > 0 & mouseY > 0 && mouseY < height){
                this.x = mouseX;
                this.y = mouseY;
                hookImage.resize(this.width, this.height);
                image(hookImage, mouseX-this.width+10, mouseY-10); // might wanna get rid of the 10's
                stroke(0);
                strokeWeight(3);
                line(this.x, 0, this.x, this.y);
              }
            }
          }
          
          // trash classes
          // glass bottles declared here
          class GlassBottle{
            constructor(x,y){
              this.x = x;
              this.y = y;
              this.width = 100;
              this.height = 150;
              this.velocity = 3;
              this.space = random(20);
              this.add = false;
            }
            
            move(){
              if(this.y < height+this.height){
                this.y += this.velocity
              }
            }
            checkHookCollision(){
              if(this.y > 0 && collideRectRect(this.x, this.y, this.width, this.height, hook.x, hook.y, hook.width, hook.height)){
                this.x = mouseX - this.space; 
                this.y = mouseY;
                if(this.add == false){
                  score = score + 1;
                  this.add = true;
                }
                
              }
            }
            
            show(){
              glassBottleImage.resize(this.width, this.height);
              image(glassBottleImage,this.x, this.y);
              //draw the image at these coordinates
            }
          }
          
          //plastic bottles declared here
          class PlasticBottle{
            constructor(x,y){
              this.x = x;
              this.y = y;
              this.width = 150;
              this.height = 120;
              this.velocity = 3;
              this.space = random(20);
              this.add = false;
            }
            
            move(){
              if(this.y < height+this.height){
                this.y += this.velocity
              }
            }
            
            checkHookCollision(){
              if(this.y > 0 && collideRectRect(this.x, this.y, this.width, this.height, hook.x, hook.y, hook.width, hook.height)){
                this.x = mouseX-this.space;
                this.y = mouseY;
                if(this.add == false){
                  score = score + 1;
                  this.add = true;
                }
              }
            }
            
            show(){
              plasticBottleImage.resize(this.width, this.height);
              image(plasticBottleImage,this.x, this.y);
              //draw the image at these coordinates
            }
            
            
          }
          
          //plastic bags declared here
          class PlasticBag{
            constructor(x,y){
              this.x = x;
              this.y = y;
              this.width = 100;
              this.height = 120;
              this.velocity = 3;
              this.space = random(20);
              this.add = false;
            }
            
            move(){
              if(this.y < height+this.height){
                this.y += this.velocity
              }
            }
          
            checkHookCollision(){
              if(this.y > 0 && collideRectRect(this.x, this.y, this.width, this.height, hook.x, hook.y, hook.width, hook.height)){
                this.x = mouseX-this.space;
                this.y = mouseY;
                if(this.add == false){
                  score = score + 1;
                  this.add = true;
                }
              }
            }
            
            show(){
              plasticBagImage.resize(this.width, this.height);
              image(plasticBagImage,this.x, this.y);
              //draw the image at these coordinates
            }
          }
          
          //fish class
          class Fish{
            constructor(x,y){
              this.x = random(x);
              this.y = random(y);
              this.width = 100;
              this.height = 60;
              this.velocity = 3;
            }
            
            move(){
              if(this.y < height+this.height){
                this.y += this.velocity
              }
            }
            
          //   move() {
          //     if(this.x < height + this.width){
          //       this.x -= this.velocity;
          //     }
          //   }
            
            checkHookCollision(){
              if(this.y > 0 && collideRectRect(this.x, this.y, this.width, this.height, hook.x, hook.y, hook.width, hook.height)){
                lives--;
                this.x = -200;
                if(score < 2) {
                  score = 0;
                } else {
                  score -= 2;
                }
               
              }
            }
            
            show(){
              fishImage.resize(this.width, this.height);
              image(fishImage, this.x, this.y);
              //draw the image at these coordinates
            }
            
          }
          
          class gameLife {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              this.width = 40;
              this.height = 40;
            }
            
            show() {
              noStroke();
              textSize(48);
              text('LIVES', 50, 60);
              heartImage.resize(this.width, this.height);
              let position = 0;
              for(let i = 0; i < lives; i++){
                image(heartImage, this.x + position, this.y);
                position += 50;
              }    
              
              textSize(48);
              text(`SCORE: ${score}`, 750, 60);
            }
            
            over() {
              if(lives === 0) {
                textSize(64);
                text('GAME OVER!', 320, 350);
                textSize(34);
                text("Remember not to litter as it harms the fish!", 195, 400);
                textSize(12);
              }
            }
          }
          
