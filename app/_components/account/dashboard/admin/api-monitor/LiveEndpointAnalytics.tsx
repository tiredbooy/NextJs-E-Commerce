"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap, Activity } from "lucide-react";

interface WebSocketEndpoint {
  avg_response_time: number;
  endpoint: string;
  method: string;
  success_rate: number;
  usage_count: number;
}

interface WebSocketData {
  timestamp: string;
  total_today: number;
  top_endpoints: WebSocketEndpoint[];
}

interface Props {
  webSocketUrl: string;
}

export function RealTimeEndpointAnalytics({ webSocketUrl }: Props) {
  const [data, setData] = useState<WebSocketData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket(webSocketUrl);

    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const newData: WebSocketData = JSON.parse(event.data);
        setData(newData);
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [webSocketUrl]);

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getResponseTimeColor = (ms: number) => {
    if (ms < 100) return "text-green-600";
    if (ms < 500) return "text-blue-600";
    if (ms < 1000) return "text-yellow-600";
    return "text-red-600";
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "POST":
        return "bg-green-100 text-green-800 border-green-200";
      case "PUT":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "DELETE":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-600";
    if (rate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  // Calculate some stats from the data
  const totalRequests = data?.total_today || 0;
  const avgResponseTime =
    data?.top_endpoints.reduce((acc, ep) => acc + ep.avg_response_time, 0) /
      (data?.top_endpoints.length || 1) || 0;
  const totalEndpoints = data?.top_endpoints.length || 0;

  return (
    <Card className="col-span-full mt-6 border-2 border-blue-200 bg-blue-50/20 dark:bg-blue-950/10 dark:border-blue-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">
              Real-Time Endpoint Analytics
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={isConnected ? "default" : "secondary"}
              className={
                isConnected
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-gray-100 text-gray-800 border-gray-200"
              }
            >
              <div
                className={`w-2 h-2 rounded-full mr-1 ${
                  isConnected ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              {isConnected ? "Live" : "Disconnected"}
            </Badge>
            {lastUpdate && (
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {lastUpdate}
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="text-blue-600 dark:text-blue-400">
          Live updates from WebSocket connection
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-100 dark:border-blue-900">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                Total Today
              </p>
            </div>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {totalRequests.toLocaleString()}
            </p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">
              Requests
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-100 dark:border-green-900">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              <p className="text-xs font-medium text-green-700 dark:text-green-300">
                Avg Response
              </p>
            </div>
            <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
              {formatResponseTime(avgResponseTime)}
            </p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">
              Across endpoints
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-purple-100 dark:border-purple-900">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-600" />
              <p className="text-xs font-medium text-purple-700 dark:text-purple-300">
                Endpoints
              </p>
            </div>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
              {totalEndpoints}
            </p>
            <p className="text-xs text-purple-600/70 dark:text-purple-400/70 mt-1">
              Active
            </p>
          </div>
        </div>

        {/* Endpoints Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900 overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 border-b border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-200">
              Top Endpoints (Live)
            </h3>
          </div>

          <div className="divide-y divide-blue-100 dark:divide-blue-800">
            {data?.top_endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="p-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <Badge
                      variant="outline"
                      className={`text-xs font-mono ${getMethodColor(
                        endpoint.method
                      )}`}
                    >
                      {endpoint.method}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                        {endpoint.endpoint}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {endpoint.usage_count.toLocaleString()} requests
                        </span>
                        <span
                          className={`flex items-center gap-1 font-medium ${getSuccessRateColor(
                            endpoint.success_rate
                          )}`}
                        >
                          <div className="w-1 h-1 rounded-full bg-current" />
                          {endpoint.success_rate}% success
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <p
                      className={`text-sm font-bold ${getResponseTimeColor(
                        endpoint.avg_response_time
                      )}`}
                    >
                      {formatResponseTime(endpoint.avg_response_time)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      avg response
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {!data && (
              <div className="p-8 text-center">
                <div className="animate-pulse">
                  <Activity className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isConnected
                      ? "Waiting for data..."
                      : "Connecting to WebSocket..."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Source Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Live WebSocket Feed</span>
            </div>
            <div className="text-blue-600/70 dark:text-blue-400/70">
              {data?.timestamp
                ? `Last snapshot: ${new Date(
                    data.timestamp
                  ).toLocaleTimeString()}`
                : "No data received"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
