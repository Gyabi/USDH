import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import NodeNameBox from './parts/NodeNameBox';

// ScriptableObject用のNode
function ScriptableNode({id, data}){
    return (
        <div className='text-scriptable-node'>
            <label htmlFor="text">ScriptableObject</label>
            <NodeNameBox value={data.node_name} id={id}/>
            <Handle type='target' position={Position.Left} id="scriptableOut" className="input-port"/>
        </div>
    )
}

export {ScriptableNode};