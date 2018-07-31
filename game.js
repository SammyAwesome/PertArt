///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

// TODO: DECLARE and INTIALIZE your constants here
var START_TIME = currentTime();


///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// TODO: DECLARE your variables here
var lastKeyCode;
var storage = []

var startX = undefined
var startY = undefined
var mouseX = undefined
var mouseY = undefined

var inCanvas = false
var shouldDraw = false
var straight = false
var lineM = undefined
var xDos = undefined
var yDos = undefined
var functionChoice = "line"
var currentF = 0

var pA = .01
var pB = 1
var pC = 2

var sA
var sB
var sC
var sD



var xx1
var xx2
var yy1
var yy2
///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;
}


// When a key is pushed
function onKeyStart(key) {
    lastKeyCode = key;
    if(key == 16){
      straight = true
    }
    if(key==38){
      pA = pA + .01
    }
    if(key==40){
      pA = pA - .01
    }


    if(key==39){
      currentF ++
      if(currentF > storage.length - 1){
        currentF = 0
      }
    }
    if(key==37){
      currentF--
      if(currentF < 0){
        currentF = storage.length - 1
      }
    }
}

//from coordinate points to graph points
function CTG(value, type){
  if(type=="x"){
     return (value - 445 - (screenWidth)/2)
  } else if(type == "y"){
     return -1*(value)  + screenWidth/2 - 455
  }
}
//from graph points to coordinate points
function CTC(value, type){
  if(type=="x"){
    return (value + 445 + (screenWidth)/2)
  }else if(type == "y"){

     return ((screenWidth-910)/2 -value)
  }
}


function onTouchStart(x, y, id){
  if(id==LEFT_MOUSE_BUTTON_ID){
    if(x >= 890 && y <= screenWidth - 890){
      if(functionChoice == "line"){
        storage.push({x1:x,y1:y,x2:undefined,y2:undefined,type:"linear"})
        startX = x;
        startY = y;
        inCanvas = true
        shouldDraw = true
      } else if(functionChoice == "circle"){
        storage.push({x1:x,y1:y,x2:undefined,y2:undefined,type:"circle"})
        startX = x;
        startY = y;
        inCanvas = true
        shouldDraw = true
      } else if(functionChoice == "parabola"){
        storage.push({x1:x,y1:y,x2:undefined,y2:undefined,type:"parabola"})
        startX = x;
        startY = y;
        inCanvas = true
        shouldDraw = true
      } else if(functionChoice == "sine wave"){
        storage.push({x1:x,y1:y,x2:undefined,y2:undefined,type:"sine wave"})
        startX = x;
        startY = y;
        inCanvas = true
        shouldDraw = true
      }
      currentF = storage.length - 1
    }else{
      inCanvas = false
    }
  }
}
function onTouchEnd(x, y, id){
  if(id==LEFT_MOUSE_BUTTON_ID){
    if(inCanvas == true && x >= 900 && y <= screenWidth - 890){
      if(functionChoice == "line"){

        storage[storage.length - 1].x2 = x;
        storage[storage.length -1].y2 = y;

        shouldDraw = false;
      } else if(functionChoice == "circle"){
        storage[storage.length - 1].x2 = x;
        storage[storage.length -1].y2 = y;

        shouldDraw = false;
      } else if(functionChoice == "parabola"){
        storage[storage.length - 1].x2 = x;
        storage[storage.length -1].y2 = y;

        shouldDraw = false;
      } else if(functionChoice == "sine wave"){
        storage[storage.length - 1].x2 = x;
        storage[storage.length -1].y2 = y;

        shouldDraw = false;
      }
    }


    selection()
  }

}

