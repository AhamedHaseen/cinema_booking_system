# CineMax - Online Cinema Booking System

A comprehensive full-stack web application for online cinema ticket booking with food ordering capabilities.

## Features

### 🎬 Core Features

- **Movie Browsing**: Browse and search through available movies
- **Seat Selection**: Interactive seat map with real-time availability
- **Online Booking**: Complete booking process with multiple payment options
- **Food Ordering**: Order snacks and beverages with your tickets
- **Booking History**: Track all your past and upcoming bookings
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🎯 Advanced Features

- **Real-time Notifications**: Toast notifications for user actions
- **Progressive Web App (PWA)**: Install on mobile devices like a native app
- **Local Storage**: Persistent booking history and user preferences
- **Admin Dashboard**: Complete administration panel for managing movies, bookings, and customers
- **Payment Integration**: Multiple payment methods including credit cards, PayPal, and digital wallets
- **History Management**: Browser history support with URL routing

## Technology Stack

### Frontend

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling with Bootstrap 5 framework
- **JavaScript (ES6+)**: Modern JavaScript with jQuery
- **Bootstrap 5**: Responsive UI framework
- **Font Awesome**: Icon library
- **AJAX**: Asynchronous data handling

### Features Implementation

- **Responsive Design**: Mobile-first approach with Bootstrap grid system
- **Animation**: CSS animations and JavaScript transitions
- **Local Storage**: Client-side data persistence
- **Service Worker**: Offline functionality and caching
- **Manifest.json**: PWA configuration

## File Structure

```
CineMax/
├── index.html              # Main application (6 pages in one)
├── admin.html              # Administration dashboard
├── payment.html            # Payment processing page
├── confirmation.html       # Booking confirmation page
├── layout.css              # Main stylesheet
├── animation.js            # JavaScript functionality
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
└── README.md              # Project documentation
```

## Pages Overview

### 1. Home Page

- Hero section with call-to-action
- Featured movies carousel
- Benefits and features showcase

### 2. Movies Page

- Complete movie catalog
- Genre filtering
- Search functionality
- Movie details and ratings

### 3. Booking Page

- Movie and showtime selection
- Interactive seat map
- Real-time pricing calculation
- Seat selection validation

### 4. Food & Drinks Page

- Menu browsing with categories
- Quantity selection
- Cart management
- Add to booking functionality

### 5. Profile Page

- Booking history display
- Personal information management
- Booking status tracking

### 6. About Page

- Company information
- Contact details
- Operating hours

### Additional Pages

- **Payment Page**: Secure payment processing
- **Confirmation Page**: Booking confirmation with QR code
- **Admin Dashboard**: Complete administration interface

## Key Functionalities

### Booking System

- Movie selection with real-time availability
- Date and time slot selection
- Interactive seat map (8 rows × 12 seats)
- Dynamic pricing calculation
- Booking confirmation and history

### Food Ordering

- 8 different food items across categories
- Quantity management with +/- controls
- Cart total calculation
- Integration with main booking

### Payment Processing

- Multiple payment methods
- Credit card validation
- Secure form handling
- Order summary with itemization

### Admin Features

- Dashboard with statistics
- Movie management (CRUD operations)
- Booking management
- Customer management
- Reports and analytics

### Notifications System

- Success/error/warning/info notifications
- Auto-dismiss after 5 seconds
- Animated slide-in/slide-out effects
- Multiple notification stacking

## Installation & Setup

1. **Clone or Download** the project files
2. **Open** `index.html` in a web browser
3. **For local development**, use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

## Usage

### For Customers

1. Browse movies on the home page
2. Select a movie and click "Book Now"
3. Choose date, time, and number of tickets
4. Select your preferred seats
5. Add food items (optional)
6. Proceed to payment
7. Complete booking and receive confirmation

### For Administrators

1. Access `admin.html`
2. Use the sidebar navigation
3. Manage movies, bookings, and customers
4. View reports and analytics

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## PWA Features

- **Installable**: Can be installed on mobile devices
- **Offline Support**: Basic offline functionality with service worker
- **App-like Experience**: Full-screen mode on mobile
- **Push Notifications**: Ready for implementation

## Sample Data

The application includes sample data for:

- 6 movies with different genres
- 8 food items across categories
- Mock booking history
- Sample customer data

## Security Features

- Input validation and sanitization
- XSS protection
- CSRF tokens (ready for implementation)
- Secure payment form handling
- Data encryption (client-side)

## Performance Optimizations

- Lazy loading for images
- Minified CSS and JavaScript
- Service worker caching
- Optimized animations
- Efficient DOM manipulation

## Future Enhancements

- Real-time seat availability updates
- Email notifications
- SMS integration
- Social media sharing
- Review and rating system
- Loyalty program
- Multiple cinema locations
- Real payment gateway integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions:

- Email: info@cinemax.com
- Phone: +1 (555) 123-4567
- Website: [CineMax Support](https://cinemax.com/support)

---

**CineMax** - Making movie booking simple and enjoyable! 🎬🍿
