// definition of the class the coordinate system
export class CartesianCoordinateSystem {
    constructor(canvas, step_xy, ticksize){
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        // set the default origin of CCS placed in the center of the canvas
        this.origin = {
            x : this.width/2,
            y : this.height/2
        }
        // set step_xy which is lenght between tick on x and y axis
        this.step_xy = step_xy;
        // and set tick size which is lenght of a ticks on x and y axis
        this.ticksize = ticksize;
        // set axis x and y scales and ranges
        // idea is to go from width and height in pixeld to xy coord
        this.scale_x = 100; // 40px is one, 80px is two
        this.scale_y = 100;
        // auto range for x and y
        // idea is to make auto maximum range to span acroos all width and hight
        this.range_x = {
            start_x : -1*this.origin.x / this.scale_x,
            end_x : ( this.width - this.origin.x) / this.scale_x
        };
        this.range_y = {
            start_y: -1*this.origin.y / this.scale_y,
            end_y: (this.width - this.origin.y) / this.scale_y
        };

        // set x and y axis style
        this.context.strokeStyle='black';
        this.context.lineWidth=0.5;

        // plan some plave for list of diagrams
        this.list_of_diagrams = [];
        
    }
    // add entire vector
    append_diagrams_to_list(aDiagrams){
        this.list_of_diagrams = aDiagrams;
    }
    // add a diagram to the list
    append_diagram_to_list(aDiagram){
        this.list_of_diagrams.push(aDiagram);
    }
    // remove a diagram from the list
    remove_last_diagram_from_list(){
        this.list_of_diagrams.pop();
    }
    //draw diagrams
    draw_diagrams(){
        this.list_of_diagrams.forEach(diagram => {
            diagram.refresh_graph();
        });
    }
    // plot diagrams
    plot_diagrams(){
        this.list_of_diagrams.forEach(diagram => {
            this.plot_array_2d(diagram);
        })
    }
    // set up absolute origin cooridnates for Cartesian Coordinate System
    change_origin_x_y_absolute(x, y){
        this.origin.x = x;
        this.origin.y = y;
        this.range_x = {
            start_x : -1*this.origin.x / this.scale_x,
            end_x : ( this.width - this.origin.x) / this.scale_x
        };
        this.range_y = {
            start_y: -1*this.origin.y / this.scale_y,
            end_y: (this.width - this.origin.y) / this.scale_y
        };
    };
    // set up relevant origin coorinates for CCS based on previous origin
    // where dx, dy is change of x,y with direction + right and - left for x;
    // abd + for up and - down for y
    change_origin_x_y_relevant(dx, dy){
        this.origin.x = this.origin.x + dx;
        this.origin.y = this.origin.y + dy;
        this.range_x = {
            start_x : -1*this.origin.x / this.scale_x,
            end_x : ( this.width - this.origin.x) / this.scale_x
        };
        this.range_y = {
            start_y: -1*this.origin.y / this.scale_y,
            end_y: (this.width - this.origin.y) / this.scale_y
        };
        
    }
    // changing scale for scrolling effect
    change_scale(kx, ky){
        if(this.scale_x + kx/10 < 5) return;
        if(this.scale_x + kx/10 > 250) return;
        this.scale_x = this.scale_x + kx/10;
        this.scale_y = this.scale_y + ky/10;
        // scalling ticks for x and y axis
        if(kx < 0 && this.ticksize > 1){
            this.ticksize = this.ticksize - 2;
        }
        if(kx > 0){
            this.ticksize = this.ticksize + 2;
        }
        
        
        this.change_origin_x_y_absolute(this.origin.x, this.origin.y);
    }



    // draw x-axis method
    draw_x_axis(){
        //draw x-axis from the origin to the left
        this.context.beginPath();        
        this.context.moveTo(
            this.origin.x, 
            this.origin.y
        );
        this.context.lineTo(
            0,
            this.origin.y
        );
        this.context.stroke();
        
        //draw x-axif from the origin to the right
        this.context.beginPath();
        this.context.moveTo(
            this.origin.x,
            this.origin.y
        );
        this.context.lineTo(
            this.origin.x+(this.width-this.origin.x),
            this.origin.y
        );
        this.context.stroke();
    }
    // draw y-axis method
    draw_y_axis(){
        //draw y-axis from the origin to the left
        this.context.beginPath();        
        this.context.moveTo(
            this.origin.x, 
            this.origin.y
        );
        this.context.lineTo(
            this.origin.x,
            0
        );
        this.context.stroke();
        
        //draw x-axif from the origin to the right
        this.context.beginPath();
        this.context.moveTo(
            this.origin.x,
            this.origin.y
        );
        this.context.lineTo(
            this.origin.x,
            this.origin.y+(this.height-this.origin.y)
        );
        this.context.stroke();
    }
    // draw x and y axis
    draw_x_and_y_axis(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.draw_x_axis();
        this.draw_y_axis();
    }
    // draw a tick for an axis
    draw_tick(x, y, lenght_x, lenght_y){
        this.context.beginPath();
        this.context.moveTo(x,y);
        this.context.lineTo(x+lenght_x/2,y+lenght_y/2);
        this.context.stroke();
        this.context.beginPath();
        this.context.moveTo(x,y);
        this.context.lineTo(x-lenght_x/2,y-lenght_y/2);
        this.context.stroke();

    }
    // draw ticks for x axis
    draw_ticks_for_x(){
        var step_x = this.step_xy;
        var step = step_x * this.scale_x;
        
        let index = 1;
        while(index*step_x < Math.abs(this.range_x.end_x) || index*step_x < Math.abs(this.range_x.start_x)){
            this.draw_tick(this.origin.x + index * step, this.origin.y, 0, this.ticksize);
            this.draw_tick(this.origin.x - index * step, this.origin.y, 0, this.ticksize);
            index++;
        }
     
    }
    // draw ticks for y axis
    draw_ticks_for_y(){
        var step_y = this.step_xy;
        var step = step_y * this.scale_y;
        
        let index = 1;
        while(index*step_y < Math.abs(this.range_y.end_y) || index*step_y < Math.abs(this.range_y.start_y) ){
            this.draw_tick(this.origin.x, this.origin.y + index * step, this.ticksize, 0);
            this.draw_tick(this.origin.x, this.origin.y - index * step, this.ticksize, 0);
            index++;
        }
       
    }
    // reset style
    reset_style(){
        //reset style
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 0.3;
    }
    // draw entire ccs, axes, ticks
    draw_entire_ccs(){
        //reset style
        this.reset_style();
        //draw x,y and ticks
        this.draw_x_and_y_axis();
        this.draw_ticks_for_x();
        this.draw_ticks_for_y();
    }
    
    // plot an array 
    plot_array_2d(someDiagram){       
        //set style based on Diagram properties
        this.context.strokeStyle = someDiagram.diagramStyle.diagramColor;
        this.context.lineWidth = someDiagram.diagramStyle.diagramLineWidth;
      
        let index = 0;
        while(index < someDiagram.array_of_Points.length-1){
            
            this.context.beginPath();           
            this.context.moveTo(
                this.origin.x +
                someDiagram.array_of_Points[index].x*this.scale_x,                 
                this.origin.y-someDiagram.array_of_Points[index].y*this.scale_y);

            this.context.lineTo(
                this.origin.x +
                someDiagram.array_of_Points[index+1].x*this.scale_x,
                this.origin.y-someDiagram.array_of_Points[index+1].y*this.scale_y);   
            this.context.stroke();            
            index++;
         }  

    }
}