export interface StatData {
  value: number;
  change: number;
}

export interface EndpointStat {
  endpoint: string;
  method: string;
  usage_count: number;
  avg_response_time: number;
  success_rate: number;
}

export interface DailyTrend {
  date: string;
  total_request: number;
  avg_response_time: number;
}
