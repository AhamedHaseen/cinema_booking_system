// Global Variables
let currentPage = 'home';
let selectedSeats = [];
let bookingData = {};
let foodCart = [];
let totalAmount = 0;
let bookingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');

// Sample Data
const movies = [
    {
        id: 1,
        title: "Avengers: Endgame",
        genre: "action",
        rating: "8.4",
        duration: "181 min",
        price: 12.99,
        showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
        description: "The epic conclusion to the Avengers saga"
    },
    {
        id: 2,
        title: "The Lion King",
        genre: "family",
        rating: "7.9",
        duration: "118 min",
        price: 10.99,
        showtimes: ["11:00 AM", "2:00 PM", "6:00 PM", "9:00 PM"],
        description: "A young lion prince flees after his father's death"
    },
    {
        id: 3,
        title: "Joker",
        genre: "drama",
        rating: "8.5",
        duration: "122 min",
        price: 11.99,
        showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"],
        description: "The origin story of the iconic Batman villain"
    },
    {
        id: 4,
        title: "Spider-Man: No Way Home",
        genre: "action",
        rating: "8.2",
        duration: "148 min",
        price: 13.99,
        showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
        description: "Spider-Man faces villains from other dimensions"
    },
    {
        id: 5,
        title: "The Batman",
        genre: "action",
        rating: "7.8",
        duration: "176 min",
        price: 12.99,
        showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"],
        description: "A young Batman uncovers corruption in Gotham"
    },
    {
        id: 6,
        title: "Top Gun: Maverick",
        genre: "action",
        rating: "8.7",
        duration: "130 min",
        price: 12.99,
        showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
        description: "Maverick trains a new generation of pilots"
    }
];

const foodItems = [
    {
        id: 1,
        name: "Classic Popcorn",
        price: 6.99,
        category: "snacks",
        description: "Freshly popped buttery popcorn"
    },
    {
        id: 2,
        name: "Nachos with Cheese",
        price: 8.99,
        category: "snacks",
        description: "Crispy tortilla chips with melted cheese"
    },
    {
        id: 3,
        name: "Hot Dog",
        price: 7.99,
        category: "meals",
        description: "All-beef hot dog with your choice of toppings"
    },
    {
        id: 4,
        name: "Coca Cola",
        price: 4.99,
        category: "drinks",
        description: "Ice-cold Coca Cola (Large)"
    },
    {
        id: 5,
        name: "Chocolate Brownie",
        price: 5.99,
        category: "desserts",
        description: "Rich chocolate brownie with vanilla ice cream"
    },
    {
        id: 6,
        name: "Pizza Slice",
        price: 9.99,
        category: "meals",
        description: "Fresh pizza slice with pepperoni"
    },
    {
        id: 7,
        name: "Iced Tea",
        price: 3.99,
        category: "drinks",
        description: "Refreshing iced tea with lemon"
    },
    {
        id: 8,
        name: "Candy Mix",
        price: 4.99,
        category: "snacks",
        description: "Assorted movie theater candy"
    }
];

// Document Ready
$(document).ready(function() {
    initializeApp();
    loadMovies();
    loadFoodItems();
    loadBookingHistory();
    setupEventListeners();
    setMinDate();
});

// Initialize Application
function initializeApp() {
    showNotification('Welcome to CineMax!', 'success');
    updateCartCount();
}

