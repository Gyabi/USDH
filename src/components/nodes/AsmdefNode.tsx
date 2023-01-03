import NodeNameBox from './parts/NodeNameBox';

// Asmdef用のNode
function AsmdefNode({id, data}){
    return (
        <div className="w-full max-w-sm px-4 py-3 bg-slate-300 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <NodeNameBox value={data.node_name} id={id}/>
                <span className="px-3 py-1 text-xs text-orange-800 uppercase bg-orange-500 rounded-full">asmdef</span>
            </div>
        </div>
    )
}

export {AsmdefNode};