function makeEquation(){
  if(storage.length >0){
//    console.log("hihihi")
      if(storage[currentF].type == "linear"){
        lineM = round(-1000 * ((storage[currentF].y1) - (storage[currentF].y2))/((storage[currentF].x1) - (storage[currentF].x2))) / 1000
        xDos = CTG(storage[currentF].x1, "x")
        yDos = storage[currentF].y1 - (screenWidth - 900) /2
        fillText("y = " + (lineM) + "x" + " + "+ .01 * round(((xDos*-1) * lineM - yDos) *  100), 900 + (screenWidth - 900) / 2, screenHeight - 150, makeColor(.5,0,10), " bold 50px Arial", "center", "middle")
        if(storage[currentF].x1 <= storage[currentF].x2){
          fillText("{" + CTG(storage[currentF].x1, "x") + " < x < " + CTG(storage[currentF].x2, "x") + "}", 900 + (screenWidth - 900) / 2, screenHeight - 100, makeColor(.5,0,10), " bold 50px Arial", "center", "middle")

        }else{
          fillText("{" + CTG(storage[currentF].x2, "x") + " < x < " + CTG(storage[currentF].x1, "x") + "}", 900 + (screenWidth - 900) / 2, screenHeight - 100, makeColor(.5,0,10), " bold 50px Arial", "center", "middle")

        }

      }else if(storage[currentF].type == "circle"){
        fillText("(x - " +   CTG(storage[currentF].x1, "x") +")^2  + (y - " +CTG(storage[currentF].y1, "y") + ")^2  = " + ((CTG(storage[currentF].x1, "x") - CTG(storage[currentF].x2, "x"))**2 +(CTG(storage[currentF].y1, "y") - CTG(storage[currentF].y2, "y"))**2), 900 + (screenWidth - 900) / 2, screenHeight - 150, makeColor(.5,0,10), " bold 50px Arial", "center", "middle")


      }

  }

}
var pi = 3.141526

function drawSine(){
  for(i = 0; i < storage.length; i++){
    if(storage[i].type == "sine wave" && storage[i].x1 != storage[i].x2 && storage[i].x2 !=undefined){
      for(j = -100; j < 100; j++){
        console.log("hola")
        if(CTC(j, "x") <screenWidth && CTC(j, "x") > 900 && CTC(pA * (j/10)**2 + pB * (j/20) + pC, "y") < screenWidth - 900 && CTC(pA * (j/10)**2 + pB * (j/20) + pC, "y") > 0){
          sB = (2* pi) / ((CTG(storage[i].x2, "x") - CTG(storage[i].x1, "x"))* 2)

          if(CTG(storage[i].y1) < CTG(storage[i].y2)){
            sD = (CTG(storage[i].y2, "y") + CTG(storage[i].y1, "y")) / 2
            sA = (CTG(storage[i].y2, "y") - CTG(storage[i].y1, "y")) / 2
            sC = CTG(storage[i].y2, "y")
          } else{
            sD = (CTG(storage[i].y1, "y") + CTG(storage[i].y2, "y")) / 2
            sA = (CTG(storage[i].y1, "y") - CTG(storage[i].y2, "y")) / 2
            sC = CTG(storage[i].y1, "y")
          }
          console.log(sA, sB, sC, sD)

            fillCircle(CTC(j, "x"),CTC((sA*cos(sB*((j)-sC)) + sD),"y"), 2, makeColor(1,0,1))
        }
      }
    }
  }
}

function drawParabola(){

  if(functionChoice == "parabola"){
    for(i = 0; i < storage.length; i++){
      if(storage[i].type == "parabola" && storage[i].x1 != storage[i].x2 && storage[i].x2 !=undefined){

        xx1 = CTG(storage[i].x1, "x")
        xx2 = CTG(storage[i].x2, "x")
        yy1 = CTG(storage[i].y1, "y")
        yy2 = CTG(storage[i].y2, "y")

        console.log(CTG(storage[i].x1, "x"),CTG(storage[i].x2, "x"),CTG(storage[i].y1, "y"),CTG(storage[i].y2, "y"))
        //pB = 10
      //  pC = 34
        pB =(yy1 - yy2 - (pA*(xx1**2)) + (pA*(xx2**2))) / (xx1 - xx2)
      //  pB = (CTG(storage[i].y1, "y") - CTG(storage[i].y2, "y") - pA * ((CTG(storage[i].x1, "x"))**2) + pA * ((CTG(storage[i].x2, "x"))**2)) / (CTG(storage[i].x1, "x") - CTG(storage[i].x2, "x"))
        pC = (CTG(storage[i].y2, "y") - pA * ((CTG(storage[i].x1, "x"))**2) - pB*(CTG(storage[i].x2, "x")))

        for(j = -10000; j < 10000; j++){
          //console.log(pA, pB, pC, CTG(storage[i].x1, "x"), CTG(storage[i].x2,"x"))
          if(CTC(j/10, "x") <screenWidth && CTC(j/10, "x") > 900 && CTC(pA * (j/10)**2 + pB * (j/20) + pC, "y") < screenWidth - 900 && CTC(pA * (j/10)**2 + pB * (j/20) + pC, "y") > 0){
            fillCircle(CTC(j/10, "x"), CTC(pA * (j/10)**2 + pB * (j/20) + pC, "y"), 2, makeColor(0,1,0))

          }
        }
      }

    }

  }


}


