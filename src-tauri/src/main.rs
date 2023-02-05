#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn read_data() -> String {
    r#"{"nodes":[{"width":276,"height":113,"id":"dndnode_1675598607558","type":"class","position":{"x":330,"y":105},"data":{"node_name":"class"},"style":null,"selected":false,"positionAbsolute":{"x":330,"y":105},"dragging":false},{"width":286,"height":85,"id":"dndnode_1675598610352","type":"interface","position":{"x":165,"y":-15},"data":{"node_name":"interface"},"style":null,"selected":true,"positionAbsolute":{"x":165,"y":-15},"dragging":false}],"edges":[{"source":"dndnode_1675598610352","sourceHandle":"0","target":"dndnode_1675598607558","targetHandle":"0","id":"reactflow__edge-dndnode_16755986103520-dndnode_16755986075580"}],"viewport":{"x":-85.59328527573103,"y":132.50597640759497,"zoom":0.8705505632961245}}"#.into()
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
