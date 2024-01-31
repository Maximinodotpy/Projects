<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    onMount(() => {
        // Where you want to render the map.
        var element = document.getElementById('osm-map');

        // Create Leaflet map on map element.
        var map = L.map(element);

        /* map.on('moveend', function() {
            var center = map.getCenter();

            dispatch('map-moved', {
                lat: center.lat,
                lng: center.lng
            });
        }); */

        map.on('click', function(e) {
            var lat = e.latlng.lat;
            var lng = e.latlng.lng;

            m.setLatLng(L.latLng(lat, lng));

            dispatch('map-moved', {
                lat: lat,
                lng: lng
            });
        });

        /* L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
            attribution: 'https://stadiamaps.com/'
        }).addTo(map); */
        
        /* L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'https://openstreetmap.org'
        }).addTo(map); */
      
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: 'https://basemaps.cartocdn.com'
        }).addTo(map);

        // Target's GPS coordinates.
        var target = L.latLng('47.69859918725498', '8.637227060158764');

        // Set map's center to target with zoom 14.
        map.setView(target, 14);

        // Place a marker on the same location.
        var m = L.marker(target).addTo(map);

        console.log(m);
    })
</script>

<div id="osm-map" class="grow"></div>