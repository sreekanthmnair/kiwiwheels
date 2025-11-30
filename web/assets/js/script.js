// Sample car data, mimicking a database response
const carData = [
    {
        id: 1,
        make: "Toyota",
        model: "Corolla GLX",
        year: 2018,
        price: 18500,
        kms: 65000,
        location: "Auckland",
        // Note: Using a placeholder image for now, replace with 'assets/img/car1.jpg' later
        image: "https://via.placeholder.com/400x200/007bff/FFFFFF?text=Toyota+Corolla" 
    },
    {
        id: 2,
        make: "Ford",
        model: "Ranger XLT",
        year: 2021,
        price: 45000,
        kms: 25000,
        location: "Wellington",
        image: "https://via.placeholder.com/400x200/dc3545/FFFFFF?text=Ford+Ranger"
    },
    {
        id: 3,
        make: "Mazda",
        model: "Demio",
        year: 2015,
        price: 9800,
        kms: 95000,
        location: "Christchurch",
        image: "https://via.placeholder.com/400x200/ffc107/333333?text=Mazda+Demio"
    },
    {
        id: 4,
        make: "Mitsubishi",
        model: "Outlander PHEV",
        year: 2022,
        price: 48000,
        kms: 12000,
        location: "Auckland",
        image: "https://via.placeholder.com/400x200/28a745/FFFFFF?text=Outlander+PHEV"
    }
];

// Function to format price into NZD currency
const formatNZD = (price) => {
    return price.toLocaleString('en-NZ', { style: 'currency', currency: 'NZD', minimumFractionDigits: 0 });
};

// Function to render car listings to the HTML
const renderCars = (cars) => {
    const listingsSection = document.getElementById('listings');
    listingsSection.innerHTML = ''; 

    if (cars.length === 0) {
        listingsSection.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 50px;">Sorry, no cars match your search criteria. Try adjusting the filters!</p>';
        return;
    }

    cars.forEach(car => {
        const cardHtml = `
            <div class="car-card" data-make="${car.make}" data-price="${car.price}" data-location="${car.location.toLowerCase()}">
                <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image">
                <div class="car-info">
                    <h3>${car.year} ${car.make} ${car.model}</h3>
                    <p class="price">${formatNZD(car.price)}</p>
                    <ul class="details-list">
                        <li><strong>Location:</strong> ${car.location}</li>
                        <li><strong>Mileage:</strong> ${car.kms.toLocaleString()} kms</li>
                        <li><strong>Transmission:</strong> Automatic</li>
                        <li><strong>Fuel:</strong> Petrol / Electric</li>
                    </ul>
                </div>
            </div>
        `;
        listingsSection.innerHTML += cardHtml;
    });
};

// Filtering logic triggered by user input
window.filterCars = () => {
    const makeFilter = document.getElementById('make-filter').value;
    const maxPrice = parseInt(document.getElementById('price-filter').value);
    const locationFilter = document.getElementById('location-filter').value.toLowerCase();

    const filteredCars = carData.filter(car => {
        // 1. Filter by Make
        const makeMatch = !makeFilter || car.make === makeFilter;

        // 2. Filter by Price
        const priceMatch = car.price <= maxPrice;

        // 3. Filter by Location 
        const locationMatch = !locationFilter || car.location.toLowerCase().includes(locationFilter);

        return makeMatch && priceMatch && locationMatch;
    });

    renderCars(filteredCars);
};

// Initial render when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderCars(carData);
});