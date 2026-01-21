/**
 * main.js
 * Entry point for Mars Rover Blockly Demo.
 * Functions are async to support visual delays/animations.
 */

// =============================================================================
// 1. GAME UTILS & STATE
// =============================================================================

// Helper: Async Wait
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 5x5 Grid Data
const grid = [
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'obstacle', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'target']
];

// Rover State
const roverState = {
    x: 0,
    y: 0,
    direction: 'E',
    sampleCollected: false,
    revealedGrid: Array(5).fill().map(() => Array(5).fill(false)) // 5x5 False
};

// Logging Utils
const outputLog = document.getElementById('outputLog');

function logMission(message, type = 'normal') {
    if (!outputLog) return;
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    if (type === 'error') {
        entry.classList.add('log-error');
        entry.style.color = '#FF5252';
    }
    if (type === 'success') {
        entry.classList.add('log-success');
        entry.style.color = '#4CAF50';
    }
    if (type === 'info') {
        entry.style.color = '#2196F3';
    }
    
    // Add timestamp or icon?
    const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : '➡️';
    entry.innerText = `${icon} ${message}`;
    
    outputLog.appendChild(entry);
    outputLog.scrollTop = outputLog.scrollHeight;
    console.log(`[ROVER] ${message}`);
}

function clearLog() {
    if (outputLog) outputLog.innerHTML = '';
}

// UI Update
function updateGridUI() {
    const gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';

    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            
            // Render Elements
            if (grid[y][x] === 'obstacle') cell.classList.add('obstacle');
            
            if (grid[y][x] === 'target') {
                if (roverState.sampleCollected) {
                    cell.classList.add('target-collected');
                } else if (roverState.revealedGrid[y][x]) {
                    cell.classList.add('target-revealed');
                }
            }

            // Render Rover
            if (roverState.x === x && roverState.y === y) {
                cell.classList.add('rover');
                const arrows = { 'N': '⬆️', 'E': '➡️', 'S': '⬇️', 'W': '⬅️' };
                cell.innerText = arrows[roverState.direction];
            }

            gridContainer.appendChild(cell);
        }
    }
}


// =============================================================================
// 2. ROVER ACTIONS (Async for Layout)
// =============================================================================

window.roverMove = async function() {
    logMission("Moving forward...", 'info');
    
    // 1. Calculate Next Position
    let nextX = roverState.x;
    let nextY = roverState.y;

    switch (roverState.direction) {
        case 'N': nextY--; break;
        case 'S': nextY++; break;
        case 'E': nextX++; break;
        case 'W': nextX--; break;
    }

    // 2. Validate Bounds
    if (nextX < 0 || nextX > 4 || nextY < 0 || nextY > 4) {
        logMission("CRASH! Boundary detection alarm.", "error");
        await wait(500); // Wait even on error for impact
        return;
    }

    // 3. Validate Obstacles
    if (grid[nextY][nextX] === 'obstacle') {
        logMission("CRASH! Obstacle impact confirmed.", "error");
        await wait(500); 
        return;
    }

    // 4. Update & Animate
    roverState.x = nextX;
    roverState.y = nextY;
    updateGridUI();
    
    logMission(`Position: (${roverState.x}, ${roverState.y}) Dir: ${roverState.direction}`);
    await wait(600); // Animation Delay
};

window.roverTurn = async function(direction) {
    logMission(`Turning ${direction}...`, 'info');
    
    const dirs = ['N', 'E', 'S', 'W'];
    let idx = dirs.indexOf(roverState.direction);
    
    if (direction === 'LEFT') {
        idx = (idx - 1 + 4) % 4; 
    } else {
        idx = (idx + 1) % 4;
    }
    
    roverState.direction = dirs[idx];
    updateGridUI();
    
    await wait(600);
};

window.roverDetectObstacle = function() {
   
    
    let checkX = roverState.x;
    let checkY = roverState.y;

    switch (roverState.direction) {
        case 'N': checkY--; break;
        case 'S': checkY++; break;
        case 'E': checkX++; break;
        case 'W': checkX--; break;
    }

    let isObstacle = false;
    // Check bounds (treat grid edge as obstacle? Optional. Lets say NO, just grid edge)
    if (checkX < 0 || checkX > 4 || checkY < 0 || checkY > 4) {
        isObstacle = true; // Safety logic
    } else {
        isObstacle = grid[checkY][checkX] === 'obstacle';
    }

    logMission(`Sensor Scan: ${isObstacle ? 'OBSTACLE' : 'CLEAR'}`);
    return isObstacle;
};

