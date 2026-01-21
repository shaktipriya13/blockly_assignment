/**
 * blocks.js
 * Definitions for custom Mars Rover Blockly blocks.
 */

// Define color constants for consistent theming
const ROVER_ACTION_COLOR = '#4CAF50';
const ROVER_SENSOR_COLOR = '#E91E63';
const ROVER_ANALYSIS_COLOR = '#9C27B0';
const ROVER_MISSION_COLOR = '#FF9800';

// 1. Block: Move Forward
Blockly.Blocks['rover_move'] = {
  init: function() {
    this.jsonInit({
      "message0": "Move Forward 🚀",
      "previousStatement": null,
      "nextStatement": null,
      "colour": ROVER_ACTION_COLOR,
      "tooltip": "Moves the rover one step forward in the current direction.",
      "helpUrl": ""
    });
  }
};

// 2. Block: Turn
Blockly.Blocks['rover_turn'] = {
  init: function() {
    this.jsonInit({
      "message0": "Turn %1 🔄",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            ["Left ↺", "LEFT"],
            ["Right ↻", "RIGHT"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": ROVER_ACTION_COLOR,
      "tooltip": "Rotates the rover 90 degrees left or right.",
      "helpUrl": ""
    });
  }
};

// 3. Block: Is Obstacle Ahead?
Blockly.Blocks['rover_detect_obstacle'] = {
  init: function() {
    this.jsonInit({
      "message0": "Is Obstacle Ahead? 🪨",
      "output": "Boolean",
      "colour": ROVER_SENSOR_COLOR,
      "tooltip": "Returns true if there is a rock/obstacle in the cell directly in front of the rover.",
      "helpUrl": ""
    });
  }
};

// 4. Block: Analyze Terrain
Blockly.Blocks['rover_analyze'] = {
  init: function() {
    this.jsonInit({
      "message0": "Analyze Terrain 🔍",
      "output": "String",
      "colour": ROVER_ANALYSIS_COLOR,
      "tooltip": "Scans the current location and determines if a target is present.",
      "helpUrl": ""
    });
  }
};

// 5. Block: Drill for Sample
Blockly.Blocks['rover_drill'] = {
  init: function() {
    this.jsonInit({
      "message0": "Drill for Sample ⛏️",
      "previousStatement": null,
      "nextStatement": null,
      "colour": ROVER_MISSION_COLOR,
      "tooltip": "Extracts a sample from the current location. Only works if target is found.",
      "helpUrl": ""
    });
  }
};

// 6. Block: Transmit Mission Data
Blockly.Blocks['rover_transmit'] = {
  init: function() {
    this.jsonInit({
      "message0": "Transmit Mission Data 📡",
      "previousStatement": null,
      "colour": ROVER_MISSION_COLOR,
      "tooltip": "Sends collected data back to Earth. Completes the mission.",
      "helpUrl": ""
    });
  }
};
