# Mars Rover Mission: Blockly Custom Blocks Demo 🚀

An interactive web application where users program a Mars Rover to navigate a hazardous grid, analyze terrain, and collect alien water samples using custom visual programming blocks.

## 📖 Problem Statement
The user acts as a Mission Commander for a Mars Rover. The rover must:
1.  **Navigate** a 5x5 grid representing the Martian surface.
2.  **Avoid obstacles** (Rocks/Craters) using sensors.
3.  **Find the hidden target** (Water Sample).
4.  **Extract the sample** and **transmit data** back to Earth.

## ✨ Features
-   **Custom Blockly Toolbox**: 6 unique blocks designed specifically for this mission.
-   **Interactive Grid**: A live 5x5 visualizer that shows the rover, obstacles, and discovered targets.
-   **Step-by-Step Execution**: Watch your code run in real-time with smooth animations (600ms delays).
-   **Responsive Design**: A sleek, dark-themed UI with glassmorphism effects.
-   **Mission Logs**: A detailed output console that logs every move, scan, and success/failure event.

## 🧩 Custom Blocks
This project implements **6 Custom Blocks** to solve the problem:

| Block Name | Category | Description |
| :--- | :--- | :--- |
| **Move Forward** 🚀 | Rover | Moves the rover one tile forward in its current facing direction. |
| **Turn [Left/Right]** 🔄 | Rover | Rotates the rover 90 degrees Left or Right without moving. |
| **Is Obstacle Ahead?** 🪨 | Sensors | **Boolean Input**. Returns `true` if the tile directly ahead is a rock or grid edge. |
| **Analyze Terrain** 🔍 | Sensors | **Value Output**. Scans current tile. Uncovers hidden potential resources (Water). |
| **Drill for Sample** ⛏️ | Rover | Extracts the sample. Only successful if the rover is on a Water Target. |
| **Transmit Data** 📡 | Rover | Final step. Sends the collected sample data to Earth to complete the mission. |

## 🛠️ Tech Stack
-   **Vanilla JavaScript (ES6+)**: Core logic and DOM manipulation.
-   **Blockly (Latest Core)**: Visual programming blocks library.
-   **HTML5 & CSS3**: Responsive grid layout and theming.
-   **No Frameworks**: Pure browser-native implementation.

## 🚀 How to Run Locally
1.  **Clone** or download this repository.
2.  Open the project folder.
3.  **Open `index.html`** in any modern web browser (Chrome, Firefox, Edge).
    -   *No local server required!* It works directly from the file system.

## 🎮 How to Play
1.  **Drag & Drop** blocks from the toolbox (left) to the workspace.
2.  **Build a Logic Chain**:
    -   Example: `Repeat 3 times: [Move Forward]` -> `If [Is Obstacle Ahead?] Turn Left` -> `Analyze` -> `If [Target Found] Drill` -> `Transmit`.
3.  **Click "Generate"** to see the JavaScript code your blocks created.
4.  **Click "Run Mission"** to execute your code visually on the grid.
5.  **Watch the Logs** and the Rover move!

## ✅ Verification Checklist
-   [x] **Workspace**: Blockly loads with custom dark theme, zoom, and trashcan.
-   [x] **UI**: 5x5 grid renders correctly with accurate rover direction arrows (`⬆️➡️⬇️⬅️`).
-   [x] **Logic**: Rover stops at obstacles and edges (Collision avoidance).
-   [x] **Win Condition**: Mission Success alert triggers ONLY if sample is collected + transmitted.
-   [x] **Fail Condition**: Drilling on empty ground or transmitting empty data logs errors.


## 📸 Screenshots
<img width="1917" height="872" alt="image" src="https://github.com/user-attachments/assets/8a1eb2b8-9313-4fa5-a577-d0941be7c275" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9fceaa91-6d75-4ce2-b7d2-4963e0fa81ab" />


---
*Created for Assignment: Blockly Custom Blocks Demo*
