import { CategoryCard } from "@/app/_lib/types";
import CategoryCards from "./CategoryCards";


interface Props {
  categories: CategoryCard[];
}


const CategoryContainer: React.FC<Props> = ({ categories }) => {
  return <div className="bg-muted grid grid-cols-4">
    {categories?.map(category => (
        <CategoryCards category={category} />
    ))}
  </div>;
};

export default CategoryContainer;
