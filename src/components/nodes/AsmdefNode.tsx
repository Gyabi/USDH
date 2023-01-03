import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import NodeNameBox from './parts/NodeNameBox';

// Asmdef用のNode
function AsmdefNode({id, data}){
    return (
        <div className='text-asmdef-node'>
            <label htmlFor="text">Asmdef</label>
            <NodeNameBox value={data.node_name} id={id}/>
        </div>
    )
}

export {AsmdefNode};