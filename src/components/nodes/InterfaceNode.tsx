import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import NodeNameBox from './parts/NodeNameBox';

// Interface用のNode
function InterfaceNode({id, data}){
    return (
        <div className='text-interface-node'>
            <label htmlFor="text">Interface</label>
            <NodeNameBox value={data.node_name} id={id}/>
            <Handle type='target' position={Position.Left} id="scriptableOut" className="input-port"/>
            <Handle type='source' position={Position.Right} id="scriptableOut" className="output-port"/>
        </div>
    )
}

export {InterfaceNode};