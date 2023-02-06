import {Handle, Position} from 'reactflow';
import NodeNameBox from './parts/NodeNameBox';

// ScriptableObject用のNode
function ScriptableNode({id, data}){
    return (
        <div className="w-full max-w-sm px-4 py-3 bg-slate-300 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <NodeNameBox value={data.node_name} id={id}/>
                <span className="px-3 py-1 text-xs text-teal-800 uppercase bg-teal-500 rounded-full">scriptable</span>
                <Handle type='target' position={Position.Left} id="scriptableInput" className="input-port"/>
            </div>
        </div>
    )
}

export {ScriptableNode};