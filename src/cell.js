import { useState } from 'react';

const Cell = () => {

    const [wall, setWall] = useState(false);

    return (
        <div className={`cell${wall ? " wall" : ""}`} onClick={() => { setWall(!wall); } }></div>
    );
}

export default Cell;