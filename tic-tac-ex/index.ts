const board = document.getElementById('board') as HTMLDivElement;

if (board) {
    const cells: HTMLDivElement[] = Array.from({ length: 9 }, (_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index.toString();
        cell.addEventListener('click', handleCellClick);
        return cell;
    });

    cells.forEach(cell => board.appendChild(cell));

    let currentPlayer: string = 'X';
    const winningCombos: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const boardState: string[] = Array(9).fill('');

    interface CustomEventTarget extends EventTarget {
        dataset: { index: string };
        textContent: string | null;
    }

    interface CustomMouseEvent extends MouseEvent {
        target: CustomEventTarget;
    }

    function handleCellClick(ev: MouseEvent) {
        const event = ev as CustomMouseEvent;
        const cellIndex = parseInt(event.target.dataset.index);
        if (boardState[cellIndex] === '' && !checkWinner()) {
            boardState[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner(): boolean {
        for (const combo of winningCombos) {
            const [a, b, c]: number[] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                alert(`Player ${boardState[a]} wins!`);
                return true;
            }
        }
        return false;
    }
} else {
    console.error('Element with id "board" not found.');
}