function onMouseMove(x, y){
  if(x >= 900 && y <= screenWidth - 890){
    //maybe one day something will be in here...
  }else{
    shouldDraw = false
  }
  mouseX = x;
  mouseY = y;
}
function drawLinear(){
  if(shouldDraw ==true){
    if(functionChoice == "line"){
      strokeLine(startX, startY, mouseX, mouseY, makeColor(.3,.3,.3), 2)
    }
  }
}


function drawCircle(){
  if(shouldDraw == true){
      if(functionChoice == "circle"){
        strokeCircle(startX, startY, sqrt((startX - mouseX)**2 +(startY - mouseY)**2),makeColor(.3,.3,.3), 2)

      }
  }
}

function drawPlaced(){
  for(i = 0; i < storage.length; i ++) {
    if(storage[i].type == "linear"){
      strokeLine(storage[i].x1,storage[i].y1,storage[i].x2,storage[i].y2, makeColor(0,0,0), 2)
    } else if(storage[i].type == "circle"){
      strokeCircle(storage[i].x1, storage[i].y1, sqrt((storage[i].x1 - storage[i].x2)**2 +(storage[i].y1 - storage[i].y2)**2),makeColor(.3,.3,.3), 2)
    }
  }
}


function selection(){
  if(mouseX >=220 && mouseX <=560){
    //in function section
    if(mouseY >=100 && mouseY <200){
      functionChoice = "line"
    }
    if(mouseY >=200 && mouseY <300){
      functionChoice = "circle"
    }
    if(mouseY >=300 && mouseY <400){
      functionChoice = "parabola"
    }
    if(mouseY >=400 && mouseY <500){
      functionChoice = "sine wave"
    }
    if(mouseY >=500 && mouseY <600){
      functionChoice = "exponential"
    }
    if(mouseY >=600 && mouseY <700){
      functionChoice = "hyperbola"
    }

  }
  console.log(functionChoice)
}

// Called 30 times or more per second
function onTick() {
//  console.log(510, CTG(510, "y"))
//  console.log(currentF)
  //console.log(storage.length)
    // Some sample drawing
    fillRectangle(0,0,screenWidth,screenHeight, makeColor(1,1,1))
    fillRectangle(0,0,220,80, makeColor(.8,.9,1))

    strokeLine(screenWidth/2 + 445, 5, screenWidth/2 + 445,screenWidth-895,  makeColor(0,0,0), 6)
    strokeLine(900, (screenWidth/2) - 455, screenWidth - 5,(screenWidth/2) - 455,  makeColor(0,0,0), 6)

    strokeLine(0,80,900,80,makeColor(0,0,0),3)

    strokeLine(220,0,220,screenHeight,makeColor(0,0,0),3)
    strokeLine(560,0,560,screenHeight,makeColor(0,0,0),3)
    strokeLine(895,0,895,screenHeight,makeColor(0,.9,.9),10)
    strokeLine(screenWidth-5,0,screenWidth-5,screenHeight,makeColor(0,.9,.9),10)
    strokeLine(900, screenHeight - 5, screenWidth, screenHeight - 5, makeColor(0,.9,.9), 10)
    fillText("Pert", 20, 50, makeColor(0,0,0), "50px Arial")
    fillText("Art", 110, 50, makeColor(.5,0,1), " bold 50px Arial")
    fillText("Functions", 250, 50, makeColor(.8,.2,.2), "45px Arial")
    fillText("Line", 250, 150, makeColor(1,.2,.2), "45px Arial")
    fillText("Circle", 250, 250, makeColor(.8,.2,.2), "45px Arial")
    fillText("Parabola", 250, 350, makeColor(.8,.2,.2), "45px Arial")
    fillText("Sine Wave", 250, 450, makeColor(.8,.2,.2), "45px Arial")
    fillText("Exponential", 250, 550, makeColor(.8,.2,.2), "45px Arial")
    fillText("Hyperbola", 250, 650, makeColor(.8,.2,.2), "45px Arial")



    fillText("Options", 580, 50, makeColor(.2,.8,.2), "45px Arial")

    strokeRectangle(895,5,screenWidth-900,screenWidth-900, makeColor(0,.9,.9), 10)
    drawLinear()
    drawParabola()
    makeEquation()
    drawCircle()
    drawPlaced()
    drawSine()
}
///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //
