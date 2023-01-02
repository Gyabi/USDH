import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

import { ScriptableNode } from './nodes/ScriptableNode';
import { EnumNode } from './nodes/EnumNode';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { node_name: 'scriptable' }, type: 'scriptable' },
  { id: '3', position: { x: 0, y: 100 }, data: { node_name: 'enum' }, type: 'enum'},
];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const nodeTypes = {scriptable: ScriptableNode,
                    enum: EnumNode};

function FlowSample() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="react-flow__container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export {FlowSample}