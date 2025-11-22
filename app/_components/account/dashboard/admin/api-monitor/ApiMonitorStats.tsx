import { getApiDailyTrends, getApiEndPointsAnalytics } from "@/app/_lib/services/analyticsService";
import { DailyTrendsChart } from "./DailyTrendsChart";
import { EndpointPerformanceChart } from "./EndpointPerformanceChart";
import { RealTimeEndpointAnalytics } from "./LiveEndpointAnalytics";

export async function ApiMonitorStats() {
  const [endpoints, trends] = await Promise.all([
    getApiEndPointsAnalytics(),
    getApiDailyTrends()
  ]) ;

  return (
    <div className="flex flex-col gap-5">
      <DailyTrendsChart trends={trends} />
      <EndpointPerformanceChart endpoints={endpoints} />
      <RealTimeEndpointAnalytics webSocketUrl="http://localhost:8080/ws/analytics" />
    </div>
  );
}
