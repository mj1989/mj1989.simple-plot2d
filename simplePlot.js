import {Diagram} from "./diagram.js";
import {CartesianCoordinateSystem} from "./cartesiancoordinatesystem.js";

// load canvas and set up contect for drawing 2d
const myCanvas = document.getElementById("simpleCanvas");

// set up canvas width and height
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight*0.8;

// create object and draw axis
var someCartesianCS = new CartesianCoordinateSystem(myCanvas, 1, 5);
// link myCanvas to someCartesianCS it is a pointer to CCS
myCanvas.pointerToCSS = someCartesianCS;
someCartesianCS.draw_entire_ccs();

// adding event listeners to my canvas regarding moving css and diagrams
myCanvas.addEventListener("mousedown", someCartesianCS.startPosition);
myCanvas.addEventListener("mouseup", someCartesianCS.finishedPosition);
myCanvas.addEventListener("mousemove", someCartesianCS.move_ccs_and_diagrams);


// resizing, scalling entire coordinate systems with ticks and diagrams
function resize_ccs_and_diagrams(wheel) {
  // Do something with the scroll position
   someCartesianCS.change_scale(wheel.deltaY,wheel.deltaY)
   someCartesianCS.drawAll();
   someCartesianCS.draw_pointer_coords(
       (wheel.clientX-someCartesianCS.origin.x)/someCartesianCS.scale_x, 
       (-wheel.clientY+someCartesianCS.origin.y)/someCartesianCS.scale_y);
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
    let appostrof = '`';
    
    var expr = math.parse(stringFormulatoPlot);
    // a and b do not yet exist...
    if(expr.evaluate({x:1}) == Infinity) return

    try {
        let scope = {
            x : 1
        }
        expr.evaluate(scope);
        document.getElementById('error').innerHTML = `Added: ${appostrof}${stringFormulatoPlot}${appostrof}`;
        document.getElementById('error').setAttribute('class', 'not-error');
        // use mathjax to render ASCII Math 
        //MathJax.Hub.Typeset();
    }
    catch (err) {
        document.getElementById('error').innerHTML = err.toString(); // Error: Undefined symbol a
        document.getElementById('error').setAttribute('class', 'error');
        return
    }
    // adding plot   
    let addedDiagram =  new Diagram(
        someCartesianCS,
        stringFormulatoPlot,
        random_color, 
        0.7,
        someCartesianCS.list_of_diagrams.length);

        
    someCartesianCS.append_diagram_to_list(addedDiagram);
    someCartesianCS.draw_diagrams();
    someCartesianCS.plot_diagrams();
    // get index of added diagram
    let indexDiagram = someCartesianCS.list_of_diagrams.indexOf(addedDiagram);
    // instert and create HTML to add at the end
    
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
    document.getElementById('error').innerHTML = `Removed last diagram`;
    someCartesianCS.drawAll();
       

}
function closeGivenDiagram(button){
    
    let path = button.composedPath();
    //let idName = button.path[0].getAttribute('id');
    let idName = path[0].getAttribute('id');
    let divById = document.getElementById('diag'+idName);

       
    
    someCartesianCS.remove_diagram_by_ID(idName);
    document.getElementById('error').innerHTML = `Removed diagram`;
    divById.remove();


    someCartesianCS.drawAll();
    
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

//show x y of the pointer/mouse
function show_pointer_x_y(pointer){
    let pointerX = (pointer.offsetX-someCartesianCS.origin.x)/someCartesianCS.scale_x;
    let pointerY = (-pointer.offsetY+someCartesianCS.origin.y)/someCartesianCS.scale_y;
    
    someCartesianCS.draw_pointer_coords(pointerX, pointerY);
}

// highlighting diagram when pointer is on diagram
function highlight_pointer_x_y(pointer){
    let pointerX = (pointer.offsetX-someCartesianCS.origin.x)/someCartesianCS.scale_x;
    let pointerY = (-pointer.offsetY+someCartesianCS.origin.y)/someCartesianCS.scale_y;
     // I will try to use same pointer event to track if coursor is over a diagram
    //console.log(pointerX, pointerY);
    someCartesianCS.list_of_diagrams.forEach(diagram => {
        
        let tempDiagramDiv = document.getElementById('diag'+ diagram.diagramID.toString());
        //for each diagram on the list check if tracked x,y of courses fit to points of diagram
        //with some tolerance, if tolerance = 0 then we look for exactly same X,Y
        let tolerance = 0.1;
        
        diagram.hasPoint(pointerX, pointerY, tolerance);

        if(diagram.isHighlighted){
            someCartesianCS.drawAll(); 
            someCartesianCS.draw_pointer_coords(pointerX, pointerY);
            //console.log(diagram.diagramID);
            tempDiagramDiv.setAttribute('class', 'highlight');
            
        }
        else{
            //diagram.isHighlighted = false;
            someCartesianCS.drawAll();
            someCartesianCS.draw_pointer_coords(pointerX, pointerY);
            tempDiagramDiv.setAttribute('class', 'no-highlight');
        }
        
    });
}
// mouse coordinates trakcher inside the canvas
// to show point x and y to let user examine more the diagram
let mouseTracker = document.getElementById('simpleCanvas');
//adding event listener to mouse tracker.
mouseTracker.addEventListener("mousemove", show_pointer_x_y);
//adding event listener for highlighting.
mouseTracker.addEventListener("mousemove", highlight_pointer_x_y);














