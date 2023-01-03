import {Handle, Position} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';

// 2つの配列をマージして取り出し可能にする関数
const getPairs = <T, U>(arr1: T[], arr2: U[]) => {
    const max = Math.max(arr1.length, arr2.length);
    const pairs = [];
    for (let i = 0; i < max; i++) {
      const pair: [T | undefined, U | undefined] = [arr1[i], arr2[i]];
      pairs.push(pair);
    }
    return pairs;
  };

//   引数として受け付けるデータ型
class NodeParameterData {
    inputNames: string[]
    outputNames: string[]
    constructor(inputNames: string[], outputNames: string[]) {
        this.inputNames = inputNames;
        this.outputNames = outputNames;
    }
}

// ノードを順番に格納して返却するコンポーネント
const NodeParamters = ({inputNames, outputNames}:NodeParameterData) => {
    const pairs = getPairs(inputNames, outputNames);

    return (
        <div>
            {pairs.map(([input, output], ix) => (
                // Input側
                <div key={ix} className="flex flex-row justify-between gap-8 relative px-2">
                    {input && (
                        <div className='flex grow items-center justify-start h-7'>
                            <span className="px-3 py-1 text-xs rounded-lg bg-gray-500">{input}</span>
                            
                            <Handle
                                id="test"
                                type="target"
                                position={Position.Left}
                                className="input-port"
                            />
                        </div>
                    )}
                {/* Output側 */}
                    {output && (
                        <div className='flex grow items-center justify-end h-7'>
                            <span className="px-3 py-1 text-xs rounded-lg bg-gray-500">{output}</span>
                            
                            <Handle
                                id="test2"
                                type="source"
                                position={Position.Right}
                                className="output-port"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


export {NodeParamters, NodeParameterData};