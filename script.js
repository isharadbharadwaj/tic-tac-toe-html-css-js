$(document).ready(function () {
    let currentPlayer = 'X';
    let lastWinner = null;
    const cells = $('.cell');

    cells.on('click', function () {
        const cell = $(this);
        if (!cell.text()) {
            cell.text(currentPlayer);
            cell.addClass(currentPlayer.toLowerCase());
            if (checkWin()) {
                lastWinner = currentPlayer;
                $('#status').text(currentPlayer + ' wins!');
                cells.off('click');
                start();
            } else if (checkDraw()) {
                $('#status').text('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                $('#status').text(currentPlayer + '\'s turn');
            }
        }
    });

    $('#restart').on('click', function () {
        cells.text('');
        cells.removeClass('x o');
        if (lastWinner !== null) {
            currentPlayer = lastWinner === 'X' ? 'O' : 'X';
        } else {
            currentPlayer = 'X';
        }
        $('#status').text(currentPlayer + '\'s turn');
        cells.on('click', clickHandler);
        stop();
    });

    function clickHandler() {
        const cell = $(this);
        if (!cell.text()) {
            cell.text(currentPlayer);
            cell.addClass(currentPlayer.toLowerCase());
            if (checkWin()) {
                lastWinner = currentPlayer;
                $('#status').text(currentPlayer + ' wins!');
                cells.off('click');
                start();
            } else if (checkDraw()) {
                $('#status').text('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                $('#status').text(currentPlayer + '\'s turn');
            }
        }
    }

    function checkWin() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (cells.eq(a).text() && cells.eq(a).text() === cells.eq(b).text() && cells.eq(a).text() === cells.eq(c).text()) {
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return !Array.from(cells).some(cell => !cell.textContent);
    }

    const start = () => {
        setTimeout(function () {
            confetti.start()
        }, 1000);
    };
    const stop = () => {
        setTimeout(function () {
            confetti.stop()
        }, 1000);
    };
});
