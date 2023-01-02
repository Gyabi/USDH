import { useCallback } from 'react';
import {Handle, Position, ReactFlowInstance, useReactFlow, useStoreApi} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

function EnumNode({id, data}){
    // コンポーネントから値を更新するためにsetNodesを取得
    const {setNodes} : ReactFlowInstance = useReactFlow();
    const store = useStoreApi();

    // 値に変更があったときの動作
    const onChange = useCallback((evt) => {
        const {nodeInternals} = store.getState();
        // ノードを順番にみて該当するIDなら値を修正
        setNodes(
            Array.from(nodeInternals.values()).map((node)=>{
                if(node.id == id){
                    node.data = {
                        ...node.data,
                        node_name: evt.target.value,
                    };
                }
                return node;
            })
        )
        // console.log(evt.target.value);
    }, []);

    return (
        <div className='text-enum-node'>
            <label htmlFor="text">ScriptableObject</label>
            <input id="text" onChange={onChange} value={data.node_name}/>
            <Handle type='source' position={Position.Left} id="scriptableOut" />
        </div>
    )
}

export {EnumNode};