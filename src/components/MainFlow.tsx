import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
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

import {PackageNode} from './nodes/PackageNode';

import { NodeDataType } from './dataTypes/DataType';

import Dock from './dock/Dock';
import { debug } from 'util';

// 自作のノードを登録
const nodeTypes = {
  scriptable: ScriptableNode,
  enum: EnumNode,
  asmdef: AsmdefNode,
  prefab: PrefabNode,
  gameobject: GameObjectNode,
  class:ClassNode,
  interface:InterfaceNode,
  package:PackageNode
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const MainFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const edgeUpdateSuccessful = useRef(true);

  // --------------------------------------------------------------------
  // エッジの削除実装に利用するメソッド
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
  // --------------------------------------------------------------------
  
  // --------------------------------------------------------------------
  // Dockの実装に利用するメソッド
  // ドラッグ中にオブジェクトの下に何かあるときに数ミリ秒毎に呼ばれる
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  // オブジェクトをドロップしたときに実行されるメソッド
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // パッケージを作るときにはStyleを割り当てる
      const newNode = {
        id: getId(),
        type,
        position,
        data: { node_name: type },
        style: null
      };
    
      if(type == 'package'){
        newNode.style = {
          border: '1px solid gray',
          borderRadius: 6,
        };
      }
      
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
    );
    // --------------------------------------------------------------------
    // --------------------------------------------------------------------
    // ノードを動かし始めたときに呼ばれる
    // パッケージに含まれていれば一旦削除
    const OnNodeDragStart = useCallback((event) => {
      // console.log("start");

    }, []);

    // ノードをドロップしたときに呼ばれる
    // パッケージへのグループ化処理を実行
    const OnNodeDragStop = useCallback((event) => {
      // console.log("stop");
      // パッケージだけを検索対象にする

      // パッケージのネストにも対応する
      
    }, []);
    // --------------------------------------------------------------------

  return (
    <div className="flex-row flex grow h-full">
      <ReactFlowProvider>
        <Dock/>
        {/* h-screenによって全画面に表示している */}
        <div className="grow h-screen" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            snapToGrid
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDragStart={OnNodeDragStart}
            onNodeDragStop={OnNodeDragStop}
            
            fitView
          >
            <MiniMap />
            <Controls />
            <Background color='#000000' />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>

  );
}

export {MainFlow}