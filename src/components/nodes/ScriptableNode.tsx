import { useCallback } from 'react';
import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

function ScriptableNode({data}){

    const onChange = useCallback((evt) => {
        // console.log(evt.target.value);
    }, []);

    return (
        <div className='text-scriptable-node'>
            <label htmlFor="text">ScriptableObject</label>
            <input id="text" name="text" onChange={onChange} />
            <Handle type='source' position={Position.Left} id="scriptableOut" />
        </div>
    )
}

export {ScriptableNode};