import React from 'react';
import './FoodModal.css';

const FoodModal = ({ isOpen, onClose, food, onAddToCart }) => {
  if (!isOpen || !food) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="modal-image">
            <img src={food.image} alt={food.name} />
          </div>
          
          <div className="modal-info">
            <h2>{food.name}</h2>
            <p className="modal-price">{food.price}</p>
            
            <div className="modal-description">
              <h3>Description</h3>
              <p>{food.description}</p>
            </div>
            
            <div className="modal-ingredients">
              <h3>Ingredients</h3>
              <ul>
                {food.ingredients?.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-nutrition">
              <h3>Nutritional Info</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <span>Calories</span>
                  <span>{food.nutrition?.calories || 'N/A'}</span>
                </div>
                <div className="nutrition-item">
                  <span>Protein</span>
                  <span>{food.nutrition?.protein || 'N/A'}</span>
                </div>
                <div className="nutrition-item">
                  <span>Carbs</span>
                  <span>{food.nutrition?.carbs || 'N/A'}</span>
                </div>
                <div className="nutrition-item">
                  <span>Fat</span>
                  <span>{food.nutrition?.fat || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => {
                if (onAddToCart) {
                  onAddToCart(food);
                }
                onClose();
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
