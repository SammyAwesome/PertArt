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
}


// Called 30 times or more per second
function onTick() {
    // Some sample drawing
    fillRectangle(0,0,screenWidth,screenHeight, makeColor(1,1,1))
    fillRectangle(0,0,220,80, makeColor(.8,.9,1))

    strokeLine(screenWidth - (895/2), 0, screenWidth-(895/2),screenWidth-900,  makeColor(0,0,0), 6)
    strokeRectangle(895,0,screenWidth-900,screenWidth-900, makeColor(0,.9,.9), 10)
    fillText("Pert",
             20,
             55,
             makeColor(0, 0, 0),
             "50px Arial");
             fillText("Art",
                      110,
                      55,
                      makeColor(.5, 0, 1),
                      "50px Arial");
}


///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //
