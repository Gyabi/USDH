import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { MainFlow } from "../components/MainFlow";

function App() {
  return (
    <div>
      <MainFlow/>
    </div>
  );
}

export default App;
