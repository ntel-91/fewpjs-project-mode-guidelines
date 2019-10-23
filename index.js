let gridRows = 10;
let gridColumns = 10;
let currentPosition
let currentTetrominoDirection
let rotateDown
let currentTetromino
let intervalSpeed = 500

/// test direction
let left = [{x: -1, y: 0}, {x: -1, y: 0}, {x: -1, y: 0}, {x: -1, y: 0}]
let right = [{x: 1, y: 0}, {x: 1, y: 0}, {x: 1, y: 0}, {x: 1, y: 0}]
let down = [{x: 0, y: 1}, {x: 0, y: 1}, {x: 0, y: 1}, {x: 0, y: 1}]
NodeList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.map = Array.prototype.map

function createGrid(){
    const board = document.querySelector("#board")  
    for (let i=0; i < gridRows; i++){ // check if this is the rows?
      for (let j=0; j < gridColumns; j++){ // check if this the columns?
        board.insertAdjacentHTML("beforeend", `
          <div class="tile" data-x=${j} data-y=${i} data-id="" data-action=""></div>
        `)
      }
    }
}

function updateIndividualTile(position, dataId, dataAction){ 
    const tile = document.querySelector(`div[data-x="${position.x}"][data-y="${position.y}`)
    tile.id = dataId
    tile.dataset.action = dataAction
}

function updateTiles(position, dataId, dataAction){
    position.forEach(function(tile){
        updateIndividualTile(tile, dataId, dataAction)
    })
}

function createNewTetronimo(){
    currentTetromino = new TShape()
    
    let coordinates = currentTetromino.currentPosition
    let isOpen = true
    coordinates.forEach(function(coord){
        let block = document.querySelector(`div[data-x="${coord.x}"][data-y="${coord.y}`)
        if (block.dataset.action === 'deactive') {
            isOpen = false
        }
    })
    if (isOpen){
        updateTiles(currentTetromino.currentPosition, 'shape', 'active')
    } else {
        clearInterval(shapeDescend)
    }
}

function getActiveTetrominoPosition(){
    const tiles = document.querySelectorAll(".tile")
    let position = []
    tiles.forEach(function(tile){
        if (tile.dataset.action === 'active') {
            position.push(tile)
        }
    })
    return position
}

function getActiveTetrominoCoordinates(){
    const tiles = getActiveTetrominoPosition()
    let coordinates = tiles.map(function(tile){
        return {x: parseInt(tile.dataset.x), y: parseInt(tile.dataset.y)}
    })
    return coordinates
}

function getMovePosition(currentBlock, direction){
    const moveDirection = [parseInt(currentBlock.dataset.x) + direction.x, parseInt(currentBlock.dataset.y) + direction.y]
    return moveDirection
}

function checkMovePosition(moveDirection){ 
    const nextMove = document.querySelector(`div[data-x="${moveDirection[0]}"][data-y="${moveDirection[1]}`)
    if (nextMove) {    
        if (!(nextMove.dataset.action === 'deactive')) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

function checkTetrominoMovePosition(moveDirection){
    let isTrue = true
    let current = getActiveTetrominoPosition()
    for(let i = 0; i < current.length; i++){
        if (!checkMovePosition(getMovePosition(current[i], moveDirection[i]))){ 
            isTrue = false
        }  
    }
    return isTrue
}

function move(direction){
    let current = getActiveTetrominoPosition()
    let existing = []
    let next = []

    if (checkTetrominoMovePosition(direction)){
        for(let i = 0; i < current.length; i++){
            existing.push({x: parseInt(current[i].dataset.x), y: parseInt(current[i].dataset.y)})
            next.push({x: parseInt(current[i].dataset.x) + direction[i].x, y: parseInt(current[i].dataset.y) + direction[i].y})
        }
        updateTiles(existing, '', '')
        updateTiles(next, 'shape', 'active')    
    }
}

function rotate(){
    const dir = currentTetromino.currentTetrominoDirection
    switch(dir){
        case 'down':
            currentTetromino.currentTetrominoDirection = 'left'
            move(currentTetromino.rotateFromDownPosition)
            break;
        case 'left':
            currentTetromino.currentTetrominoDirection = 'up'
            move(currentTetromino.rotateFromLeftPosition)
            break;
        case 'up':
            currentTetromino.currentTetrominoDirection = 'right'
            move(currentTetromino.rotateFromUpPosition)
            break;
        case 'right':
            currentTetromino.currentTetrominoDirection = 'down'
            move(currentTetromino.rotateFromRightPosition)
    }
}

function run(){
    shapeDescend = setInterval(function(){
        if (checkTetrominoMovePosition(down)) {  
            move(down)
        } else {
            let current = getActiveTetrominoCoordinates()
            updateTiles(current, 'shape', 'deactive')
            addPoint()
            createNewTetronimo()
        }
      }, intervalSpeed)
}

function start(){
    createNewTetronimo()
    run()
}



document.addEventListener('keydown', function(event){
    if (event.key === "ArrowUp"){
        rotate()
    } else if (event.key === "ArrowRight") {
        move(right)
    } else if (event.key === "ArrowLeft") {
        move(left)
    } else if (event.key === "ArrowDown") {  
        move(down)
    }
})

document.addEventListener('click', function(event){
    if (event.target.id === 'start'){
        start()
    }
})

function addPoint(){
    const score = document.querySelector('#score').querySelector('span')
    let newScore = parseInt(score.innerText) + 1
    score.innerText = newScore
}

createGrid()
