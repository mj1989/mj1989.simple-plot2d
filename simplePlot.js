import {Diagram} from "./diagram.js";
import {CartesianCoordinateSystem} from "./cartesiancoordinatesystem.js";

// load canvas and set up contect for drawing 2d
const myCanvas = document.getElementById("simpleCanvas");


// set up canvas width and height and its position (margin left)
myCanvas.width = window.innerWidth/2;
myCanvas.height = window.innerHeight*2/3;
var margin_left = window.innerWidth/4;
myCanvas.style.left = margin_left.toString()+'px';
myCanvas.style.position = 'absolute';

// create object and draw axis
var someCartesianCS = new CartesianCoordinateSystem(myCanvas, 1, 5);
someCartesianCS.draw_entire_ccs();

// create diagram
// Diagram(string formula, ragne start x, range end x, color, line-width, linestyle)

var someDiagram = new Diagram(
    someCartesianCS,
    '2*cos(10*x)*exp(-x^2)',
    'blue', 2);
var secondDiag = new Diagram(
    someCartesianCS,
    'sin(x)',
    'red', 1);
var thirdDiag = new Diagram(
    someCartesianCS,
    'sin(x)*sin(x)+1',
    'green', 0.5);

var linearDiagram = new Diagram(
    someCartesianCS,
    'x',
    'yellow', 0.6);

var quadraticDiagram = new Diagram(
    someCartesianCS,
    'x^2',
    'purple', 0.7);
someCartesianCS.append_diagrams_to_list([secondDiag, thirdDiag, someDiagram, linearDiagram, quadraticDiagram]);
someCartesianCS.draw_diagrams();
someCartesianCS.plot_diagrams();

// how to move entire ccs with diagrams?
let is_ccs_movig = false;
let xxx = 0;
let yyy = 0;
function startPosition(e){
    is_ccs_movig = true;
    xxx = e.offsetX;
    yyy = e.offsetY;
}
function finishedPosition(){
    is_ccs_movig = false;
}
// moving entire coordinate system and all diagram like a map
function move_ccs_and_diagrams(e){
    if(!is_ccs_movig) return;
    //console.log(someCartesianCS);
    //someCartesianCS.change_origin_x_y_absolute(e.offsetX, e.offsetY);
    
    someCartesianCS.change_origin_x_y_relevant(e.offsetX-xxx, e.offsetY-yyy);
    someCartesianCS.draw_entire_ccs();
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();
    xxx = e.offsetX;
    yyy = e.offsetY;

}

// adding event listeners to my canvas
myCanvas.addEventListener("mousedown", startPosition);
myCanvas.addEventListener("mouseup", finishedPosition);
myCanvas.addEventListener("mousemove", move_ccs_and_diagrams);


// resizing, scalling entire coordinate systems with ticks and diagrams
function resize_ccs_and_diagrams(wheel) {
  // Do something with the scroll position
   someCartesianCS.change_scale(wheel.deltaY,wheel.deltaY)
   someCartesianCS.draw_entire_ccs();
   someCartesianCS.draw_diagrams();
   someCartesianCS.plot_diagrams();
}

myCanvas.addEventListener("wheel", resize_ccs_and_diagrams);


















