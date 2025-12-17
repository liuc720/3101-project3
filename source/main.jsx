import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

// Travel photos data
const initialTravels = [
  // Beach
  { id: 1, title: "Tropical Beach", image: "/source/images/beach1.jpg", category: "uncategorized", location: "Maldives" },
  { id: 2, title: "Beach Sunset", image: "/source/images/beach2.jpg", category: "uncategorized", location: "Bali" },
  { id: 3, title: "Surfing Paradise", image: "/source/images/beach3.jpg", category: "uncategorized", location: "Hawaii" },
  { id: 4, title: "Beach Resort", image: "/source/images/beach4.jpg", category: "uncategorized", location: "Phuket" },
  
  // Mountain
  { id: 5, title: "Snowy Mountains", image: "/source/images/mountain1.jpg", category: "uncategorized", location: "Swiss Alps" },
  { id: 6, title: "Hiking Trail", image: "/source/images/mountain2.jpg", category: "uncategorized", location: "Nepal" },
  { id: 7, title: "Mountain Peak", image: "/source/images/mountain3.jpg", category: "uncategorized", location: "Norway" },
  { id: 8, title: "Mountain Trek", image: "/source/images/mountain4.jpg", category: "uncategorized", location: "New Zealand" },
  
  // City
  { id: 9, title: "Tokyo Night", image: "/source/images/city1.jpg", category: "uncategorized", location: "Tokyo, Japan" },
  { id: 10, title: "NYC Skyline", image: "/source/images/city2.jpg", category: "uncategorized", location: "New York, USA" },
  { id: 11, title: "Paris Streets", image: "/source/images/city3.jpg", category: "uncategorized", location: "Paris, France" },
  { id: 12, title: "Dubai Tower", image: "/source/images/city4.jpg", category: "uncategorized", location: "Dubai, UAE" },
  
  // Food
  { id: 13, title: "Street Food", image: "/source/images/food1.jpg", category: "uncategorized", location: "Bangkok, Thailand" },
  { id: 14, title: "Japanese Cuisine", image: "/source/images/food2.jpg", category: "uncategorized", location: "Kyoto, Japan" },
  { id: 15, title: "Food Market", image: "/source/images/food3.jpg", category: "uncategorized", location: "Barcelona, Spain" },
  
  // Culture
  { id: 16, title: "Chinese Temple", image: "/source/images/culture1.jpg", category: "uncategorized", location: "Jiujiang, China" },
  { id: 17, title: "Museum", image: "/source/images/culture2.jpg", category: "uncategorized", location: "Paris, France" },
  { id: 18, title: "Historic Building", image: "/source/images/culture3.jpg", category: "uncategorized", location: "Rome, Italy" },
];

window.addEventListener("load", () => {
  let root = createRoot(document.getElementById("root"));
  root.render(<App />);
});

function App() {
  // State: store all travel photos
  const [travels, setTravels] = useState(initialTravels);
  
  // State: currently selected photo ID
  const [selectedId, setSelectedId] = useState(null);
  
  // Travel type categories
  const categories = [
    { id: "beach", name: "Beach", emoji: "🏖️" },
    { id: "mountain", name: "Mountain", emoji: "🏔️" },
    { id: "city", name: "City", emoji: "🏙️" },
    { id: "food", name: "Food", emoji: "🍜" },
    { id: "culture", name: "Culture", emoji: "🎭" }
  ];

  // Move photo to specified category
  const moveToCategory = (categoryId) => {
    if (!selectedId) return;
    
    setTravels(travels.map(travel => 
      travel.id === selectedId 
        ? { ...travel, category: categoryId }
        : travel
    ));
    
    setSelectedId(null); // Deselect
  };

  // Get photos by category
  const getTravelsByCategory = (categoryId) => {
    return travels.filter(t => t.category === categoryId);
  };

  // Get uncategorized photos
  const getUncategorized = () => {
    return travels.filter(t => t.category === "uncategorized");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🗺️ My Travel Archive</h1>
        <p className="subtitle">Click a photo to select it, then click a category button to organize</p>
        <div className="stats">
          <span>Total Photos: {travels.length}</span>
          <span>Categorized: {travels.filter(t => t.category !== "uncategorized").length}</span>
          <span>Uncategorized: {getUncategorized().length}</span>
        </div>
      </header>

      {/* Category selection area */}
      <div className="categories">
        <h2>📂 Select Travel Type</h2>
        <div className="category-buttons">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${!selectedId ? 'disabled' : ''}`}
              onClick={() => moveToCategory(cat.id)}
              disabled={!selectedId}
            >
              <span className="emoji">{cat.emoji}</span>
              <span className="name">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categorized photos display area */}
      <div className="categorized-section">
        <h2>Categorized Photos</h2>
        {categories.map(cat => {
          const items = getTravelsByCategory(cat.id);
          if (items.length === 0) return null;
          
          return (
            <div key={cat.id} className="category-group">
              <h3>
                <span className="emoji">{cat.emoji}</span>
                {cat.name}
                <span className="count">({items.length})</span>
              </h3>
              <div className="photo-grid">
                {items.map(travel => (
                  <PhotoCard
                    key={travel.id}
                    travel={travel}
                    isSelected={selectedId === travel.id}
                    onClick={() => setSelectedId(travel.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {travels.filter(t => t.category !== "uncategorized").length === 0 && (
          <p className="empty-message">No photos categorized yet. Start organizing below!</p>
        )}
      </div>

      {/* Uncategorized photos area */}
      <div className="uncategorized-section">
        <h2>Uncategorized Photos</h2>
        {getUncategorized().length === 0 ? (
          <p className="success-message">All photos have been categorized!</p>
        ) : (
          <div className="photo-grid">
            {getUncategorized().map(travel => (
              <PhotoCard
                key={travel.id}
                travel={travel}
                isSelected={selectedId === travel.id}
                onClick={() => setSelectedId(travel.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Photo card component
function PhotoCard({ travel, isSelected, onClick }) {
  return (
    <div 
      className={`photo-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="photo-wrapper">
        <img src={travel.image} alt={travel.title} />
        {isSelected && (
          <div className="selected-badge">✓</div>
        )}
      </div>
    </div>
  );
}