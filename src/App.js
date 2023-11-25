import { useState, useRef, useEffect } from 'react';
import Cell from './Cell.js';
const interval = 56;

function App() {

    var newArray;
    const gridElement = useRef(null);

    // All user-defined states.

    const [grid, setGrid] = useState(Array(5).fill().map(row => new Array(5).fill(<Cell />)));
    const [state, setState] = useState("wall");
    const [start, setStart] = useState({ x: 0, y: 0 });
    const [end, setEnd] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouse] = useState(false);

    // Window functions to control and detect mouse functions.

    window.onmousedown = (e) => { setMouse(true); }
    window.onmouseup = (e) => { setMouse(false); }
    window.onblur = (e) => { setMouse(false); }

    // Additional window function to change size of grid and update flags.

    window.onresize = () => {
        initializeGrid();
        resetEnd();
    };

    // Universal State: Wall, Start, End -> State when entering cell with MouseDown, determines distinct functionality

    const changeState = (temp) => {
        setState(temp);
    }

    // Reset END

    const resetEnd = () => {
        var row = Math.floor((window.innerHeight - 86) / interval);
        var col = Math.floor(window.innerWidth / interval);
        setEnd({ x: col - 1, y: row - 1});
    }

    // Update GRID 

    const initializeGrid = () => {

        var row = Math.floor((window.innerHeight - 86) / interval);
        var col = Math.floor(window.innerWidth / interval);

        newArray = new Array(row);

        for (var i = 0; i < row; i++) {
            newArray[i] = new Array(col);
            for (var j = 0; j < col; j++) {
                newArray[i][j] = <Cell key={i * col + j} start={i === start.y && j === start.x} end={i === end.y && j === end.x} currentState={state} changeState={changeState} data={mouseDown} />
            }
        }
        setGrid(newArray);
    }

    // Reset GRID

    const resetGrid = () => {

        var row = Math.floor((window.innerHeight - 86) / interval);
        var col = Math.floor(window.innerWidth / interval);

        setStart({ x: 0, y: 0 });
        resetEnd();

        newArray = new Array(row);

        for (var i = 0; i < row; i++) {
            newArray[i] = new Array(col);
            for (var j = 0; j < col; j++) {
                newArray[i][j] = <Cell key={i * col + j} initial={"clear"} start={i === start.y && j === start.x} end={i === end.y && j === end.x} currentState={state} changeState={changeState} data={mouseDown} />
            }
        }

        setGrid(newArray);
    }

    useEffect(() => {
        initializeGrid();
    }, [mouseDown]);

  return (
    <>
          <div className="header">
              <a href="." className="logo">
                  <div>PATHFINDER</div>
                  <div>VISUALIZER</div>
              </a>
              <div className="nav">
                  <div className="button">Algorithms</div>
                  <div className="button clear" onClick={() => { resetGrid(); }}>Clear</div>
                  <div className="button execute">Visualize</div>
              </div>
          </div>  

          <div ref={gridElement} style={{gridTemplateRows: `repeat(${grid.length}, 1fr)`, gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`}} className="grid">
              {grid.map((e, i) => {
                  return (e);
              }) }
           </div>
    </>
  );
}

export default App;
