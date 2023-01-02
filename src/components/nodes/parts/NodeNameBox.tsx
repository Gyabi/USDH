import { useCallback } from 'react';
import {ReactFlowInstance, useReactFlow, useStoreApi} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

function NodeNameBox({value, id}){
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
        <input id="text" onChange={onChange} value={value} className="parts-input"/>
    )
}

export default NodeNameBox;