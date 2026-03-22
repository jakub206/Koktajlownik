import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cocktailApi } from "../api/cocktailApi";
import { CocktailCard } from "./CocktailCard";
import { CocktailDetail } from "./CocktailDetail";
import type { Cocktail } from "../types/cocktail";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAlcoholic, setSelectedAlcoholic] = useState<string>("");
  const [selectedGlass, setSelectedGlass] = useState<string>("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(
    null,
  );
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("fav-cocktails");
    return saved ? JSON.parse(saved) : [];
  });

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    localStorage.setItem("fav-cocktails", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    selectedAlcoholic,
    selectedGlass,
    showFavoritesOnly,
  ]);

  const {
    data: allCocktails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cocktails"],
    queryFn: () => cocktailApi.fetchAllCocktails(),
    staleTime: 1000 * 60 * 10,
  });

  const filteredCocktails =
    allCocktails?.filter((drink) => {
      const matchesSearch = drink.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || drink.category === selectedCategory;
      const isAlcoholicSelected = selectedAlcoholic === "true";
      const isNonAlcoholicSelected = selectedAlcoholic === "false";
      const matchesAlcoholic =
        !selectedAlcoholic ||
        (isAlcoholicSelected && drink.alcoholic) ||
        (isNonAlcoholicSelected && !drink.alcoholic);
      const matchesGlass = !selectedGlass || drink.glass === selectedGlass;
      const matchesFavorites =
        !showFavoritesOnly || favorites.includes(drink.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAlcoholic &&
        matchesGlass &&
        matchesFavorites
      );
    }) || [];

  const getCategories = () => {
    if (!allCocktails) return [];
    const catSet = new Set<string>();
    allCocktails.forEach((drink) => {
      if (drink.category) {
        catSet.add(drink.category);
      }
    });
    return Array.from(catSet).sort();
  };

  const getGlasses = () => {
    if (!allCocktails) return [];
    const glassSet = new Set<string>();
    allCocktails.forEach((drink) => {
      if (drink.glass) {
        glassSet.add(drink.glass);
      }
    });
    return Array.from(glassSet).sort();
  };

  const categories = getCategories();
  const glasses = getGlasses();

  const totalPages = Math.ceil(filteredCocktails.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCocktails = filteredCocktails.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      const newFavorites = favorites.filter((favId) => favId !== id);
      setFavorites(newFavorites);
    } else {
      const newFavorites = [...favorites, id];
      setFavorites(newFavorites);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleAlcoholicChange = (value: string) => {
    setSelectedAlcoholic(value);
  };

  const handleGlassChange = (value: string) => {
    setSelectedGlass(value);
  };

  const handleFavoritesToggle = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedAlcoholic("");
    setSelectedGlass("");
    setShowFavoritesOnly(false);
  };

  return (
    <div className="app-bg">
      <div className="container">
        <header className="header">
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => {
              setCurrentPage(1);
            }}
          >
            Koktajlownik🍹
          </h1>
          <input
            type="text"
            placeholder="Search cocktails..."
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            className="search-input"
          />
        </header>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="alcoholic">Type:</label>
            <select
              id="alcoholic"
              value={selectedAlcoholic}
              onChange={(e) => handleAlcoholicChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              <option value="true">Alcoholic</option>
              <option value="false">Non-alcoholic</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="glass">Glass:</label>
            <select
              id="glass"
              value={selectedGlass}
              onChange={(e) => handleGlassChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {glasses.map((glass) => (
                <option key={glass} value={glass}>
                  {glass}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleFavoritesToggle}
            className={`favorites-btn ${showFavoritesOnly ? "active" : ""}`}
            title={showFavoritesOnly ? "Show all" : "Show favorites only"}
          >
            {showFavoritesOnly
              ? `❤️ Favorites (${favorites.length})`
              : `🤍 Favorites (${favorites.length})`}
          </button>

          <button
            onClick={resetFilters}
            disabled={
              !(
                searchTerm ||
                selectedCategory ||
                selectedAlcoholic ||
                selectedGlass ||
                showFavoritesOnly
              )
            }
            className="reset-filters-btn"
          >
            Reset filters
          </button>
        </div>

        {isLoading && <p className="text-center">Loading cocktails...</p>}
        {isError && (
          <p className="text-center text-red-500">Connection error!</p>
        )}

        {!isLoading &&
          filteredCocktails.length === 0 &&
          (searchTerm ||
            selectedCategory ||
            selectedAlcoholic ||
            selectedGlass ||
            showFavoritesOnly) && (
            <div className="no-results">
              <p>
                {showFavoritesOnly && favorites.length === 0
                  ? "You don't have any favorites yet!"
                  : "No cocktails found matching your filters 🔍"}
              </p>
              <button onClick={resetFilters} className="clear-btn">
                Reset filters
              </button>
            </div>
          )}

        <div className="cocktail-grid">
          {paginatedCocktails.map((drink) => (
            <CocktailCard
              key={drink.id}
              cocktail={drink}
              isFavorite={favorites.includes(drink.id)}
              onToggleFavorite={toggleFavorite}
              onSelect={() => setSelectedCocktail(drink)}
            />
          ))}
        </div>

        {filteredCocktails.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="pagination-btn pagination-edge-btn"
              title="First page"
            >
              ⏮ Start
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>

            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next →
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="pagination-btn pagination-edge-btn"
              title="Last page"
            >
              End ⏭
            </button>
          </div>
        )}

        {selectedCocktail && (
          <CocktailDetail
            cocktail={selectedCocktail}
            isFavorite={favorites.includes(selectedCocktail.id)}
            onToggleFavorite={toggleFavorite}
            onClose={() => setSelectedCocktail(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
