import {Point} from "./point.js";
// diagram class which is a plot, function or array
export class Diagram {
    constructor(
        CartesianCoordinateSystem, 
        formula_to_plot, 
        color, 
        line_width){
        // link to CCS
        this.CartesianCoordinateSystem = CartesianCoordinateSystem;
        //style, like color, dash or solid
        this.diagramStyle = {
            diagramColor : color,
            diagramLineWidth : line_width
        }
        // range of the diagram
        this.range_x = {
            start_x : this.CartesianCoordinateSystem.range_x.start_x,
            end_x : this.CartesianCoordinateSystem.range_x.end_x
        }
        // formula to plot based on mathjs
        this.formula_to_plot = formula_to_plot;
        this.array_of_Points = [];
    }
    // resize range of x domain of a diagram
    resize_range_of_x(){
        this.range_x.start_x = this.CartesianCoordinateSystem.range_x.start_x;
        this.range_x.end_x = this.CartesianCoordinateSystem.range_x.end_x;
    }
    // create graph
    create_graph(){
        this.array_of_Points = [];
        // drawing plot
        var howmanypoints = 300;
        var s_range_x  = this.range_x.start_x;
        var e_range_x = this.range_x.end_x;
        var step = (e_range_x - s_range_x)/howmanypoints;
        let x_domain = s_range_x;
        // mathjs
        const node2 = math.parse(this.formula_to_plot);
        const code2 = node2.compile();

        while(x_domain < e_range_x){
            let scope = {
                x : x_domain
            };
            this.array_of_Points.push(new Point(x_domain, code2.evaluate(scope)));
            x_domain += step;

        }
    }
    // refresh graph
    refresh_graph(){
        this.resize_range_of_x();
        this.create_graph();
    }
    //change state of diagram
    change_the_color(new_color){
        this.diagramStyle.diagramColor = new_color;
    }
    change_the_lineWidth(new_linewidth){
        this.diagramStyle.diagramLineWidth = new_linewidth;
    }
    change_the_lineStyle(new_linestyle){
        this.diagramStyle.diagramLineStyle = new_linestyle;
    }
    // return array of points
    get_the_array_of_points(){
        
        return this.array_of_Points;
    }
    
    }

