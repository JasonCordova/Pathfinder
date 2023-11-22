import { useState, useEffect } from 'react';

const Cell = (props) => {

    const [wall, setWall] = useState(false);

    useEffect(() => {
        setWall(false);
    }, [])

    return (
        <div className={`cell${wall ? " wall" : ""}${props.start ? " start" : ""}`} onMouseDown={() => { wall ? props.changeState("clear") : props.changeState("wall"); setWall(!wall); }} onMouseEnter={() => { if (props.data) if (props.currentState === "wall") setWall(true); else if (props.currentState === "clear") setWall(false); }}>
            <div className="color"></div>
        </div>
    );
}

export default Cell;