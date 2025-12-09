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
    getPopularCategories(5),
    getPopularProducts(5),
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
          {popularProducts && popularProducts.length > 1 ? (
            <PopularChart data={popularProducts} />
          ) : (
            <div className="bg-destructive font-semibold px-4 py-2 rounded-md text-background text-center">
              There Is No Data At this time
            </div>
          )}
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
          {popularCategories && popularCategories.length > 1 ? (
            <PopularChart data={popularCategories} />
          ) : (
            <div className="bg-destructive font-semibold px-4 py-2 rounded-md text-background text-center">
              There Is No Data At this time
            </div>
          )}
        </div>
      </div>
    </>
  );
}
