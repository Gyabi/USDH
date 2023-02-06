import { Handle, Position, NodeProps } from 'reactflow';
import NodeNameBox from './parts/NodeNameBox';

import { NodeResizer } from '@reactflow/node-resizer';

import '@reactflow/node-resizer/dist/style.css';

const PackageNode = ({ data, id, selected }) => {
  return (
    <div>
      <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />
      <NodeNameBox value={data.node_name} id={id}/>

      <Handle type="target" id="package-input" position={Position.Left} />
      <Handle type="source" id="package-output" position={Position.Right} />
    </div>
  );
};

export {PackageNode};