import { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  useReactFlow
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

const getId = () => `dndnode_${+new Date()}`;
const flowKey = 'example-flow';


const FlowCore = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    const edgeUpdateSuccessful = useRef(true);
    const { setViewport } = useReactFlow();
  
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
      
      // --------------------------------------------------------------------
      // 保存メソッド
      const onSave = useCallback(() => {
        if (reactFlowInstance) {
          const flow = reactFlowInstance.toObject();
          localStorage.setItem(flowKey, JSON.stringify(flow));
        //   RUST側で保存処理★
    }
}, [reactFlowInstance]);

const onRestore = useCallback(() => {
    const restoreFlow = async () => {
        const flow = JSON.parse(localStorage.getItem(flowKey));
        //   RUST側で読み込み処理★
        
        if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            setViewport({ x, y, zoom });
          }
        };
    
        restoreFlow();
      }, [setNodes, setViewport]);

      // --------------------------------------------------------------------
      return (
        /* h-screenによって全画面に表示している */
          <div className="flex grow h-screen" ref={reactFlowWrapper}>
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
                <aside className="border-r-2 px-4 py-3 text-xs">
                    <button onClick={onSave} className="bg-gray-600 hover:bg-gray-500 text-white rounded px-4 py-2">SAVE</button>
                    {/* <button onClick={onRestore} className="bg-gray-600 hover:bg-gray-500 text-white rounded px-4 py-2">RESTORE</button> */}
                </aside>
            </div>
      );

}

export {FlowCore}
