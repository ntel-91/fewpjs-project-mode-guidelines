let gridRows = 15;
let gridColumns = 10;
let currentPosition
let currentTetrominoDirection
let rotateDown
let currentTetromino
let currentTetrominoColor
let player
let intervalSpeed = 500
let left = [{x: -1, y: 0}, {x: -1, y: 0}, {x: -1, y: 0}, {x: -1, y: 0}]
let right = [{x: 1, y: 0}, {x: 1, y: 0}, {x: 1, y: 0}, {x: 1, y: 0}]
let down = [{x: 0, y: 1}, {x: 0, y: 1}, {x: 0, y: 1}, {x: 0, y: 1}]

NodeList.prototype.forEach = Array.prototype.forEach
NodeList.prototype.map = Array.prototype.map
NodeList.prototype.filter = Array.prototype.filter


/////// render user information 

function renderLogin(){
    const user = document.querySelector('#user')
    user.insertAdjacentHTML('beforeend',`
        <form id="login">
            <label for="name">Username: </label>
            <input id='username' type="text" name="name">
            <input type="submit" value="login">
        </form>
        
    `)
}

renderLogin()

// const createAccount = document.querySelector('#create-account')
// createAccount.addEventListener('click',function(event){
//     const body = {
//         first_name: usermame,
//         last_name: usermame,
//         username: usermame,
//     }
    
//     fetch(`http://localhost:3000/api/v1/users`,{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accepts": "application/json"
//         },
//         body: JSON.stringify(body)
//     })    
// })

function loginButton(){
    const form = document.querySelector('#login')
    form.addEventListener('submit',function(event){
        event.preventDefault()
        if (event.type === 'submit') {
            fetch(`http://localhost:3000/api/v1/users`)
            .then(res => res.json())
            .then(function(data){
                
                player = data.find(function(user){
                    return user.username === event.target.name.value
                })
                
                let previousGames
                if (player.games.length >= 3){
                    previousGames = player.games.slice(-3).reverse()
                } else {
                    previousGames = player.games.reverse()
                }

                const scores = player.games.map(function(game){
                    return game.score
                })
                renderUsername(player.username)
                renderHighScore(Math.max.apply(null, scores))
                renderPreviousGames(previousGames)
            })
        }
    })
}

loginButton()

function renderUsername(user){
    const userLogin = document.querySelector('#user')
    userLogin.innerHTML = ""
    userLogin.insertAdjacentHTML('beforeend',`Welcome, ${user}`)
}

function renderHighScore(score){
    const highscore = document.querySelector('#highscore')
    highscore.innerHTML = ""
    highscore.insertAdjacentHTML('beforeend',`
        Your HighScore: <span>${score}</span>
    `)
}

function renderPreviousGames(games){
    let str = ''
    games.forEach((game) => str = str + `<li>${game.score} points on: ${game.created_at.slice(0,10)}</li>`)
    
    const previousGames = document.querySelector('#previous-games')
    previousGames.insertAdjacentHTML('afterbegin',`
        <p>Previous Stack 'Em Scores</p>
        <ul id='previous-games-list'>
            ${str}
        </ul>
    `)
}

function createNewScore(score){
    const body = {
        score: score,
        user_id: player.id
    }
    fetch('http://localhost:3000/api/v1/games',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(function(data){
        if (getCurrentHighScore() < data.score){
            renderHighScore(data.score)
        }
        updatePreviousGames(data.score, data.created_at.slice(0,10))
    })
}

function getCurrentHighScore(){
    const highscore = document.querySelector('#highscore').querySelector('span')
    return parseInt(highscore.innerText)   
}

function updatePreviousGames(score, played){
    const gamesList = document.querySelector('#previous-games-list')
    gamesList.lastElementChild.remove()
    gamesList.insertAdjacentHTML('afterbegin',`
        <li>${score} points on: ${played}</li>
    `)
}

//////////////////// game features

function generateRandom(){
    return Math.floor((Math.random() * 7) + 1); 
}

const tetromino = {
    1: (() => new TShape()),
    2: (() => new IShape()),
    3: (() => new LShape()),
    4: (() => new OShape()),
    5: (() => new SShape()),
    6: (() => new JShape()),
    7: (() => new ZShape())
}

function createGrid(){
    const board = document.querySelector("#board")  
    for (let i=0; i < gridRows; i++){
      for (let j=0; j < gridColumns; j++){
        board.insertAdjacentHTML("beforeend", `
          <div class="tile" data-x=${j} data-y=${i} data-id="" data-action="" style=""></div>
        `)
      }
    }
}

function createNewTetronimo(){
    currentTetromino = tetromino[generateRandom()]()
    currentTetrominoColor = currentTetromino.color
    let coordinates = currentTetromino.currentPosition
    let isOpen = true
    coordinates.forEach(function(coord){
        let block = document.querySelector(`div[data-x="${coord.x}"][data-y="${coord.y}`)
        if (block.dataset.action === 'deactive') {
            isOpen = false
        }
    })
    if (isOpen){
        updateTiles(currentTetromino.currentPosition, 'shape', 'active', currentTetrominoColor)
    } else {
        clearInterval(shapeDescend)
        const score = document.querySelector('#score').querySelector('span')
        createNewScore(parseInt(score.innerText))
        
    }
}

function updateIndividualTile(position, dataId, dataAction, color){ 
    const tile = document.querySelector(`div[data-x="${position.x}"][data-y="${position.y}`)
    tile.id = dataId
    tile.dataset.action = dataAction
    tile.style = color
}

function updateTiles(position, dataId, dataAction, color){
    position.forEach(function(tile){
        updateIndividualTile(tile, dataId, dataAction, color)
    })
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
        updateTiles(existing, '', '', '')
        updateTiles(next, 'shape', 'active', currentTetrominoColor)    
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
            updateTiles(current, 'shape', 'deactive', currentTetrominoColor)
            //////////////
            // clearRow(current)
            addPoint()
            createNewTetronimo()

        }
      }, intervalSpeed)
}

function start(){
    createNewTetronimo()
    run()
}

function addPoint(){
    const score = document.querySelector('#score').querySelector('span')
    let newScore = parseInt(score.innerText) + 1
    score.innerText = newScore
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

createGrid()


///////////////////////

// function getUniqueYCords(tetromino){
//     let yCords = tetromino.map((tile) => parseInt(tile.y))
//     let arr = [];
//     for (let i = 0; i < yCords.length; i++) {
//         if (!arr.contains(yCords[i])) {
//         arr.push(yCords[i]);
//         }
//     }
//     return arr;
// }

// function clearRow(tetromino){
    
//     array = getUniqueYCords(tetromino)
//     debugger
//     // tetromino.forEach(function(tile){
//     //     if ()
//     // })
// }