// Navigation Functions
function navigateToPage(pageId) {
    // Hide all pages
    $('.page').removeClass('active');
    
    // Show selected page
    $(`#${pageId}`).addClass('active').addClass('fade-in');
    
    // Update navigation
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-page="${pageId}"]`).addClass('active');
    
    currentPage = pageId;
    
    // Update URL hash
    window.location.hash = pageId;
    
    // Page-specific actions
    if (pageId === 'booking') {
        populateMovieSelect();
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation clicks
    $('.nav-link[data-page]').click(function(e) {
        e.preventDefault();
        const pageId = $(this).data('page');
        navigateToPage(pageId);
    });

    // Handle browser back/forward
    $(window).on('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && hash !== currentPage) {
            navigateToPage(hash);
        }
    });

    // Booking form
    $('#bookingForm').submit(handleBookingSubmit);
    $('#movieSelect, #dateSelect, #timeSelect, #ticketCount').change(updateBookingSummary);
    $('#ticketCount').change(generateSeatSelection);

    // Movie filtering
    $('#genreFilter').change(filterMovies);
    $('#movieSearch').on('input', filterMovies);

    // Profile form
    $('#profileForm').submit(handleProfileUpdate);

    // Food ordering
    $(document).on('click', '.quantity-btn', handleQuantityChange);
    $('#addToBooking').click(addFoodToBooking);

    // Checkout
    $('#checkoutBtn').click(handleCheckout);

    // Seat selection
    $(document).on('click', '.seat.available', handleSeatSelection);
}

// Movie Functions
function loadMovies() {
    loadFeaturedMovies();
    loadAllMovies();
}

function loadFeaturedMovies() {
    const featuredMovies = movies.slice(0, 3);
    let html = '';
    
    featuredMovies.forEach(movie => {
        html += createMovieCard(movie);
    });
    
    $('#featuredMovies').html(html);
}

function loadAllMovies() {
    let html = '';
    movies.forEach(movie => {
        html += createMovieCard(movie);
    });
    $('#allMovies').html(html);
}

function createMovieCard(movie) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card movie-card h-100">
                <div class="movie-poster position-relative">
                    <div class="movie-rating">${movie.rating}</div>
                    <i class="fas fa-film fa-4x text-muted"></i>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${movie.duration}</small>
                        <strong class="text-primary">$${movie.price}</strong>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary w-100" onclick="bookMovie(${movie.id})">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

function filterMovies() {
    const genre = $('#genreFilter').val().toLowerCase();
    const search = $('#movieSearch').val().toLowerCase();
    
    let filteredMovies = movies.filter(movie => {
        const matchesGenre = !genre || movie.genre.toLowerCase() === genre;
        const matchesSearch = !search || movie.title.toLowerCase().includes(search) || 
                             movie.description.toLowerCase().includes(search);
        return matchesGenre && matchesSearch;
    });
    
    let html = '';
    filteredMovies.forEach(movie => {
        html += createMovieCard(movie);
    });
    
    $('#allMovies').html(html);
    
    if (filteredMovies.length === 0) {
        $('#allMovies').html(`
            <div class="col-12 text-center">
                <p class="text-muted">No movies found matching your criteria.</p>
            </div>
        `);
    }
}

function bookMovie(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        $('#movieSelect').val(movieId);
        navigateToPage('booking');
        updateBookingSummary();
        showNotification(`Selected "${movie.title}" for booking`, 'info');
    }
}

// Booking Functions
function populateMovieSelect() {
    let options = '<option value="">Choose a movie...</option>';
    movies.forEach(movie => {
        options += `<option value="${movie.id}">${movie.title} - $${movie.price}</option>`;
    });
    $('#movieSelect').html(options);
}

function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    $('#dateSelect').attr('min', today);
}

function updateBookingSummary() {
    const movieId = $('#movieSelect').val();
    const date = $('#dateSelect').val();
    const time = $('#timeSelect').val();
    const ticketCount = $('#ticketCount').val();
    
    if (!movieId) {
        $('#bookingSummary').html('<p class="text-muted">Select movie and show details to see summary</p>');
        return;
    }
    
    const movie = movies.find(m => m.id == movieId);
    
    // Update showtimes
    if (movieId && !time) {
        let timeOptions = '<option value="">Choose show time...</option>';
        movie.showtimes.forEach(showtime => {
            timeOptions += `<option value="${showtime}">${showtime}</option>`;
        });
        $('#timeSelect').html(timeOptions);
    }
    
    let html = `
        <div class="booking-details">
            <h6>Movie Details</h6>
            <p><strong>${movie.title}</strong></p>
            <p>Duration: ${movie.duration}</p>
            <p>Rating: ${movie.rating}/10</p>
    `;
    
    if (date) {
        html += `<p>Date: ${formatDate(date)}</p>`;
    }
    
    if (time) {
        html += `<p>Time: ${time}</p>`;
    }
    
    if (ticketCount) {
        const subtotal = movie.price * parseInt(ticketCount);
        const fees = subtotal * 0.1; // 10% service fee
        const total = subtotal + fees;
        
        html += `
            <hr>
            <p>Tickets: ${ticketCount} × $${movie.price} = $${subtotal.toFixed(2)}</p>
            <p>Service Fee: $${fees.toFixed(2)}</p>
            <hr>
            <p><strong>Total: $${total.toFixed(2)}</strong></p>
        `;
        
        bookingData = {
            movieId: movieId,
            movie: movie,
            date: date,
            time: time,
            ticketCount: parseInt(ticketCount),
            subtotal: subtotal,
            fees: fees,
            total: total,
            seats: selectedSeats
        };
    }
    
    html += '</div>';
    $('#bookingSummary').html(html);
}

function generateSeatSelection() {
    const ticketCount = $('#ticketCount').val();
    
    if (!ticketCount) {
        $('#seatSelection').hide();
        return;
    }
    
    $('#seatSelection').show().addClass('fade-in');
    
    let seatGrid = '';
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    
    // Generate random occupied seats for demonstration
    const occupiedSeats = generateRandomOccupiedSeats(rows.length * seatsPerRow);
    
    rows.forEach(row => {
        seatGrid += `
            <div class="seat-row">
                <div class="row-label">${row}</div>
        `;
        
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            const isOccupied = occupiedSeats.includes(seatId);
            const seatClass = isOccupied ? 'occupied' : 'available';
            
            seatGrid += `
                <button class="seat ${seatClass}" data-seat="${seatId}">
                    <i class="fas fa-square"></i>
                </button>
            `;
            
            // Add aisle gap after seat 6
            if (i === 6) {
                seatGrid += '<div style="width: 20px;"></div>';
            }
        }
        
        seatGrid += `
                <div class="row-label">${row}</div>
            </div>
        `;
    });
    
    $('#seatGrid').html(seatGrid);
    selectedSeats = [];
}

function generateRandomOccupiedSeats(totalSeats) {
    const occupiedCount = Math.floor(totalSeats * 0.3); // 30% occupied
    const occupied = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    while (occupied.length < occupiedCount) {
        const row = rows[Math.floor(Math.random() * rows.length)];
        const seat = Math.floor(Math.random() * 12) + 1;
        const seatId = `${row}${seat}`;
        
        if (!occupied.includes(seatId)) {
            occupied.push(seatId);
        }
    }
    
    return occupied;
}

function handleSeatSelection() {
    const seatId = $(this).data('seat');
    const ticketCount = parseInt($('#ticketCount').val());
    
    if ($(this).hasClass('selected')) {
        // Deselect seat
        $(this).removeClass('selected').addClass('available');
        selectedSeats = selectedSeats.filter(seat => seat !== seatId);
    } else {
        // Select seat
        if (selectedSeats.length < ticketCount) {
            $(this).removeClass('available').addClass('selected');
            selectedSeats.push(seatId);
        } else {
            showNotification('You have already selected the maximum number of seats', 'warning');
            return;
        }
    }
    
    updateBookingSummary();
    
    // Show selected seats in summary
    if (selectedSeats.length > 0) {
        const seatsText = selectedSeats.join(', ');
        const summaryDiv = $('#bookingSummary');
        let currentHtml = summaryDiv.html();
        
        // Remove previous seats info
        currentHtml = currentHtml.replace(/<p>Selected Seats:.*<\/p>/, '');
        
        // Add new seats info before the total
        currentHtml = currentHtml.replace(
            '<hr>\n            <p><strong>Total:',
            `<p>Selected Seats: ${seatsText}</p>\n            <hr>\n            <p><strong>Total:`
        );
        
        summaryDiv.html(currentHtml);
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const requiredFields = ['movieSelect', 'dateSelect', 'timeSelect', 'ticketCount'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        if (!$(`#${fieldId}`).val()) {
            isValid = false;
            $(`#${fieldId}`).addClass('is-invalid');
        } else {
            $(`#${fieldId}`).removeClass('is-invalid');
        }
    });
    
    if (selectedSeats.length !== parseInt($('#ticketCount').val())) {
        showNotification('Please select all your seats', 'error');
        return;
    }
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate payment processing
    showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        processBooking();
    }, 2000);
}

