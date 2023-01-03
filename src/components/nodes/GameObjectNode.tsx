import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import NodeNameBox from './parts/NodeNameBox';

// GameObject用のNode
function GameObjectNode({id, data}){
    return (
        <div className='text-gameobject-node'>
            <label htmlFor="text">GameObject</label>
            <NodeNameBox value={data.node_name} id={id}/>

            <div className='gameobject-node-body'>
                <div className='gameobject-node-element'>
                    <label htmlFor="text">sample</label>
                    <Handle type='target' position={Position.Left} id="gameobject-main" className="input-port"/>
                </div>
                <div className='gameobject-node-element'>
                    <label htmlFor="text">sample2</label>
                    <Handle type='target' position={Position.Left} id="gameobject-inher" className="input-port"/>
                </div>
                <div className='gameobject-node-element'>
                    <label htmlFor="text">sample3</label>
                    <Handle type='source' position={Position.Right} id="gameobject-ser" className="output-port"/>
                </div>
                <div className='gameobject-node-element'>
                    <label htmlFor="text">sample4</label>
                    <Handle type='source' position={Position.Right} id="gameobject-dep" className="output-port"/>
                </div>
            </div>
        </div>
    )
}

export {GameObjectNode};