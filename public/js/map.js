const mapContainer = document.getElementById("map");
const mapDataScript = document.getElementById("listing-map-data");
const listingMapData = mapDataScript ? JSON.parse(mapDataScript.textContent) : null;
const mapToken = window.mapToken;

console.log("[map] init", {
    hasMapContainer: !!mapContainer,
    hasMapDataScript: !!mapDataScript,
    hasMapToken: !!mapToken,
    coords: listingMapData?.geometry?.coordinates
});

const showMessage = (msg) => {
    if (mapContainer) {
        mapContainer.innerHTML = `<p class="text-muted p-3 mb-0">${msg}</p>`;
    }
};

if (!mapContainer) {
    // exit early if not on a map page
} else if (!window.mapboxgl) {
    showMessage("Map failed to load (Mapbox script missing).");
} else if (!mapToken) {
    showMessage("Map token missing. Set MAPBOX_TOKEN in your .env file.");
} else {
    const coords = listingMapData?.geometry?.coordinates;

    if (!coords || coords.length !== 2 || coords.some(Number.isNaN)) {
        showMessage("Location coordinates are unavailable for this listing.");
    } else {
        if (!mapboxgl.supported()) {
            showMessage("Maps not supported in this browser/device (WebGL unavailable).");
            console.error("Mapbox GL not supported: WebGL unavailable or blocked");
        } else {
            mapContainer.style.height = "400px";
            mapContainer.style.minHeight = "300px";
            mapContainer.style.display = "block";
            mapContainer.style.background = "#f5f5f5";

            mapboxgl.accessToken = mapToken;
            mapContainer.innerHTML = "";

            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v12",
                center: coords,
                zoom: 10,
            });

            // fix map dimensions if initially hidden
            map.on("load", () => {
                console.log("[map] load success", { h: mapContainer.clientHeight, w: mapContainer.clientWidth }); 
                map.resize();
            });

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h6>${listingMapData.title}</h6><p>${listingMapData.location}, ${listingMapData.country}</p>`    
            );

            new mapboxgl.Marker({ color: "#fe424d" })
                .setLngLat(coords)
                .setPopup(popup)
                .addTo(map);

            map.addControl(new mapboxgl.NavigationControl());

            map.on("error", (evt) => {
                console.error("Mapbox error", evt && evt.error);
                showMessage("Map failed to load. Please check your Mapbox token and network connectivity.");      
            });
        }
    }
}