function processBooking() {
    const bookingId = 'BK' + Date.now();
    const booking = {
        id: bookingId,
        ...bookingData,
        date: bookingData.date,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        food: [...foodCart]
    };
    
    // Add to booking history
    bookingHistory.unshift(booking);
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
    
    // Clear form and cart
    $('#bookingForm')[0].reset();
    $('#seatSelection').hide();
    selectedSeats = [];
    foodCart = [];
    updateCartCount();
    
    showNotification(`Booking confirmed! Your booking ID is ${bookingId}`, 'success');
    
    // Redirect to profile page
    setTimeout(() => {
        navigateToPage('profile');
        loadBookingHistory();
    }, 2000);
}

// Food Functions
function loadFoodItems() {
    let html = '';
    
    foodItems.forEach(item => {
        html += `
            <div class="col-lg-6 mb-4">
                <div class="card food-item h-100">
                    <div class="row g-0">
                        <div class="col-4">
                            <div class="food-image">
                                <i class="fas fa-utensils fa-2x text-muted"></i>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h6 class="card-title">${item.name}</h6>
                                <p class="card-text small text-muted">${item.description}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <strong class="text-primary">$${item.price}</strong>
                                    <div class="quantity-controls">
                                        <button class="quantity-btn" data-action="decrease" data-id="${item.id}">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                        <span class="quantity-display" id="qty-${item.id}">0</span>
                                        <button class="quantity-btn" data-action="increase" data-id="${item.id}">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#foodItems').html(html);
}

function handleQuantityChange() {
    const action = $(this).data('action');
    const itemId = $(this).data('id');
    const item = foodItems.find(f => f.id === itemId);
    
    let currentQty = parseInt($(`#qty-${itemId}`).text());
    
    if (action === 'increase') {
        currentQty++;
    } else if (action === 'decrease' && currentQty > 0) {
        currentQty--;
    }
    
    $(`#qty-${itemId}`).text(currentQty);
    
    // Update food cart
    updateFoodCart(item, currentQty);
    updateFoodOrder();
}

function updateFoodCart(item, quantity) {
    const existingIndex = foodCart.findIndex(f => f.id === item.id);
    
    if (quantity === 0) {
        if (existingIndex > -1) {
            foodCart.splice(existingIndex, 1);
        }
    } else {
        if (existingIndex > -1) {
            foodCart[existingIndex].quantity = quantity;
        } else {
            foodCart.push({
                ...item,
                quantity: quantity
            });
        }
    }
}

function updateFoodOrder() {
    let html = '';
    let total = 0;
    
    if (foodCart.length === 0) {
        html = '<p class="text-muted">Your cart is empty</p>';
    } else {
        foodCart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            html += `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <small>${item.name}</small><br>
                        <small class="text-muted">${item.quantity} × $${item.price}</small>
                    </div>
                    <strong>$${itemTotal.toFixed(2)}</strong>
                </div>
            `;
        });
    }
    
    $('#foodOrder').html(html);
    $('#foodTotal').text(total.toFixed(2));
}

