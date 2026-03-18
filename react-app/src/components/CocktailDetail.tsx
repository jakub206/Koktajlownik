import type { Cocktail } from "../types/cocktail";

interface Props {
  cocktail: Cocktail;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClose: () => void;
}

export const CocktailDetail = (props: Props) => {
  const { cocktail, isFavorite, onToggleFavorite, onClose } = props;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleFavoriteClick = () => {
    onToggleFavorite(cocktail.id);
  };

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-card" onClick={handleCardClick}>
        <button className="detail-close-btn" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="detail-image-section">
          <img
            src={cocktail.imageUrl}
            alt={cocktail.name}
            className="detail-image"
          />
        </div>

        <div className="detail-body">
          <h2 className="detail-title">{cocktail.name}</h2>

          <div className="detail-meta">
            <span className="detail-category">{cocktail.category}</span>
            <span className="detail-type">
              {cocktail.alcoholic ? "Alcoholic" : "Non-alcoholic"}
            </span>
            <span className="detail-glass">{cocktail.glass}</span>
          </div>

          {cocktail.ingredients && cocktail.ingredients.length > 0 && (
            <div className="detail-ingredients">
              <h3>Ingredients</h3>
              <ul>
                {cocktail.ingredients.map((ing, i) => (
                  <li key={i}>
                    <span>{ing.name}</span>
                    <span className="ing-amount">{ing.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cocktail.instructions && (
            <div className="detail-instructions">
              <h3>Instructions</h3>
              <p>{cocktail.instructions}</p>
            </div>
          )}

          <button
            className={`detail-fav-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? "❤️ Remove from favorites" : "🤍 Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};
