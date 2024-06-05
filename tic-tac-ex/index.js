var board = document.getElementById('board');
if (board) {
    var cells = Array.from({ length: 9 }, function (_, index) {
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index.toString();
        cell.addEventListener('click', handleCellClick);
        return cell;
    });
    cells.forEach(function (cell) { return board.appendChild(cell); });
    var currentPlayer_1 = 'X';
    var winningCombos_1 = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    var boardState_1 = Array(9).fill('');
    function handleCellClick(ev) {
        var event = ev;
        var cellIndex = parseInt(event.target.dataset.index);
        if (boardState_1[cellIndex] === '' && !checkWinner()) {
            boardState_1[cellIndex] = currentPlayer_1;
            event.target.textContent = currentPlayer_1;
            currentPlayer_1 = currentPlayer_1 === 'X' ? 'O' : 'X';
        }
    }
    function checkWinner() {
        for (var _i = 0, winningCombos_2 = winningCombos_1; _i < winningCombos_2.length; _i++) {
            var combo = winningCombos_2[_i];
            var a = combo[0], b = combo[1], c = combo[2];
            if (boardState_1[a] && boardState_1[a] === boardState_1[b] && boardState_1[a] === boardState_1[c]) {
                alert("Player ".concat(boardState_1[a], " wins!"));
                return true;
            }
        }
        return false;
    }
}
else {
    console.error('Element with id "board" not found.');
}
