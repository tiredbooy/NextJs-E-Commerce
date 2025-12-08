import { FiHeart } from "react-icons/fi";
import EmptyFavorites from "./EmptyFavorites";
import { getUserFavorites } from "@/app/_lib/services/userService";
import FavoritesProductCards from "./FavoritesProductCards";

async function FavoritesPage() {
  const favorites = await getUserFavorites()
  console.log('favorites:', favorites);
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FiHeart className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            My Favorites
          </h1>
        </div>
        <p className="text-muted-foreground">
          You have {favorites.length} favorite{" "}
          {favorites.length !== 1 ? "items" : "item"}
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <FavoritesProductCards favorites={favorites} />
      )}
    </div>
  );
}

export default FavoritesPage;
