import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import NodeNameBox from './parts/NodeNameBox';

function EnumNode({id, data}){
    return (
        <div className='text-enum-node'>
            <label htmlFor="text">Enum</label>
            <NodeNameBox value={data.node_name} id={id}/>
            <Handle type='source' position={Position.Left} id="scriptableOut" />
        </div>
    )
}

export {EnumNode};