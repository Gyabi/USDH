import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import NodeNameBox from './parts/NodeNameBox';

// Prefab用のNode
function PrefabNode({id, data}){
    return (
        <div className='text-prefab-node'>
            <label htmlFor="text">Prefab</label>
            <NodeNameBox value={data.node_name} id={id}/>
            <Handle type='target' position={Position.Left} id="scriptable" className="input-port"/>
            <Handle type='source' position={Position.Right} id="scriptableOut" className="output-port"/>
        </div>
    )
}

export {PrefabNode};