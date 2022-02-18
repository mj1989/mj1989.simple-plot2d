import {Diagram} from "./diagram.js";
import {CartesianCoordinateSystem} from "./cartesiancoordinatesystem.js";

// load canvas and set up contect for drawing 2d
const myCanvas = document.getElementById("simpleCanvas");


// set up canvas width and height
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight*0.8;



// create object and draw axis
var someCartesianCS = new CartesianCoordinateSystem(myCanvas, 1, 5);
someCartesianCS.draw_entire_ccs();

// create diagram
// Diagram(string formula, ragne start x, range end x, color, line-width, linestyle)



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

/*
* front end section for UI
* interation goal is to add new diagram and remove
*/
const menu = document.getElementById('menu');
console.log(menu);

//listener for add button
const addDiagramButton = document.getElementById('add_diagram_button');
let removeDiagramButtons = document.getElementsByClassName('remove_diagram_button');

// testme
function addDiagramDiv(){
    let stringFormulatoPlot = document.getElementById('formula_value').value;
        menu.lastElementChild.insertAdjacentHTML('afterend',
    '<div class="diagram">'+
    '<form action="">'+
    '<label for="fformula">formula:</label>'+
    '<input type="text" value="' + stringFormulatoPlot +'">'+
    '</form></div>');
    removeDiagramButtons = document.getElementsByClassName('remove_diagram_button');
    removeDiagramButtons.forEach(remDiagramButton => {
        remDiagramButton.addEventListener('click', removeLastDiagramDiv);
    });
    //adding plot
    // random color
    let random_color = 'rgb('+Math.random()*255+', '+Math.random()*255+', '+Math.random()*255+')';
    someCartesianCS.append_diagram_to_list(new Diagram(
        someCartesianCS,
        stringFormulatoPlot,
        random_color, 0.7));
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();
    console.log(someCartesianCS.list_of_diagrams);
    
}
function removeLastDiagramDiv(){
    menu.lastElementChild.remove();
    someCartesianCS.remove_last_diagram_from_list();
    someCartesianCS.draw_entire_ccs();
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();
    console.log(someCartesianCS.list_of_diagrams);

}
// event listener for add button
addDiagramButton.addEventListener('click', addDiagramDiv);
removeDiagramButtons.forEach(remDiagramButton => {
    remDiagramButton.addEventListener('click', removeLastDiagramDiv);
});


















