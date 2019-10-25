class OShape {

    constructor(){
        this.currentTetrominoDirection = 'down'
        this.currentPosition = [{x: 5, y: 0}, {x: 6, y:0}, {x: 5, y: 1}, {x: 6, y: 1}],
        this.rotateFromDownPosition = [{x: 0, y: 0}, {x: 0, y:0}, {x: 0, y: 0}, {x: 0, y: 0}]
        this.rotateFromLeftPosition = [{x: 0, y: 0}, {x: 0, y:0}, {x: 0, y: 0}, {x: 0, y: 0}],
        this.rotateFromUpPosition = [{x: 0, y: 0}, {x: 0, y:0}, {x: 0, y: 0}, {x: 0, y: 0}],
        this.rotateFromRightPosition = [{x: 0, y: 0}, {x: 0, y:0}, {x: 0, y: 0}, {x: 0, y: 0}]
        this.color = 'background-color:yellow'
    }
}

// var i = { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   };
// var j = { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   };
// var l = { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' };
// var o = { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' };
// var s = { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  };
// var t = { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' };
// var z = { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    };

//       0 1 2 0         0 0 0 0         0 1 0 0            0 0 0 0
// down: 0 0 3 0   left: 0 0 0 0     up: 0 2 0 0     right: 0 0 0 0
//       0 0 4 0         1 2 3 4         0 3 0 0            1 2 3 4
