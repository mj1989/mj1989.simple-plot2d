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
// for removee last diagram
let removeDiagramButtons = document.getElementsByClassName('remove_diagram_button');
// for close arbitrary diagram
let removeGivenDiagramButtons = document.getElementsByClassName('close-button');

// adding new div element with diagram
function addDiagramDiv(){

    // random color
    let random_color = 'rgb('+Math.random()*255+', '+Math.random()*255+', '+Math.random()*255+')';
    // get string of formula to plot
    let stringFormulatoPlot = document.getElementById('formula_value').value;
    
    // adding plot   
    let addedDiagram =  new Diagram(
        someCartesianCS,
        stringFormulatoPlot,
        random_color, 0.7);
    someCartesianCS.append_diagram_to_list(addedDiagram);
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();
    // get index of added diagram
    let indexDiagram = someCartesianCS.list_of_diagrams.indexOf(addedDiagram);
    // instert and create HTML to add at the end
    let appostrof = '`';
    menu.lastElementChild.insertAdjacentHTML('afterend',
    `<div class="diagram" id="diag${indexDiagram}">
        <div class="diagramsectionlvl1">
            <div style="width: 35%; height: 5px; background-color: ${random_color};"></div>
            <input id="${indexDiagram}" class="close-button buttongray"  type="button" value="&times;">
        </div>
        <div class="diagramsectionlvl2">
            ${appostrof}${stringFormulatoPlot}${appostrof}
        </div>
    </div>`);
    
    // use mathjax to render ASCII Math 
    MathJax.Hub.Typeset();
    
    // add listner for removing last diagram
    removeDiagramButtons = document.getElementsByClassName('remove_diagram_button');
    removeDiagramButtons.forEach(remDiagramButton => {
        remDiagramButton.addEventListener('click', removeLastDiagramDiv);
    });
    // add listener for removing given diagram
    // for close arbitrary diagram
    removeGivenDiagramButtons = document.getElementsByClassName('close-button');
    
    removeGivenDiagramButtons.forEach(closeDiagramButton =>{
        
        closeDiagramButton.addEventListener('click', closeGivenDiagram);
    });
    
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
function closeGivenDiagram(button){
    
    let path = button.composedPath();
    //let idName = button.path[0].getAttribute('id');
    let idName = path[0].getAttribute('id');
    let divById = document.getElementById('diag'+idName);
       
    
    someCartesianCS.remove_diagram_by_ID(idName);
    divById.remove();


    someCartesianCS.draw_entire_ccs();
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();   
    
    removeGivenDiagramButtons = document.getElementsByClassName('close-button');
    
    let index = 0;
    let diagramsDivs = document.getElementsByClassName('diagram');
    diagramsDivs.forEach(diagram =>{
        diagram.setAttribute('id', 'diag'+index);
        index++;
    });
    
    index=0;
    removeGivenDiagramButtons.forEach(closeDiagramButton =>{
        
        closeDiagramButton.setAttribute('id', index);
        index++;
    });

     // add listener for removing given diagram
    // for close arbitrary diagram
    removeGivenDiagramButtons = document.getElementsByClassName('close-button');
    
    removeGivenDiagramButtons.forEach(closeDiagramButton =>{
        
        closeDiagramButton.addEventListener('click', closeGivenDiagram);
    });
    
    
}
// event listener for add button and remove last
addDiagramButton.addEventListener('click', addDiagramDiv);
removeDiagramButtons.forEach(remDiagramButton => {
    remDiagramButton.addEventListener('click', removeLastDiagramDiv);
});

 // add listener for removing given diagram
    // for close arbitrary diagram
    removeGivenDiagramButtons = document.getElementsByClassName('close-button');
    
    removeGivenDiagramButtons.forEach(closeDiagramButton =>{
        
        closeDiagramButton.addEventListener('click', closeGivenDiagram);
    });

















