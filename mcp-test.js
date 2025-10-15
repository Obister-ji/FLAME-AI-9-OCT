const { spawn } = require('child_process');
const path = require('path');

// Test the MCP server connection
const testMcpServer = async () => {
  console.log('Testing MCP server connection...');
  
  // Start the MCP server
  const mcpServer = spawn('npx', ['-y', '@supabase/mcp-server-supabase'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true
  });
  
  mcpServer.on('error', (error) => {
    console.error(`Failed to start MCP server: ${error.message}`);
  });
  
  mcpServer.stdout.on('data', (data) => {
    console.log(`MCP Server Output: ${data}`);
  });
  
  mcpServer.stderr.on('data', (data) => {
    console.error(`MCP Server Error: ${data}`);
  });
  
  mcpServer.on('close', (code) => {
    console.log(`MCP Server process exited with code ${code}`);
  });
  
  // Send a test message
  setTimeout(() => {
    console.log('Sending test message to MCP server...');
    mcpServer.stdin.write(JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
          name: "test-client",
          version: "1.0.0"
        }
      }
    }) + '\n');
  }, 2000);
  
  // Close after test
  setTimeout(() => {
    mcpServer.kill();
    process.exit(0);
  }, 10000);
};

testMcpServer();