const SPREADSHEET_ID = '1ugUmLCRYnuB5jk08WnjFauOQN81ZHBjqg4COVGVmp7Q';
const API_KEY = 'AIzaSyAECjJcpTbhSc-1JYwnS2Qat-Z1CvPvGUE';

const COMMON_TAGS = ['heritage site', 'scenic point'];
const CULTURAL_TAGS = ['town', 'plaza', 'market', 'port', 'monument', 'palace', 'castle', 'fort', 'bridge', 'museum', 'venue', 'library', 'garden', 'plantation', 'spa', 'architecture', 'church', 'mosque', 'synagogue', 'temple', 'shrine', 'archaeological site', 'ruins', 'mine'];
const NATURAL_TAGS = ['park', 'trail', 'river', 'lake', 'beach', 'coast', 'waterfall', 'wetland', 'hot spring', 'oasis', 'desert', 'canyon', 'rock formation', 'cave', 'cliff', 'crater', 'mountain', 'valley', 'forest', 'glacier', 'fjord', 'volcano', 'wildlife'];

const categoryTagMap = {
  'Cultural': CULTURAL_TAGS.sort(),
  'Natural': NATURAL_TAGS.sort(),
  'null': COMMON_TAGS.concat(CULTURAL_TAGS, NATURAL_TAGS).sort()
};

var currentContinent = null;
var currentCategory = null;

var markers = {};

var map = L.map('map').setView([20, 20], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  maxZoom: 20
}).addTo(map);

var markerLayer = L.layerGroup().addTo(map);

$(function() {
  $('#showItineraryBtn').click();
  updateContinent(null);
  updateCategory(null);

  $('#countrySelect').select2({
    placeholder: 'Select countries',
    templateResult: formatCountry,
    theme: 'bootstrap-5'
  }).on('change', updateDestinations);

  $('#tagsSelect').select2({
    placeholder: 'Select tags',
    theme: 'bootstrap-5'
  }).on('change', updateDestinations);
});

function updateDestinations() {
  $('#destinationList').empty();
  markerLayer.clearLayers();
  markers = {};

  if (currentContinent == null) {
    for (let continent of ['Americas', 'Europe', 'Asia', 'Oceania', 'Africa']) {
      addDestinationsByContinent(continent);
    }
  } else {
    addDestinationsByContinent(currentContinent);
  }
}


