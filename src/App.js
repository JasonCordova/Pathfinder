import { useState, useRef, useEffect } from 'react';
import Cell from './Cell.js';
const interval = 56;

function App() {

    const [grid, setGrid] = useState(Array(5).fill().map(row => new Array(5).fill( <Cell/> )));
    const gridElement = useRef(null);

    window.onresize = () => {
        setGrid(Array(Math.floor((window.innerHeight - 86) / interval)).fill().map(row => new Array(Math.floor(window.innerWidth / interval)).fill(<Cell/> )));
    };

    useEffect(() => {
        setGrid( Array( Math.floor((window.innerHeight - 86) / interval )).fill().map(row => new Array( Math.floor(window.innerWidth / interval )).fill( <Cell/> )));
    }, []);

  return (
    <>
          <div className="header">
              <a href="." className="logo">
                  <div>PATHFINDER</div>
                  <div>VISUALIZER</div>
              </a>
              <div className="nav">
                  <div className="button">Algorithms</div>
                  <div className="button">Generate Maze</div>
                  <div className="button">Clear</div>
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
