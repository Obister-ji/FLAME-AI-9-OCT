const { spawn } = require('child_process');
const { createInterface } = require('readline');

// Test the Supabase MCP server connection
const testSupabaseMcp = async () => {
  console.log('Testing Supabase MCP server connection...');
  
  // Set environment variables
  const env = {
    ...process.env,
    SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN || 'test_token'
  };
  
  // Start the MCP server
  const mcpServer = spawn('npx', ['-y', '@supabase/mcp-server-supabase'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: env
  });
  
  const rl = createInterface({
    input: mcpServer.stdout,
    output: mcpServer.stdin
  });
  
  mcpServer.on('error', (error) => {
    console.error(`Failed to start MCP server: ${error.message}`);
  });
  
  mcpServer.stdout.on('data', (data) => {
    console.log(`MCP Server Output: ${data}`);
    try {
      const response = JSON.parse(data.toString());
      console.log('Parsed response:', JSON.stringify(response, null, 2));
    } catch (e) {
      // Not JSON, just log as is
    }
  });
  
  mcpServer.stderr.on('data', (data) => {
    console.error(`MCP Server Error: ${data}`);
  });
  
  mcpServer.on('close', (code) => {
    console.log(`MCP Server process exited with code ${code}`);
  });
  
  // Send initialization message
  const initMessage = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {
        roots: {
          listChanged: true
        },
        sampling: {}
      },
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    }
  };
  
  setTimeout(() => {
    console.log('Sending initialization message...');
    mcpServer.stdin.write(JSON.stringify(initMessage) + '\n');
  }, 2000);
  
  // Send list tools request
  setTimeout(() => {
    console.log('Requesting available tools...');
    const toolsMessage = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {}
    };
    mcpServer.stdin.write(JSON.stringify(toolsMessage) + '\n');
  }, 4000);
  
  // Close after test
  setTimeout(() => {
    console.log('Test completed, closing connection...');
    mcpServer.kill();
    process.exit(0);
  }, 10000);
};

testSupabaseMcp();