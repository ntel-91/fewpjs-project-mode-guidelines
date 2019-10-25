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
        this.color = 'background-color:purple'
    }
}

// var i = { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   };
// var j = { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   };
// var l = { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' };
// var o = { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' };
// var s = { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  };
// var t = { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' };
// var z = { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    };