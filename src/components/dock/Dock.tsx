import React from "react";

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    
      return (
        <aside>
          <div className="description">You can drag these nodes to the pane on the right.</div>
          <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'gameobject')} draggable>
            Input Node
          </div>
          <div className="dndnode" onDragStart={(event) => onDragStart(event, 'gameobject')} draggable>
            Default Node
          </div>
          <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'gameobject')} draggable>
            Output Node
          </div>
        </aside>
      );
};