
javascript.javascriptGenerator.forBlock['rover_move'] = function(block, generator) {
  return 'await roverMove();\n';
};

javascript.javascriptGenerator.forBlock['rover_turn'] = function(block, generator) {
  const direction = block.getFieldValue('DIRECTION');
  return `await roverTurn('${direction}');\n`;
};

javascript.javascriptGenerator.forBlock['rover_detect_obstacle'] = function(block, generator) {
  const code = 'roverDetectObstacle()';
  return [code, javascript.Order.FUNCTION_CALL];
};

javascript.javascriptGenerator.forBlock['rover_analyze'] = function(block, generator) {
  const code = 'roverAnalyze()';
  return [code, javascript.Order.FUNCTION_CALL];
};

javascript.javascriptGenerator.forBlock['rover_drill'] = function(block, generator) {
  return 'await roverDrill();\n';
};

javascript.javascriptGenerator.forBlock['rover_transmit'] = function(block, generator) {
  return 'await roverTransmit();\n';
};