window.roverAnalyze = function() {
    // Analysis acts as a "move" in terms of turn time? 
    // Keeping it sync to return value for Immediate use, 
    // BUT we can trigger a visual effect.
    
    const tileType = grid[roverState.y][roverState.x];
    logMission(`Analzying: ${tileType.toUpperCase()}`);
    
    if (tileType === 'target') {
        roverState.revealedGrid[roverState.y][roverState.x] = true;
        updateGridUI(); 
    }
    return tileType;
};

window.roverDrill = async function() {
    logMission("Deploying Drill...", 'info');
    await wait(1000); // Drilling takes time

    if (grid[roverState.y][roverState.x] === 'target') {
        roverState.sampleCollected = true;
        updateGridUI();
        logMission("SAMPLE ACQUIRED! Storage secure.", "success");
    } else {
        logMission("Drill Error: No target substrate.", "error");
    }
    await wait(500);
};

window.roverTransmit = async function() {
    logMission("Aligning antenna...", 'info');
    await wait(800);
    
    if (roverState.sampleCollected) {
        logMission("UPLINK ESTABLISHED. Data sent.", "success");
        await wait(500);
        // Use a nicer looking alert or modal if possible, but basic alert is standard for "Level Complete"
        alert("🎉 MISSION SUCCESS! \n\nWater Sample Recovered.\nData Transmitted.\n\nGood job, Commander!");
    } else {
        logMission("Uplink failed: No data payload.", "error");
        alert("Mission Failed: You didn't collect the sample.");
    }
};


// =============================================================================
// 3. INITIALIZATION
// =============================================================================

// Toolbox (Same as before)
const toolboxXml = `
<xml id="toolbox" style="display: none">
    <category name="Rover" colour="#4CAF50">
        <block type="rover_move"></block>
        <block type="rover_turn"></block>
        <block type="rover_drill"></block>
        <block type="rover_transmit"></block>
    </category>
    <category name="Sensors" colour="#E91E63">
        <block type="rover_detect_obstacle"></block>
        <block type="rover_analyze"></block>
    </category>
    <category name="Logic" colour="#5C81A6">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="text"></block> 
    </category>
    <category name="Loops" colour="#5CA65C">
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        <block type="controls_whileUntil"></block>
    </category>
</xml>
`;

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Blockly
    const workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolboxXml,
        scrollbars: true,
        trashcan: true,
        zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 3, minScale: 0.3, scaleSpeed: 1.2 },
        // theme: Blockly.Themes.Dark 
    });
    logMission("System Online. Awaiting commands.");
    updateGridUI();

    // Event Listeners
    document.getElementById('btnGenerate').addEventListener('click', () => {
        const code = javascript.javascriptGenerator.workspaceToCode(workspace);
        document.getElementById('codePreview').textContent = code;
        logMission("Code Generate: OK");
    });
    
    document.getElementById('btnRun').addEventListener('click', async () => {
        clearLog();
        logMission("--- MISSION START ---", 'info');
        
        // Reset state slightly for re-runs? Or keep current? 
        // Usually reruns happen from current spot unless Reset is hit.
        
        const code = javascript.javascriptGenerator.workspaceToCode(workspace);
        
        try {
            // Safe Async Eval
            const wrappedCode = `(async () => { 
                try {
                    ${code} 
                } catch(err) {
                    logMission("Runtime Interrupt: " + err, 'error'); 
                    console.error(err);
                }
            })();`;
            
            // Execute
            eval(wrappedCode); 
            
        } catch (e) {
            logMission("Compiler Error: " + e, "error");
        }
    });

    document.getElementById('btnReset').addEventListener('click', () => {
        roverState.x = 0;
        roverState.y = 0;
        roverState.direction = 'E';
        roverState.sampleCollected = false;
        
        for(let r=0; r<5; r++) roverState.revealedGrid[r].fill(false);

        clearLog();
        logMission("System Reset. Returned to Base.");
        updateGridUI();
    });

});
