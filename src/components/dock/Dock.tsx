import React from "react";

// 各Nodeを生成する際に利用するDockコンポーネント
// 本コンポーネントではドラッグ開始時に生成予定のオブジェクトのIDを登録し、mainロジック側でドロップ時にIDを取得することで
// 生成対象を伝送する。
export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    
      return (
        <aside className="border-r-2 px-4 py-3 text-xs">
          <div className="mb-2.5">You can drag these nodes.</div>
          <div className="h-5 p-1 border-2 border-red-500 cursor-grab items-center justify-center flex mb-2.5 rounded-sm" onDragStart={(event) => onDragStart(event, 'gameobject')} draggable>
            GameObject
          </div>
          <div className="h-5 p-1 border-2 border-green-500 cursor-grab items-center justify-center flex mb-2.5 rounded-sm" onDragStart={(event) => onDragStart(event, 'class')} draggable>
            C# Class
          </div>
          <div className="h-5 p-1 border-2 border-sky-500 cursor-grab items-center justify-center flex mb-2.5 rounded-sm" onDragStart={(event) => onDragStart(event, 'interface')} draggable>
            Interface
          </div>
          <div className="h-5 p-1 border-2 border-blue-500 cursor-grab items-center justify-center flex mb-2.5 rounded-sm" onDragStart={(event) => onDragStart(event, 'prefab')} draggable>
            Prefab
          </div>
          <div className="h-5 p-1 border-2 border-purple-500 cursor-grab items-center justify-center flex mb-2.5 rounded-sm" onDragStart={(event) => onDragStart(event, 'enum')} draggable>
            Enum
          </div>
          <div className="h-5 p-1 border-2 border-teal-500 cursor-grab items-center justify-center flex mb-2.5 rounded-sm" onDragStart={(event) => onDragStart(event, 'scriptable')} draggable>
            Scriptable
          </div>
          <div className="h-5 p-1 border-2 border-orange-500 cursor-grab items-center justify-center flex mb-2.5 rounded-sm" onDragStart={(event) => onDragStart(event, 'asmdef')} draggable>
            Asmdef
          </div>
        </aside>
      );
};