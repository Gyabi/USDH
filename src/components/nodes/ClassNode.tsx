import NodeNameBox from './parts/NodeNameBox';
import { NodeParameterData, NodeParamters } from './parts/NodeParameters';

const parameterData : NodeParameterData = new NodeParameterData(["self", "Inheritance/Implement"],["Implement","Dependent"]);


// Class用のNode
function ClassNode({id, data}){
    return (
        <div className="w-full max-w-sm py-2 bg-slate-300 rounded-md shadow-md">
            {/* ヘッダー部分 */}
            <div className="flex px-2 items-center justify-between">
                <NodeNameBox value={data.node_name} id={id}/>
                <span className="px-3 py-1 text-xs text-green-800 uppercase bg-green-500 rounded-full">C#Class</span>
            </div>

            <hr className='m-2'/>

            {/* データ部 */}
            <NodeParamters inputNames={parameterData.inputNames} outputNames={parameterData.outputNames}/>
        </div>
    )
}

export {ClassNode};