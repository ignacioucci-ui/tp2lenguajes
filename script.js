var map = L.map('mapa').setView([-24.7821, -65.4232], 13); 
 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    attribution: '© OpenStreetMap contributors' 
}).addTo(map); 
 
var watchId;  
var marcador; 
var historialCoordenadas = []; 
var lineaRoja = L.polyline([], { color: 'red' }).addTo(map); 
var contadorPasos = 1; 
 
function iniciarSeguimiento() { 
    if ("geolocation" in navigator) { 
        watchId = navigator.geolocation.watchPosition(function(posicion) { 
            var lat = posicion.coords.latitude; 
            var lng = posicion.coords.longitude; 
            var nuevaUbicacion = [lat, lng]; 
 
            map.setView(nuevaUbicacion, 16); 
 
            if (marcador) { 
                marcador.setLatLng(nuevaUbicacion); 
            } else { 
                marcador = L.marker(nuevaUbicacion).addTo(map); 
            } 
 
            historialCoordenadas.push(nuevaUbicacion); 
            lineaRoja.setLatLngs(historialCoordenadas); 
 
            var lista = document.getElementById("listaHistorial"); 
            var item = document.createElement("li"); 
             
            item.innerHTML = "#" + contadorPasos + " -> Lat " + lat.toFixed(5) 
+ ", Lng " + lng.toFixed(5); 
            lista.appendChild(item); 
             
            contadorPasos++; 
             
        }, function(error) { 
            console.error("Error con la ubicación: ", error); 
        }, { 
            enableHighAccuracy: true 
        }); 
    } else { 
        alert("Tu navegador no soporta la Geolocalización."); 
    } 
} 
 
function detenerSeguimiento() { 
    if (watchId) { 
        navigator.geolocation.clearWatch(watchId); 
    } 
} 
 
function limpiarHistorial() { 
    historialCoordenadas = []; 
    lineaRoja.setLatLngs([]); 
    document.getElementById("listaHistorial").innerHTML = ""; 
    contadorPasos = 1; 
     
if (marcador) { 
map.removeLayer(marcador); 
marcador = null; 
} 
}