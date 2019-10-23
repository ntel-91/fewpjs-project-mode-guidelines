class TShape {

//                        1               1              1
// down 1 2 3     left: 2 3         up: 2 3 4     right: 2 3        
//        4               4                              4
    constructor(){
        this.currentTetrominoDirection = 'down'
        this.currentPosition = [{x: 4, y: 1}, {x: 5, y:1}, {x: 6, y: 1}, {x: 5, y: 2}],
        this.rotateFromDownPosition = [{x: 1, y: -1}, {x: 0, y:0}, {x: -1, y: 1}, {x: -1, y: -1}]
        this.rotateFromLeftPosition = [{x: 1, y: 1}, {x: 1, y: -1}, {x: 0, y: 0}, {x: -1, y: -1}],
        this.rotateFromUpPosition = [{x: 1, y: 1}, {x: 1, y: -1}, {x: 0, y: 0}, {x: -1, y: 1}],
        this.rotateFromRightPosition = [{x: 1, y: 1}, {x: 0, y: 0}, {x: -1, y: 1}, {x: -1, y: -1}]
    }
}

