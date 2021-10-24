import {Component} from "react";
import Board from "../Board/Board";
import './Game.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                {squares: Array(9).fill(null)} //массив из объектов
            ],
            step: 0,
            xIsNext: true,
        };
    }

    onClickHandler(i) {
        const history = this.state.history.slice(0, this.state.step + 1);
        const current = history[history.length - 1];
        const squares = current.squares.concat();

        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat({
                squares: squares,
            }),
            step: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpOnStepHandler(step) {
        this.setState({
            step: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.step];
        const winner = calculateWinner(current.squares)

        let winnerText;
        if (winner) {
            winnerText = <h4>Победитель: {winner}</h4>;
        } else if (!winner && history.length === 10) {
            winnerText = <h4>Ничья!</h4>
        } else {
            winnerText = <h4>Следующий ход: {this.state.xIsNext ? 'X' : 'O'}</h4>;
        }

        return(
            <div className="game">
                <h1>Крестики-нолики</h1>
                <Board
                    squares={current.squares}
                    onClick={(i) => this.onClickHandler(i)}
                />
                <div className="content">
                    {winnerText}
                    <h4>Ваши ходы:</h4>
                    <ul className="content-list">
                        {history.map((squares, step) => {
                            const message = step ? `Вернуться на шаг №${step}` : 'Вернуться к началу игры';
                            return (
                                <li
                                    key={step}
                                    onClick={() => this.jumpOnStepHandler(step)}
                                >{message}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}