# Simple Plot2d
Descrption: The goal of this project is pure didactic purpose. Which is better understanding of javascript and canvas...
## Done
1. user can add and delete diagrams
    - user can add/delete like in stack
    - user can add/delete arbitrary diagram
2. user interface
    - there is monitor with messages and errors
    - there is brief help how to user syntax in mathjs
    - implementation of displaying coordinates of points
    - highliting of diagram
3. code is clear and understable
4. make variable and method names to be unambiguous and understandable
## Problems
1. Wrong plotting of very fast changing functions and functions with asymptots or functions with discontinuities. Status is unsolved, but I have some ideas how to solve this problems. For now note that when you plot easy, smooth function like sin(x^2)/x^2 everything looks ok, but function which changes very fast like sin(x^8)/x^4 will look terrible and problem is that plot has to little points in regions where function changes fast.
## MathJS
In this project I use math.js file from the MathJs project. Reason of that is easy to handle parser and evaluation of mathematic formula in the string form.
This math.js is pure js file from the project https://mathjs.org/, entire repo can be found here https://github.com/josdejong/mathjs, this is version 10.1.1 based on the Apache License https://github.com/josdejong/mathjs/blob/develop/LICENSE
## MathJax
In this project is use CDN MathJax file to render math expresions to look nice. MathJax repo https://github.com/mathjax/MathJax and based on the Apache License 2.0 https://github.com/mathjax/MathJax/blob/master/LICENSE
