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

        map.on('moveend', function() {
            var center = map.getCenter();

            dispatch('map-moved', {
                lat: center.lat,
                lng: center.lng
            });
        });

        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
            attribution: 'https://stadiamaps.com/'
        }).addTo(map);

        // Target's GPS coordinates.
        var target = L.latLng('47.50737', '25.04611');

        // Set map's center to target with zoom 14.
        map.setView(target, 14);

        // Place a marker on the same location.
        /* L.marker(target).addTo(map); */
    })
</script>

<div id="osm-map" class="grow"></div>