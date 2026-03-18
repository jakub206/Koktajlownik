import type { Cocktail } from "../types/cocktail";

interface Props {
  cocktail: Cocktail;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
  onSelect?: () => void;
}

export const CocktailCard = (props: Props) => {
  const { cocktail, onToggleFavorite, isFavorite, onSelect } = props;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(cocktail.id);
  };

  return (
    <div className="card" onClick={onSelect}>
      <button className="fav-button" onClick={handleFavoriteClick}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <img src={cocktail.imageUrl} alt={cocktail.name} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{cocktail.name}</h3>
        <span className="card-category">{cocktail.category}</span>
      </div>
    </div>
  );
};
