import { useCallback } from 'react';
import {
  Handle,
  Position
} from 'reactflow';
import Image from "next/image"
// 👇 you need to import the reactflow styles

const handleStyle = { left: 10 };

function Node({data}){
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div>
            <Handle type='target' position={Position.Top} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id='text' name='text' onChange={onChange} />
            </div>
            <Handle type='source' position={Position.Bottom} id="a" />
            <Handle type='source' position={Position.Bottom} id="b" style={handleStyle} />
        </div>
    )
}

export {Node};