function addDestinationsByContinent(continent) {
  let countryFilter = $('#countrySelect').val();
  let tagsFilter = $('#tagsSelect').val();

  $.getJSON(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${continent}?alt=json&key=${API_KEY}`, function(json) {
    $.each(json.values, function(idx, row) {
      if (row.length) {
        let id = self.crypto.randomUUID();
        let [name, coords, location, countryCode, description, tags, imgUrl] = row;
        if (!imgUrl) return;

        if (countryFilter.length && !countryFilter.includes(countryCode)) return;

        let tagsArr = tags.split(',').sort();
        if (!tagsFilter.length) tagsFilter = categoryTagMap[currentCategory];
        if (!tagsFilter.some(t => tagsArr.includes(t))) return;

        let color = createDestinationCard(id, name, location, countryCode, description, tagsArr, imgUrl);
        addDestinationMarker(id, name, color, coords);
      }
    });
  });
}

var COMMON_COLOR = '#6c757d';
var CULTURAL_COLOR = '#0d6efd';
var NATURAL_COLOR = '#198754';
var MIXED_COLOR = '#137ba9';

function createDestinationCard(id, name, location, countryCode, description, tagsArr, imgUrl) {
  let template = $('#destinationCardTemplate').html();
  $('#destinationList').prepend(template.replace('###', id));

  let parent = $('#' + id);
  parent.find('.destination-name').html(name);
  parent.find('.destination-description').html(description);
  parent.find('.destination-img').attr('src', imgUrl);
  parent.find('.primary-flag').attr('src', `assets/flags/${countryCode}.png`);

  parent.click(function() {
    focusOnDestination(id);
  });

  let countryName, sovereignName;
  $.each(COUNTRIES, function(idx, country) {
    if (country.code == countryCode) countryName = country.name;
    if (country.territories) {
      if (country.territories.includes(countryCode)) {
        parent.find('.secondary-flag').attr('src', `assets/flags/${country.code}.png`);
        sovereignName = country.name;
      }
    }
  });
  if (sovereignName) countryName += ' (' + sovereignName + ')';
  let locationStr = location ? `${location}, ${countryName}` : countryName;
  parent.find('.destination-location').html(locationStr);

  let isCultural, isNatural = false;
  let tagsSection = parent.find('.tags-section');
  for (let tag of tagsArr) {
    let badgeClass = 'secondary';
    if (CULTURAL_TAGS.includes(tag)) {
      isCultural = true;
      badgeClass = 'primary';
    }
    else if (NATURAL_TAGS.includes(tag)) {
      isNatural = true;
      badgeClass = 'success';
    }
    appendTag(tagsSection, tag, badgeClass);
  }

  let categoryColor = COMMON_COLOR;
  if (isCultural && isNatural) {
    categoryColor = MIXED_COLOR;
  } else if (isCultural) {
    categoryColor = CULTURAL_COLOR;
  } else if (isNatural) {
    categoryColor = NATURAL_COLOR;
  }
  parent.find('.fa-location-dot').css('color', categoryColor);
  return categoryColor;
}

function appendTag(tagsSection, tag, badgeClass) {
  tagsSection.append(`<span class="badge bg-${badgeClass}">${tag}</span> `);
}

function addDestinationMarker(id, name, color, coords) {
  let markerId = 'marker-' + id;
  let coordsArr = coords.split(',').map(function(c) {
    return c.trim();
  });
  markers[id] = L.marker(coordsArr, {
    title: id,
    icon: L.divIcon({
      className: 'marker-icon',
      html: MARKER_SVG.replace('###', markerId),
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    })
  }).bindTooltip(name, {
    direction: 'top',
    offset: L.point(0, -24)
  }).on('click', markerClick).addTo(markerLayer);

  $('#' + markerId).css({
    fill: color
  });
}

function markerClick(e) {
  let id = $(e.sourceTarget || e.target)[0].options.title;
  focusOnDestination(id);
}

function focusOnDestination(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
  let currentZoom = map.getZoom();
  map.flyTo(markers[id].getLatLng(), Math.max(currentZoom, 8));
}

function formatCountry(country) {
  if (!country.id) {
    return country.text;
  }
  return $(`<span><img src="assets/flags/${country.id}.png" class="select-flag" /> ${country.text}</span>`)
}

// Update country filter
function updateContinent(continent) {
  currentContinent = continent;
  $('#destinationsHeader').html(continent == null ? 'All Destinations' : continent);

  let icon = continent == null ? 'globe' : 'earth-' + continent.toLowerCase();
  $('#continentSelect').html(`<i class="fa-solid fa-${icon} fa-fw">`);

  let countrySelect = $('#countrySelect');
  countrySelect.val(null);

  countrySelect.empty();
  $.each(COUNTRIES, function(idx, country) {
    if (country.continent == continent || continent == null) {
      countrySelect.append(`<option value="${country.code}">${country.name}</option>`);
    }
  });
  updateDestinations();
}

// Update tags filter
function updateCategory(category) {
  currentCategory = category;
  let icon, btnClass;
  switch (category) {
    case 'Cultural':
      icon = 'landmark';
      btnClass = 'primary';
      break;
    case 'Natural':
      icon = 'leaf';
      btnClass = 'success';
      break;
    default:
      icon = 'layer-group';
      btnClass = 'secondary';
  }
  $('#categorySelect').html(`<i class="fa-solid fa-${icon} fa-fw">`);
  $('#categorySelect').removeClass('btn-primary btn-secondary btn-success').addClass('btn-' + btnClass);

  let tagsSelect = $('#tagsSelect');
  tagsSelect.val(null);

  tagsSelect.empty();
  $.each(categoryTagMap[category], function(idx, tag) {
    tagsSelect.append(`<option value="${tag}">${tag}</option>`);
  });
  updateDestinations();
}
