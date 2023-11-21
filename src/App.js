import { useState, useRef, useEffect} from 'react';
function App() {

    const [size, setSize] = useState({ cols: 5, rows: 5 });

    const grid = useRef(null);

    window.onresize = () => {
        setSize({ cols: Math.floor(window.innerWidth / 32), rows: Math.floor((window.innerHeight - 86) / 32) });
    }

    useEffect(() => {
        setSize({ cols: Math.floor(window.innerWidth / 32), rows: Math.floor((window.innerHeight - 86) / 32) });
    })

    useEffect(() => {
        grid.current.innerHTML = "";
        for (var i = 0; i < size.cols; i++) {
            for (var j = 0; j < size.rows; j++) {
                var newElement = document.createElement("div");
                newElement.classList.add("cell");
                grid.current.appendChild(newElement);
            }
        }
    }, [size]);

  return (
    <>
          <div className="header">
              <a href="." className="logo">
                  <div>PATHFINDER</div>
                  <div>VISUALIZER</div>
              </a>
              <div className="nav">
                  <div className="button">Algorithms</div>
                  <div className="button">Clear</div>
                  <div className="button execute">Visualize</div>
              </div>
          </div>  
          <div ref={grid} className="grid">
           
           </div>
    </>
  );
}

export default App;
