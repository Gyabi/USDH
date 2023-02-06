import { open, save } from '@tauri-apps/api/dialog'
import Router from 'next/router'
import { invoke } from '@tauri-apps/api/tauri';
import { stringify } from 'querystring';

const Home = () => {
  const openDialog = () => {
    open({
      multiple:false,
      filters:[{
        name:'usdh',
        extensions:['usdh']
      }]
    }).then((filePath:string) => {
      if(filePath != null)
      {
        // filesのpathを遷移先に渡す
        // 遷移実行
        MoveGraphPage("/graph", filePath);
      }
    });
  }
  
  const saveDialog = async () => {
    const filePath = await save({
      filters: [{
        name: 'usdh',
        extensions: ['usdh']
      }]
    });
    if(filePath != null)
    {
      // filesへ新規作成
      invoke('write_file', {path:filePath, contents:""});
      
      // filesのpathを遷移先に渡す
      // 遷移実行
      MoveGraphPage("/graph", filePath);
    }
  }

  const MoveGraphPage = (path : string, filePath: string) => {
    Router.push({
      pathname:path,
      query:{
        filePath: filePath
      }
    })
  }
  
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 grid h-screen w-screen flex justify-center items-center">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12">Select Your Graph File!</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
            <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' onClick={openDialog}>Open Graph File</button>
            <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded' onClick={saveDialog}>Create Graph File</button>
          </div>
      </div>
    </div>
  )
}

export default Home