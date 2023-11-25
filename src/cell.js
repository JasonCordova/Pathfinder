import { useState, useEffect } from 'react';

const Cell = (props) => {

    const [wall, setWall] = useState(false);

    useEffect(() => {
        if (props.initial === "clear") setWall(false);
    }, [props.initial]);

    return (
        <div className={`cell${props.start ? " start" : ""}${props.end ? " end" : ""}${wall ? " wall" : ""}`}
            onMouseDown={() => {
                if (!props.start && !props.end) {
                    wall ? props.changeState("clear") : props.changeState("wall"); setWall(!wall);
                }
            }}
            onMouseEnter={() => {
                if (props.data && (!props.start && !props.end))
                    if (props.currentState === "wall") setWall(true);
                    else if (props.currentState === "clear") setWall(false);
            }}>
            <div className="color"></div>
        </div>
    );
}

export default Cell;