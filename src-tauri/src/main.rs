#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use std::fs::File;
use std::io::{self, Read, Write};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn read_file(path: &str) -> Result<String, String> {
    let mut file = match File::open(path) {
        Ok(f) => f,
        Err(e) => return Err(e.to_string()),
    };
    let mut contents = String::new();
    match file.read_to_string(&mut contents) {
        Ok(_) => Ok(contents),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
fn write_file(path: &str, contents: &str) -> Result<(), String> {
    let mut file = match File::create(path) {
        Ok(f) => f,
        Err(e) => return Err(e.to_string()),
    };
    match file.write_all(contents.as_bytes()) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![write_file, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
