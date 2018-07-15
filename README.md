# Prism.js, a geometric art tool

## Introduction:

## How to use Prism:

## Drawing:

## Controls:

## Optimization:
* Prism slows down after the strokes array grows too large. Since the canvas have to draw all the triangles in strokes every single frame, this takes a large toll on performance and frame rate.
* The current solution is to maintain two canvases: 
    1.  one canvas which maintains the 10 most recent strokes. This will have a transparent background
    2.  one canvas which doesn't loop and only draws the triangles which are 10 strokes before the **currentStroke** variable
* Once another stroke is drawn, the oldest stroke in the working canvas will be popped into the strokes array in the no looping canvas
* Once it comes time to export, a new canvas element is created, then two of the canvas element will be drawn onto this new canvas. The canvas is downloaded into the user's computer as a jpeg, then this canvas is deleted, incase the user wants to keep drawing.