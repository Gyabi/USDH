import { useCallback, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  updateEdge
} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

import { ScriptableNode } from './nodes/ScriptableNode';
import { EnumNode } from './nodes/EnumNode';
import { AsmdefNode } from './nodes/AsmdefNode';
import { PrefabNode } from './nodes/PrefabNode';
import { GameObjectNode } from './nodes/GameObjectNode';
import { ClassNode } from './nodes/ClassNode';
import { InterfaceNode } from './nodes/InterfaceNode';

import { NodeDataType } from './dataTypes/DataType';

const initialNodes : Node<NodeDataType>[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { node_name: 'scriptable'}, type: 'scriptable' },
  { id: '2', position: { x: 0, y: 100 }, data: { node_name: 'asmdef'}, type: 'asmdef' },
  { id: '3', position: { x: 0, y: 200 }, data: { node_name: 'enum'}, type: 'enum'},
  { id: '4', position: { x: 0, y: 300 }, data: { node_name: 'prefab'}, type: 'prefab'},
  { id: '5', position: { x: 0, y: 400 }, data: { node_name: 'gameobject'}, type: 'gameobject'},
  { id: '6', position: { x: 0, y: 500 }, data: { node_name: 'class'}, type: 'class'},
  { id: '7', position: { x: 0, y: 600 }, data: { node_name: 'interface'}, type: 'interface'},
];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
// 自作のノードを登録
const nodeTypes = {
  scriptable: ScriptableNode,
  enum: EnumNode,
  asmdef: AsmdefNode,
  prefab: PrefabNode,
  gameobject: GameObjectNode,
  class:ClassNode,
  interface:InterfaceNode};

function FlowSample() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <div className="react-flow__container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapToGrid
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background color='#000000' />
      </ReactFlow>
    </div>
  );
}

export {FlowSample}