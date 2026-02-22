# MultiMian World Explorer 🌍

An advanced, modern web application for exploring detailed information about countries worldwide using the REST Countries API.

## 🌐 Live Demo

**[View Live Application](https://mianhassam96.github.io/MultiMian-World-Explorer/)**

## 📦 Repository

**[GitHub Repository](https://github.com/Mianhassam96/MultiMian-World-Explorer)**

## Features

### Core Features
- 🔍 Smart search with autocomplete
- 🎯 Advanced filtering by region, population, language, and currency
- 📊 Sort countries by name, population, and area
- 🗂️ Beautiful country cards with flags and quick stats
- 📱 Fully responsive design

### Country Details
- 📋 Comprehensive overview with all country information
- 🗺️ Geography tab with location and physical data
- 🎭 Culture tab showing languages, currencies, and symbols
- 🔗 Interactive borders section with neighboring countries
- 📊 Statistics with charts and visualizations

### Advanced Features
- 🗺️ Interactive world map with clickable markers
- 🔄 Country comparison tool (compare up to 3 countries)
- ❤️ Favorites system to save countries
- 🕐 Recently viewed countries section
- 🌓 Dark and light mode toggle
- 💾 Persistent storage using Zustand

### Design
- ✨ Modern glassmorphism UI
- 🎨 Smooth animations with Framer Motion
- ⚡ Skeleton loading states
- 🎯 Excellent user experience

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **State Management:** Zustand with persistence
- **Animations:** Framer Motion
- **Charts:** Chart.js with react-chartjs-2
- **Maps:** Leaflet with react-leaflet
- **API:** REST Countries API


## Features in Detail

### Search & Filter
- Real-time search with autocomplete suggestions
- Filter by region, population range, language, and currency
- Sort by name, population, or area
- Reset filters with one click

### Country Details
Five comprehensive tabs:
1. **Overview** - Basic information, demographics, and codes
2. **Geography** - Location, area, coordinates, and time zones
3. **Culture** - Languages, currencies, symbols, and traditions
4. **Borders** - Neighboring countries with clickable navigation
5. **Statistics** - Visual charts and data analysis

### Performance Optimizations
- API response caching (30-minute duration)
- Lazy loading for images
- Dynamic imports for heavy components (map)
- Optimized Next.js Image component
- Skeleton loading states

### State Management
- Favorites persisted to localStorage
- Recently viewed history (last 10 countries)
- Theme preference saved
- Zustand for efficient state updates

## API

This app uses the [REST Countries API](https://restcountries.com/) which provides:
- Comprehensive country data
- No authentication required
- Free to use
- Reliable and fast

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or production.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- REST Countries API for providing the data
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All open-source libraries used in this project
