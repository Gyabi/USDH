import {Handle, Position} from 'reactflow';
// ð you need to import the reactflow styles
import 'reactflow/dist/style.css';

// 2ã¤ã®éåããã¼ã¸ãã¦åãåºãå¯è½ã«ããé¢æ°
const getPairs = <T, U>(arr1: T[], arr2: U[]) => {
    const max = Math.max(arr1.length, arr2.length);
    const pairs = [];
    for (let i = 0; i < max; i++) {
      const pair: [T | undefined, U | undefined] = [arr1[i], arr2[i]];
      pairs.push(pair);
    }
    return pairs;
  };

//   å¼æ°ã¨ãã¦åãä»ãããã¼ã¿å
class NodeParameterData {
    inputNames: string[]
    outputNames: string[]
    constructor(inputNames: string[], outputNames: string[]) {
        this.inputNames = inputNames;
        this.outputNames = outputNames;
    }
}

// ãã¼ããé çªã«æ ¼ç´ãã¦è¿å´ããã³ã³ãã¼ãã³ã
const NodeParamters = ({inputNames, outputNames}:NodeParameterData) => {
    const pairs = getPairs(inputNames, outputNames);

    return (
        <div>
            {pairs.map(([input, output], ix) => (
                // Inputå´
                <div key={ix} className="flex flex-row justify-between gap-8 relative px-2">
                    {input && (
                        <div className='flex grow items-center justify-start h-7'>
                            <span className="px-3 py-1 text-xs rounded-lg bg-gray-500">{input}</span>
                            
                            <Handle
                                id={ix.toString()}
                                type="target"
                                position={Position.Left}
                                className="input-port"
                            />
                        </div>
                    )}
                {/* Outputå´ */}
                    {output && (
                        <div className='flex grow items-center justify-end h-7'>
                            <span className="px-3 py-1 text-xs rounded-lg bg-gray-500">{output}</span>
                            
                            <Handle
                                id={ix.toString()}
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