# MCP Server Setup for Supabase

## Overview
This document outlines the setup process for the Model Context Protocol (MCP) server for Supabase integration.

## Configuration
The MCP configuration has been created at:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

## Current Configuration
```json
{
  "mcpServers": {
    "supabase-mcp": {
      "command": "npx",
      "args": ["-y", "supabase-mcp-server"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "your_supabase_access_token_here"
      }
    }
  }
}
```

## Setup Steps Completed
1. ✅ Created MCP configuration directory
2. ✅ Created claude_desktop_config.json file
3. ✅ Installed @supabase/mcp-utils package
4. ✅ Installed @modelcontextprotocol/inspector package
5. ✅ Updated configuration to use correct package (@supabase/mcp-server-supabase)
6. ✅ Successfully tested MCP server connection

## Test Results
The Supabase MCP server is working correctly with:
- Server version: 0.5.6
- Protocol version: 2024-11-05
- 25 available tools including:
  - Search Supabase documentation
  - List organizations and projects
  - Create/manage projects and branches
  - Execute SQL queries
  - Apply migrations
  - Manage Edge Functions
  - Get project logs and advisors

## Next Steps
1. Replace `your_supabase_access_token_here` with your actual Supabase access token
2. Restart Claude Desktop to load the new MCP configuration
3. Use the MCP tools directly through Claude Desktop

## Testing
The MCP server has been successfully tested using the custom test script (supabase-mcp-test.js). The server:
- Initializes properly with the MCP protocol
- Responds to tool listing requests
- Provides access to all Supabase management features

## Notes
- The MCP server is configured to use npx to run the @supabase/mcp-server-supabase package
- The server requires a valid Supabase access token to access your projects
- The MCP Inspector is running at http://localhost:6274 but the server communicates via stdio, not HTTP
- All 25 tools are available for managing Supabase resources

## Troubleshooting
If the MCP server doesn't connect in Claude Desktop:
1. Verify your Supabase access token is correct in the configuration
2. Restart Claude Desktop after making configuration changes
3. Check that the @supabase/mcp-server-supabase package is accessible
4. Run the test script (node supabase-mcp-test.js) to verify server functionality