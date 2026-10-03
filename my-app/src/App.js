import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './components/GoogleMap';
import FoodModal from './components/FoodModal';
import PaymentModal from './components/PaymentModal';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [activeCategory, setActiveCategory] = useState('All');
  const [orderType, setOrderType] = useState('pickup');
  const [cart, setCart] = useState([]);
  const [reservationForm, setReservationForm] = useState({
    date: '',
    time: '',
    guests: '2',
    fullName: '',
    email: '',
    phone: '',
    specialRequest: ''
  });
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    specialInstructions: ''
  });
  const [formMessages, setFormMessages] = useState({});
  const [selectedFood, setSelectedFood] = useState(null);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuListModalOpen, setIsMenuListModalOpen] = useState(false);
  const itemsPerPage = 6;

  const menuItems = [
    {
      id: 1,
      name: "Steamed Momos",
      description: "Traditional Tibetan dumplings with minced chicken and vegetables, served with spicy tomato chutney and garlic sauce",
      price: "₹349",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop",
      ingredients: ["Wheat flour", "Minced chicken", "Cabbage", "Carrots", "Garlic", "Ginger", "Soy sauce", "Tibetan spices"],
      nutrition: {
        calories: "320",
        protein: "18g",
        carbs: "42g",
        fat: "8g"
      }
    },
    {
      id: 2,
      name: "Fried Momos",
      description: "Crispy pan-fried Tibetan dumplings with savory filling, served with hot dipping sauce",
      price: "₹379",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop",
      ingredients: ["Wheat flour", "Minced chicken", "Cabbage", "Carrots", "Garlic", "Ginger", "Oil", "Tibetan spices"],
      nutrition: {
        calories: "380",
        protein: "18g",
        carbs: "40g",
        fat: "15g"
      }
    },
    {
      id: 3,
      name: "Chicken Thukpa",
      description: "Hearty Tibetan noodle soup with chicken, vegetables, and traditional spices - perfect for cold weather",
      price: "₹289",
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
      ingredients: ["Wheat noodles", "Chicken broth", "Chicken pieces", "Carrots", "Cabbage", "Spinach", "Garlic", "Ginger", "Tibetan spices"],
      nutrition: {
        calories: "380",
        protein: "22g",
        carbs: "45g",
        fat: "12g"
      }
    },
    {
      id: 4,
      name: "Vegetable Thukpa",
      description: "Vegetarian noodle soup loaded with fresh vegetables and authentic Tibetan flavors",
      price: "₹249",
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=300&h=200&fit=crop",
      ingredients: ["Wheat noodles", "Vegetable broth", "Carrots", "Cabbage", "Spinach", "Bell peppers", "Garlic", "Ginger", "Tibetan spices"],
      nutrition: {
        calories: "320",
        protein: "12g",
        carbs: "48g",
        fat: "8g"
      }
    },
    {
      id: 5,
      name: "Tibetan Butter Tea",
      description: "Traditional salty butter tea (Po Cha) made with yak butter and salt - a staple of Tibetan culture",
      price: "₹149",
      category: "Drinks",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
      ingredients: ["Tibetan tea leaves", "Yak butter", "Salt", "Milk"],
      nutrition: {
        calories: "120",
        protein: "2g",
        carbs: "5g",
        fat: "10g"
      }
    },
    {
      id: 6,
      name: "Tibetan Bread",
      description: "Fresh baked Tibetan flatbread (Balep Korkun) served with butter and honey",
      price: "₹189",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
      ingredients: ["Wheat flour", "Yeast", "Water", "Salt", "Butter"],
      nutrition: {
        calories: "250",
        protein: "8g",
        carbs: "45g",
        fat: "6g"
      }
    },
    {
      id: 7,
      name: "Chicken Shapta",
      description: "Stir-fried chicken with bell peppers, onions, and Tibetan spices served with steamed rice",
      price: "₹329",
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop",
      ingredients: ["Chicken breast", "Bell peppers", "Onions", "Garlic", "Ginger", "Soy sauce", "Tibetan spices", "Rice"],
      nutrition: {
        calories: "450",
        protein: "35g",
        carbs: "35g",
        fat: "18g"
      }
    },
    {
      id: 8,
      name: "Tingmo",
      description: "Steamed Tibetan bread rolls, soft and fluffy, perfect with any curry or soup",
      price: "₹179",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
      ingredients: ["Wheat flour", "Yeast", "Water", "Sugar", "Salt"],
      nutrition: {
        calories: "200",
        protein: "6g",
        carbs: "38g",
        fat: "4g"
      }
    },
    {
      id: 9,
      name: "Tibetan Hot Pot",
      description: "Spicy hot pot with vegetables, chicken, and traditional Tibetan broth - perfect for sharing",
      price: "₹599",
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1559314809-8bad44b8a9b6?w=300&h=200&fit=crop",
      ingredients: ["Chicken", "Assorted vegetables", "Tibetan broth", "Spicy sauce", "Garlic", "Ginger", "Tibetan spices"],
      nutrition: {
        calories: "320",
        protein: "28g",
        carbs: "25g",
        fat: "15g"
      }
    },
    {
      id: 10,
      name: "Sidpa (Beef Stew)",
      description: "Tender beef stew cooked with Tibetan spices, served with steamed rice",
      price: "₹399",
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
      ingredients: ["Beef", "Potatoes", "Carrots", "Tibetan spices", "Garlic", "Ginger", "Rice"],
      nutrition: {
        calories: "480",
        protein: "40g",
        carbs: "30g",
        fat: "22g"
      }
    },
    {
      id: 11,
      name: "Lhasa Beer",
      description: "Traditional Tibetan barley beer - smooth and refreshing",
      price: "₹199",
      category: "Drinks",
      image: "https://images.unsplash.com/photo-1535958637004-7e7c73a7f9db?w=300&h=200&fit=crop",
      ingredients: ["Barley", "Water", "Yeast"],
      nutrition: {
        calories: "150",
        protein: "2g",
        carbs: "12g",
        fat: "0g"
      }
    },
    {
      id: 12,
      name: "Khapse (Tibetan Cookies)",
      description: "Traditional deep-fried Tibetan cookies, crispy and sweet - perfect dessert",
      price: "₹229",
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=200&fit=crop",
      ingredients: ["Wheat flour", "Sugar", "Butter", "Oil"],
      nutrition: {
        calories: "280",
        protein: "5g",
        carbs: "42g",
        fat: "12g"
      }
    },
    {
      id: 13,
      name: "Tibetan Noodles (Thenthuk)",
      description: "Hand-pulled Tibetan noodles in savory broth with vegetables and meat",
      price: "₹279",
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
      ingredients: ["Hand-pulled noodles", "Chicken/Beef", "Vegetables", "Tibetan broth", "Spices"],
      nutrition: {
        calories: "380",
        protein: "24g",
        carbs: "42g",
        fat: "14g"
      }
    },
    {
      id: 14,
      name: "Yak Butter",
      description: "Authentic Tibetan yak butter - rich and creamy, served with Tibetan bread",
      price: "₹349",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1618164436269-1f3c1843c94d?w=300&h=200&fit=crop",
      ingredients: ["Yak butter", "Salt"],
      nutrition: {
        calories: "720",
        protein: "1g",
        carbs: "0g",
        fat: "80g"
      }
    },
    {
      id: 15,
      name: "Churpi",
      description: "Hard Tibetan cheese made from yak milk - traditional snack",
      price: "₹299",
      category: "Appetizers",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=200&fit=crop",
      ingredients: ["Yak milk", "Salt"],
      nutrition: {
        calories: "320",
        protein: "25g",
        carbs: "2g",
        fat: "22g"
      }
    }
  ];

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'];
  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter(item => item.category === activeCategory);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  
  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);
  
  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: document.getElementById('menu').offsetTop - 100, behavior: 'smooth' });
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Cart functions
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Form handlers
  const handleReservationChange = (e) => {
    setReservationForm({
      ...reservationForm,
      [e.target.name]: e.target.value
    });
  };

  const handleOrderChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://127.0.0.1:3000/api/reservations", reservationForm);
      const response = await axios.post("https://sizeable-shoshana-wedgier.ngrok-free.dev/api/reservations", reservationForm);

      const data = response.data; // ✅ Axios already parsed it
      alert(data.alert || data.message); // ✅ Works fine now

      setFormMessages({ reservation: { type: 'success', text: response.data.message } });
      setReservationForm({
        date: '',
        time: '',
        guests: '2',
        fullName: '',
        email: '',
        phone: '',
        specialRequest: ''
      });

    } catch (error) {
      setFormMessages({ reservation: { type: 'error', text: 'Failed to submit reservation. Please try again.' } });
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setFormMessages({ order: { type: 'error', text: 'Please add items to your cart first.' } });
      return;
    }

    try {
      const orderData = {
        ...orderForm,
        orderType,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotalAmount()
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      
      // Store order data for payment
      setCurrentOrder({
        ...orderData,
        orderId: response.data.orderId
      });
      
      // Open payment modal
      setIsPaymentModalOpen(true);
    } catch (error) {
      setFormMessages({ order: { type: 'error', text: 'Failed to submit order. Please try again.' } });
    }
  };

  // Modal functions
  const openFoodModal = (food) => {
    setSelectedFood(food);
    setIsFoodModalOpen(true);
  };

  const closeFoodModal = () => {
    setIsFoodModalOpen(false);
    setSelectedFood(null);
  };

  const handlePaymentSuccess = () => {
    setFormMessages({ order: { type: 'success', text: 'Order placed and payment completed successfully!' } });
    setCart([]);
    setOrderForm({
      name: '',
      phone: '',
      address: '',
      email: '',
      specialInstructions: ''
    });
    setIsPaymentModalOpen(false);
    setCurrentOrder(null);
  };

  // Scroll to section functions
  const scrollToOrder = () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToReservation = () => {
    const reservationSection = document.getElementById('reservation');
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
   {/* Header */}
<header className="header">
  <div className="container">
    <div className="logo">Tibetan Restaurant</div>

    {/* ✅ Hamburger Icon (visible only on mobile) */}
    <div
      className={`hamburger ${isMenuOpen ? "active" : ""}`}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>

    {/* ✅ Navigation Menu */}
    <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
      <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
      <a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a>
      <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
      <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>

      {/* ✅ These buttons will appear INSIDE the hamburger menu on mobile */}
      <div className="mobile-header-buttons">
        <button
          className="btn-header-order"
          onClick={() => {
            scrollToOrder();
            setIsMenuOpen(false);
          }}
        >
          Order Now
        </button>
        <button
          className="btn-header-reserve"
          onClick={() => {
            scrollToReservation();
            setIsMenuOpen(false);
          }}
        >
          Reserve Table
        </button>
      </div>
    </nav>

    {/* ✅ These buttons remain visible only for desktop view */}
    <div className="header-buttons">
      <button className="btn-header-order" onClick={scrollToOrder}>
        Order Now
      </button>
      <button className="btn-header-reserve" onClick={scrollToReservation}>
        Reserve Table
      </button>
    </div>
  </div>
</header>


      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Authentic Tibetan Cuisine</h1>
          <p>Experience the finest traditional Tibetan dishes in a comfortable and elegant setting. Book your table or order online for a delightful meal.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToOrder}>Order Now</button>
            <button className="btn-secondary" onClick={scrollToReservation}>Reserve Table</button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <div className="container">
          <h2>Our Menu</h2>
          <p className="section-description">Discover our exquisite menu, where every dish is a celebration of authentic taste and culinary craftsmanship.</p>
          
          <div className="menu-categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {currentItems.map(item => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-image-wrapper" onClick={() => openFoodModal(item)}>
                  <img src={item.image} alt={item.name} className="menu-item-image" />
                  <div className="menu-item-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-footer">
                  <span className="price">{item.price}</span>
                  <button className="btn-add" onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredItems.length > itemsPerPage && (
            <div className="pagination">
              <button 
                className="pagination-btn prev-btn" 
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              <div className="pagination-numbers">
                {(() => {
                  const pages = [];
                  const showPages = [];
                  
                  // Always show first page
                  showPages.push(1);
                  
                  // Show pages around current page
                  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                    if (!showPages.includes(i)) {
                      showPages.push(i);
                    }
                  }
                  
                  // Always show last page if more than 1 page
                  if (totalPages > 1) {
                    showPages.push(totalPages);
                  }
                  
                  // Remove duplicates and sort
                  const uniquePages = [...new Set(showPages)].sort((a, b) => a - b);
                  
                  // Build pagination buttons with ellipsis
                  uniquePages.forEach((page, index) => {
                    // Add ellipsis before this page if needed
                    if (index > 0 && page - uniquePages[index - 1] > 1) {
                      pages.push(<span key={`ellipsis-${page}`} className="pagination-ellipsis">...</span>);
                    }
                    
                    pages.push(
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    );
                  });
                  
                  return pages;
                })()}
              </div>
              
              <button 
                className="pagination-btn next-btn" 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          {/* View Menu List Button */}
          <div className="view-menu-list-container">
            <button className="btn-primary view-menu-list-btn" onClick={() => setIsMenuListModalOpen(true)}>
              View Menu List
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>About Our Restaurant</h2>
          <p className="section-description">Tibetan Restaurant is a renowned Tibetan restaurant established in 2005.</p>
          
          <div className="about-content">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop" alt="Chef cooking" />
            </div>
            <div className="about-text">
              <h3>Our Story</h3>
              <p>Founded in 2005, Tibetan Restaurant has been serving authentic Tibetan cuisine to our community for over two decades. Our mission is to bring the rich flavors and traditions of Tibet to every table, creating memorable dining experiences that celebrate our heritage.</p>
              <p>We source the finest ingredients and prepare each dish with traditional techniques passed down through generations. Our commitment to quality and authenticity has made us a beloved destination for food lovers seeking genuine Tibetan flavors.</p>
              
              <div className="features">
                <div className="feature">
                  <div className="feature-icon">🍽️</div>
                  <span>20+ Years of Experience</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">📋</div>
                  <span>100+ Menu Items</span>
                </div>
                <div className="feature">
                  <div className="feature-icon">⭐</div>
                  <span>5-Star Ratings</span>
                </div>
              </div>

              <div className="additional-features">
                <div className="feature-item">
                  <h4>Great Experience</h4>
                  <p>We ensure that every customer leaves with a memorable dining experience.</p>
                </div>
                <div className="feature-item">
                  <h4>Awesome Reviews</h4>
                  <p>Our customers love us, and we're proud of the positive feedback we receive.</p>
                </div>
                <div className="feature-item">
                  <h4>Great Ambience</h4>
                  <p>A cozy and inviting atmosphere perfect for any occasion.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="order-section">
        <div className="container">
          <h2>Place Your Order</h2>
          <p className="section-description">Order your favorite dishes for delivery or pickup.</p>
          
          <form className="order-form" onSubmit={handleOrderSubmit}>
            {formMessages.order && (
              <div className={`form-message ${formMessages.order.type}`}>
                {formMessages.order.text}
              </div>
            )}
            
            <div className="form-group">
              <label>Order Type:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === 'pickup'}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                  Pickup
                </label>
                <label>
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === 'delivery'}
                    onChange={(e) => setOrderType(e.target.value)}
                  />
                  Delivery
                </label>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Name:</label>
                <input 
                  type="text" 
                  name="name"
                  value={orderForm.name}
                  onChange={handleOrderChange}
                  placeholder="Your full name" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleOrderChange}
                  placeholder="Your phone number" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Address:</label>
              <input 
                type="text" 
                name="address"
                value={orderForm.address}
                onChange={handleOrderChange}
                placeholder="Your address" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Email Address:</label>
              <input 
                type="email" 
                name="email"
                value={orderForm.email}
                onChange={handleOrderChange}
                placeholder="Your email address" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Special Instructions:</label>
              <textarea 
                name="specialInstructions"
                value={orderForm.specialInstructions}
                onChange={handleOrderChange}
                placeholder="Any special requests or instructions"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label>Order Summary:</label>
              <div className="order-summary">
                {cart.length === 0 ? (
                  <p>Your cart is empty. Add items from the menu above.</p>
                ) : (
                  <div>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(0)}</span>
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >-</button>
                        <span>{item.quantity}</span>
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >+</button>
                        <button 
                          type="button" 
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                        >Remove</button>
                      </div>
                    ))}
                    <div className="cart-total">
                      <strong>Total: ₹{getTotalAmount().toFixed(0)}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button type="submit" className="btn-primary" disabled={cart.length === 0}>
              Place Order
            </button>
          </form>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="reservation-section">
        <div className="container">
          <h2>Reserve Your Table</h2>
          <p className="section-description">Book your table in advance to ensure a delightful dining experience.</p>
          
          <form className="reservation-form" onSubmit={handleReservationSubmit}>
            {formMessages.reservation && (
              <div className={`form-message ${formMessages.reservation.type}`}>
                {formMessages.reservation.text}
              </div>
            )}
            
            <div className="form-row">
              <div className="form-group">
                <label>Date:</label>
                <input 
                  type="date" 
                  name="date"
                  value={reservationForm.date}
                  onChange={handleReservationChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input 
                  type="time" 
                  name="time"
                  value={reservationForm.time}
                  onChange={handleReservationChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Number of Guests:</label>
                <select 
                  name="guests"
                  value={reservationForm.guests}
                  onChange={handleReservationChange}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6+</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Full Name:</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={reservationForm.fullName}
                  onChange={handleReservationChange}
                  placeholder="Your full name" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address:</label>
                <input 
                  type="email" 
                  name="email"
                  value={reservationForm.email}
                  onChange={handleReservationChange}
                  placeholder="Your email address" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Phone Number:</label>
              <input 
                type="tel" 
                name="phone"
                value={reservationForm.phone}
                onChange={handleReservationChange}
                placeholder="Your phone number" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Special Request:</label>
              <textarea 
                name="specialRequest"
                value={reservationForm.specialRequest}
                onChange={handleReservationChange}
                placeholder="Any special requests or dietary requirements"
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary">Reserve Now</button>
          </form>
        </div>
      </section>

      {/* Visit Us Section */}
      <section id="contact" className="visit-section">
        <div className="container">
          <h2>Visit Us</h2>
          <p className="section-description">Come and experience the authentic Tibetan cuisine in our cozy and elegant restaurant.</p>
          
          <div className="visit-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <span className="icon">📍</span>
                <span>Near NIT Srinagar, Hazratbal<br />Srinagar, Jammu and Kashmir 190006</span>
              </div>
              <div className="contact-item">
                <span className="icon">📞</span>
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <span className="icon">✉️</span>
                <span>info@tibetkitchen.com</span>
              </div>
              <div className="contact-item">
                <span className="icon">🕒</span>
                <span>Monday - Friday: 11 AM - 10 PM<br />Saturday - Sunday: 12 PM - 11 PM</span>
              </div>
            </div>
            
            <div className="map">
              <GoogleMap />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Tibetan Restaurant</h3>
              <p>Tibetan Restaurant is a culinary journey to the heart of the Himalayas, offering authentic Tibetan dishes.</p>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">📷</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>123 Main Street<br />Anytown, USA 12345</p>
              <p>+1 (555) 123-4567</p>
              <p>info@tibetkitchen.com</p>
            </div>
          </div>
          
              <div className="footer-bottom">
            <p>&copy; 2024 Tibetan Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FoodModal 
        isOpen={isFoodModalOpen}
        onClose={closeFoodModal}
        food={selectedFood}
        onAddToCart={addToCart}
      />
      
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderData={currentOrder}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Menu List Modal */}
      {isMenuListModalOpen && (
        <div className="menu-list-overlay" onClick={() => setIsMenuListModalOpen(false)}>
          <div className="menu-list-modal" onClick={(e) => e.stopPropagation()}>
            <button className="menu-list-close" onClick={() => setIsMenuListModalOpen(false)}>×</button>
            <div className="menu-list-header">
              <h2>Complete Menu List</h2>
              <p>All available dishes with prices</p>
            </div>
            <div className="menu-list-content">
              {categories.map(category => {
                const categoryItems = category === 'All' 
                  ? menuItems 
                  : menuItems.filter(item => item.category === category);
                
                if (categoryItems.length === 0 || category === 'All') return null;
                
                return (
                  <div key={category} className="menu-list-category">
                    <h3 className="menu-list-category-title">{category}</h3>
                    <ul className="menu-list-items">
                      {categoryItems.map(item => (
                        <li key={item.id} className="menu-list-item">
                          <span className="menu-list-item-name">{item.name}</span>
                          <span className="menu-list-item-price">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
