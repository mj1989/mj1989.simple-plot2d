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


//listener for add button
const addDiagramButton = document.getElementById('add_diagram_button');
let removeDiagramButtons = document.getElementsByClassName('remove_diagram_button');

// adding new div element with diagram
function addDiagramDiv(){
    // random color
    let random_color = 'rgb('+Math.random()*255+', '+Math.random()*255+', '+Math.random()*255+')';
    // get string of formula to plot
    let stringFormulatoPlot = document.getElementById('formula_value').value;
    // instert and create HTML to add at the end
    menu.lastElementChild.insertAdjacentHTML('afterend',
    `<div class="diagram">
        <div class="diagramsectionlvl1">
            <div style="width: 35%; height: 5px; background-color: ${random_color};"></div>
            <button class="close-button buttongray" aria-label="Close alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="diagramsectionlvl2">
            ${stringFormulatoPlot}
        </div>
    </div>`);

    removeDiagramButtons = document.getElementsByClassName('remove_diagram_button');
    removeDiagramButtons.forEach(remDiagramButton => {
        remDiagramButton.addEventListener('click', removeLastDiagramDiv);
    });
    // adding plot
    
    someCartesianCS.append_diagram_to_list(new Diagram(
        someCartesianCS,
        stringFormulatoPlot,
        random_color, 0.7));
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();
    
    
}
function removeLastDiagramDiv(){
    //when childNodes.lenght is 3 it means that we have only controller left in the UI
    //so if statement is to ensure to not delete controller
    if(menu.childNodes.length == 3) return;
    menu.lastElementChild.remove();
    someCartesianCS.remove_last_diagram_from_list();
    someCartesianCS.draw_entire_ccs();
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();
    

}
// event listener for add button
addDiagramButton.addEventListener('click', addDiagramDiv);
removeDiagramButtons.forEach(remDiagramButton => {
    remDiagramButton.addEventListener('click', removeLastDiagramDiv);
});


















