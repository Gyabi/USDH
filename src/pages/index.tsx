import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { FlowSample } from "../components/flow_sample";

function App() {
  return (
    <div>
      <FlowSample/>
    </div>
  );
}

export default App;
