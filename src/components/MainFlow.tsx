import Dock from './dock/Dock';
import {ReactFlowProvider} from 'reactflow';
import { FlowCore } from './FlowCore';

const MainFlow = () => {
  return (
    <div className="flex-row flex grow h-full">
      <ReactFlowProvider>
        <Dock/>
        <FlowCore/>
      </ReactFlowProvider>
    </div>

  );
}

export {MainFlow}