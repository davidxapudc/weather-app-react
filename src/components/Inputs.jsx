import { BiCurrentLocation, BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

// Inputs component for search and location input
function Inputs({ setQuery, setUnits, city, setCity }) {
    const navigate = useNavigate();

    // Handle search button click to set query and navigate
    const handleSearchClick = () => {
        if (city !== "") {
            setQuery({ q: city });
            navigate(`/weather/${city}`);
            setCity(""); 
        }
    };

    // Handle location button click to get current location and set query
    const handleLocationOnClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setQuery({ lat: latitude, lon: longitude });
                    navigate(`/`);
                    setCity(""); 
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    alert("Unable to retrieve your location. Please try again or enter a city name.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Handle enter key press for search
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearchClick();
        }
    };

    return (
        <>
            <div className="flex flex-row justify-center my-6">
                <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                    <input 
                        value={city}
                        onChange={(data) => setCity(data.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                        type="text" 
                        placeholder="search by city" 
                        className="text-gray-500 font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase" 
                    />
                    <BiSearch 
                        onClick={handleSearchClick}
                        size={30} 
                        className="cursor-pointer transition ease-out hover:scale-125"
                    />
                    <BiCurrentLocation
                        onClick={handleLocationOnClick}
                        size={30} 
                        className="cursor-pointer transition ease-out hover:scale-125"
                    />
                </div>
                <div className="flex flex-row w-1/4 items-center justify-center">
                    <button 
                        onClick={() => setUnits("metric")}
                        className="text-2xl font-medium transition ease-out hover:scale-125">
                        °C
                    </button>
                    <p className="text-2xl font-medium mx-1">|</p>
                    <button 
                        onClick={() => setUnits("imperial")}
                        className="text-2xl font-medium transition ease-out hover:scale-125">
                        °F
                    </button>
                </div>
            </div>
        </>
    );
}

export default Inputs;