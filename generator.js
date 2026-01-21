
// 1. Generate: Move Forward
javascript.javascriptGenerator.forBlock['rover_move'] = function(block, generator) {
  // Generates: await roverMove();\n
  // We use 'await' so the execution can pause for animation steps.
  return 'await roverMove();\n';
};

// 2. Generate: Turn
javascript.javascriptGenerator.forBlock['rover_turn'] = function(block, generator) {
  const direction = block.getFieldValue('DIRECTION');
  // Generates: await roverTurn('LEFT' | 'RIGHT');\n
  return `await roverTurn('${direction}');\n`;
};

// 3. Generate: Is Obstacle Ahead?
javascript.javascriptGenerator.forBlock['rover_detect_obstacle'] = function(block, generator) {
  // Generates: roverDetectObstacle()
  // This is a value block, so we return a tuple [code, precedence].
  // FUNCTION_CALL precedence is used.
  const code = 'roverDetectObstacle()';
  return [code, javascript.Order.FUNCTION_CALL];
};

// 4. Generate: Analyze Terrain
javascript.javascriptGenerator.forBlock['rover_analyze'] = function(block, generator) {
  // Generates: roverAnalyze()
  const code = 'roverAnalyze()';
  return [code, javascript.Order.FUNCTION_CALL];
};

// 5. Generate: Drill for Sample
javascript.javascriptGenerator.forBlock['rover_drill'] = function(block, generator) {
  // Generates: await roverDrill();\n
  return 'await roverDrill();\n';
};

// 6. Generate: Transmit Mission Data
javascript.javascriptGenerator.forBlock['rover_transmit'] = function(block, generator) {
  // Generates: await roverTransmit();\n
  return 'await roverTransmit();\n';
};