function addFoodToBooking() {
    if (foodCart.length === 0) {
        showNotification('Your food cart is empty', 'warning');
        return;
    }
    
    showNotification('Food items added to your booking!', 'success');
    updateCartCount();
    
    // Navigate to booking page
    navigateToPage('booking');
}

// Profile Functions
function loadBookingHistory() {
    let html = '';
    
    if (bookingHistory.length === 0) {
        html = '<p class="text-muted">No bookings found.</p>';
    } else {
        bookingHistory.forEach(booking => {
            html += createBookingItem(booking);
        });
    }
    
    $('#bookingHistory').html(html);
}

function createBookingItem(booking) {
    const statusClass = `status-${booking.status}`;
    const bookingDate = new Date(booking.bookingDate).toLocaleDateString();
    
    let foodItems = '';
    if (booking.food && booking.food.length > 0) {
        foodItems = '<br><small class="text-muted">Food: ' + 
                   booking.food.map(f => `${f.name} (${f.quantity})`).join(', ') + 
                   '</small>';
    }
    
    return `
        <div class="booking-item">
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="mb-0">${booking.movie.title}</h6>
                <span class="booking-status ${statusClass}">${booking.status.toUpperCase()}</span>
            </div>
            <p class="mb-1">
                <strong>Booking ID:</strong> ${booking.id}<br>
                <strong>Date:</strong> ${formatDate(booking.date)} at ${booking.time}<br>
                <strong>Seats:</strong> ${booking.seats.join(', ')}<br>
                <strong>Tickets:</strong> ${booking.ticketCount}<br>
                <strong>Total:</strong> $${booking.total.toFixed(2)}
                ${foodItems}
            </p>
            <small class="text-muted">Booked on ${bookingDate}</small>
        </div>
    `;
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    showNotification('Profile updated successfully!', 'success');
}

// Cart Functions
function updateCartCount() {
    const totalItems = foodCart.reduce((sum, item) => sum + item.quantity, 0) + 
                      (bookingData.ticketCount || 0);
    $('.cart-count').text(totalItems);
    
    if (totalItems > 0) {
        $('.cart-count').show();
    } else {
        $('.cart-count').hide();
    }
}

function handleCheckout() {
    if (foodCart.length === 0 && !bookingData.movieId) {
        showNotification('Your cart is empty', 'warning');
        return;
    }
    
    showNotification('Redirecting to payment...', 'info');
    
    setTimeout(() => {
        showNotification('Payment completed successfully!', 'success');
        $('#cartModal').modal('hide');
    }, 2000);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    const notificationId = 'notification-' + Date.now();
    const typeClasses = {
        success: 'alert-success',
        error: 'alert-danger',
        warning: 'alert-warning',
        info: 'alert-info'
    };
    
    const iconClasses = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const notification = `
        <div id="${notificationId}" class="notification alert ${typeClasses[type]} alert-dismissible fade show" role="alert">
            <i class="${iconClasses[type]} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('#notificationContainer').append(notification);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        $(`#${notificationId}`).addClass('fade-out');
        setTimeout(() => {
            $(`#${notificationId}`).remove();
        }, 300);
    }, 5000);
}

// Animation Functions
function addLoadingSpinner(element) {
    $(element).html('<div class="loading-spinner me-2"></div>Loading...');
}

function removeLoadingSpinner(element, originalText) {
    $(element).html(originalText);
}

// Initialize on page load
$(window).on('load', function() {
    // Check URL hash for direct navigation
    const hash = window.location.hash.substring(1);
    if (hash && hash !== 'home') {
        navigateToPage(hash);
    }
    
    // Add entrance animations
    setTimeout(() => {
        $('.hero-section').addClass('fade-in');
    }, 500);
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}