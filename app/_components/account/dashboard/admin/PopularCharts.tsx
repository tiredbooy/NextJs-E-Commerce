import {
  getPopularCategories,
  getPopularProducts,
} from "@/app/_lib/services/analyticsService";
import PopularChart from "./PopularChart";

interface Props {
  // props here
}

export default async function PopularChartsSection({}: Props) {
  const [popularCategories, popularProducts] = await Promise.all([
    getPopularCategories(),
    getPopularProducts(),
  ]);

  return (
    <>
      <div className="rounded-md border bg-card">
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                Popular Products
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Most Pupolar Products
              </p>
            </div>
          </div>
          <PopularChart data={popularProducts} title="Popular Products" />
        </div>
      </div>
      <div className="rounded-md border bg-card">
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                Popular Categories
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Most Pupolar Categories
              </p>
            </div>
          </div>
          <PopularChart data={popularCategories} title="Popular Categories" />
        </div>
      </div>
    </>
  );
}
