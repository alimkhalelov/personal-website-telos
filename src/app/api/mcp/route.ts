import { NextRequest, NextResponse } from "next/server";
import { executePublicMcpTool, PUBLIC_MCP_TOOLS } from "@/lib/public-mcp";

export const dynamic = "force-dynamic";

const SERVER_INFO = {
  name: "alim-khalelov-portfolio-mcp",
  version: "1.0.0",
  protocolVersion: "2024-11-05",
};

export async function GET() {
  return NextResponse.json({
    ...SERVER_INFO,
    readOnly: true,
    endpoint: "https://alim.dest.page/api/mcp",
    tools: PUBLIC_MCP_TOOLS,
  });
}

export async function POST(req: NextRequest) {
  let id: string | number | null = null;
  try {
    const body = await req.json();
    id = body?.id ?? null;
    const method = String(body?.method || "");
    const params = (body?.params || {}) as Record<string, unknown>;

    if (method === "initialize") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: SERVER_INFO.protocolVersion,
          capabilities: { tools: {} },
          serverInfo: { name: SERVER_INFO.name, version: SERVER_INFO.version },
        },
      });
    }

    if (method === "notifications/initialized") {
      return NextResponse.json({ jsonrpc: "2.0", id, result: {} });
    }

    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: { tools: PUBLIC_MCP_TOOLS },
      });
    }

    if (method === "tools/call") {
      const toolName = String(params.name || "");
      const toolArgs = ((params.arguments || {}) as Record<string, unknown>) || {};
      const out = executePublicMcpTool(toolName, toolArgs);
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(out.ok ? out.data : { error: out.error }, null, 2) }],
          isError: !out.ok,
        },
      });
    }

    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        error: { code: -32700, message: "Parse error" },
      },
      { status: 400 }
    );
  }
}
