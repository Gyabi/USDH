import { useCallback } from 'react';
import {ReactFlowInstance, useReactFlow, useStoreApi} from 'reactflow';
// ð you need to import the reactflow styles
import 'reactflow/dist/style.css';

function NodeNameBox({value, id}){
    // ã³ã³ãã¼ãã³ãããå¤ãæ´æ°ããããã«setNodesãåå¾
    const {setNodes} : ReactFlowInstance = useReactFlow();
    const store = useStoreApi();

    // å¤ã«å¤æ´ããã£ãã¨ãã®åä½
    const onChange = useCallback((evt) => {
        const {nodeInternals} = store.getState();
        // ãã¼ããé çªã«ã¿ã¦è©²å½ããIDãªãå¤ãä¿®æ­£
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
        <input id="text" onChange={onChange} value={value} className="bg-slate-300 font-semibold rounded-md"/>
    )
}

export default NodeNameBox;