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

// Current filter/sort options
var currentContinent = null;
var currentCategory = null;
var currentSort = null;

var countryDestinationCount = {};
var markers = {};

var map = L.map('map').setView([20, 20], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  maxZoom: 20
}).addTo(map);

var markerLayer = L.layerGroup().addTo(map);

$(function() {
  $('#showItineraryBtn').click();
  populateCountrySelect();
  populateTagsSelect();
  updateSort('random');
  $('#sortSelect').html('<i class="fa-solid fa-arrow-down-wide-short fa-fw">');

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

function formatCountry(country) {
  if (!country.id) {
    return country.text;
  }
  return $(`<span><img src="assets/flags/${country.id}.png" class="select-flag" /> ${country.text}</span>`)
}

function updateDestinations() {
  $('#destinationsNumber').html('<div class="spinner-border" style="width: 1.5rem; height: 1.5rem;"></div>');

  $('#destinationList').empty();
  markerLayer.clearLayers();
  markers = {};

  Object.keys(countryDestinationCount).forEach(c => delete countryDestinationCount[c]);

  if (currentContinent == null) {
    fetchAndFilterDestinations('Americas', []).then(async (destinations) => {
      fetchAndFilterDestinations('Europe', destinations).then(async (destinations) => {
        fetchAndFilterDestinations('Asia', destinations).then(async (destinations) => {
          fetchAndFilterDestinations('Oceania', destinations).then(async (destinations) => {
            fetchAndFilterDestinations('Africa', destinations).then(async (destinations) => {
              sortAndAddDestinations(destinations);
            });
          });
        });
      });
    });
  }
  else {
    fetchAndFilterDestinations(currentContinent, []).then(async (destinations) => {
      sortAndAddDestinations(destinations);
    });
  }
}

function sortAndAddDestinations(destinations) {
  $('#destinationsNumber').html('(' + destinations.length + ')');
  let sortFunction = (a, b) => a.tagMatches - b.tagMatches;
  switch (currentSort) {
    case 'a-z':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || b.title.localeCompare(a.title);
      break;
    case 'z-a':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || a.title.localeCompare(b.title);
      break;
    case 'n-s':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || a.lat - b.lat;
      break;
    case 's-n':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || b.lat - a.lat;
      break;
    case 'w-e':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || b.lon - a.lon;
      break;
    case 'e-w':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || a.lon - b.lon;
      break;
    case '9-1':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || countryDestinationCount[a.countryCode] - countryDestinationCount[b.countryCode];
      break;
    case '1-9':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || countryDestinationCount[b.countryCode] - countryDestinationCount[a.countryCode];
      break;
    case 'random':
      sortFunction = (a, b) => a.tagMatches - b.tagMatches || Math.random() - 0.5;
      break;
  }
  destinations.sort(sortFunction);
  
  for (let dest of destinations) {
    let color = createDestinationCard(dest);
    addDestinationMarker(dest.id, dest.title, color, dest.lat, dest.lon);
  }
  // Fit map to markers
  if (currentContinent || $('#countrySelect').val().length) {
    let markersArr = [];
    $.each(markers, function(idx, marker) {
      markersArr.push(marker);
    });
    if (markersArr.length) {
      map.fitBounds(L.featureGroup(markersArr).getBounds(), {paddingBottomRight: [500, 0]});
    }
  }
}

async function fetchAndFilterDestinations(continent, destinations) {
  let countryFilter = $('#countrySelect').val();
  let tagsFilter = $('#tagsSelect').val();
  let numTagsQueried = tagsFilter.length;

  // If tags filter is empty, search for all tags under current category
  if (!numTagsQueried) tagsFilter = categoryTagMap[currentCategory];

  let json = await $.getJSON(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${continent}?alt=json&key=${API_KEY}`);
  $.each(json.values, function(idx, row) {
    if (row.length) {
      let id = self.crypto.randomUUID();
      let [title, coords, location, countryCode, description, tags, imgUrl] = row;
      if (!imgUrl) return;

      // Get country/parent country info from country code
      let countryName, parentName, parentCode;
      let country = COUNTRIES[countryCode];
      countryName = country.name;
      if (country.parent) {
        parentCode = country.parent;
        parentName = COUNTRIES[parentCode].name;
      }
      // Filter by country/territory
      if (countryFilter.length) {
        let isCountryMatch = countryFilter.includes(countryCode) || countryFilter.includes(parentCode);
        if (!isCountryMatch) return;
      }

      // Count number of tag matches so we can sort by relevance
      let tagsArr = tags.split(',').sort();
      let tagMatches = tagsFilter.filter(function(t) {
        return tagsArr.indexOf(t) >= 0;
      }).length;
      // Filter by tags
      if (tagMatches == 0) return;
      // If tag filter was originally empty, do not consider tag relevance in sort
      if (!numTagsQueried) tagMatches = 0;

      if (countryDestinationCount.hasOwnProperty(countryCode)) {
        countryDestinationCount[countryCode]++;
      }
      else {
        countryDestinationCount[countryCode] = 1;
      }

      let [lat, lon] = coords.split(',').map(function(c) {
        return c.trim();
      });

      destinations.push({
        id: id,
        title: title,
        lat: lat,
        lon: lon,
        location: location,
        countryName: countryName,
        countryCode: countryCode,
        parentName: parentName,
        parentCode: parentCode,
        description: description,
        tags: tagsArr,
        tagMatches: tagMatches,
        imgUrl: imgUrl
      });
    }
  });
  return destinations;
}

var COMMON_COLOR = '#6c757d';
var CULTURAL_COLOR = '#0d6efd';
var NATURAL_COLOR = '#198754';
var MIXED_COLOR = '#137ba9';

function createDestinationCard(destination) {
  let template = $('#destinationCardTemplate').html();
  $('#destinationList').prepend(template.replace('###', destination.id));

  let parent = $('#' + destination.id);
  parent.find('.destination-title').html(destination.title);
  parent.find('.destination-description').html(destination.description);
  parent.find('.destination-img').attr('src', destination.imgUrl);
  parent.find('.primary-flag').attr('src', `assets/flags/${destination.countryCode}.png`);

  parent.mouseover(function() {
    markers[destination.id].openTooltip();
  });
  parent.mouseleave(function() {
    markers[destination.id].closeTooltip();
  });
  parent.click(function() {
    focusOnDestination(destination.id);
  });

  let countryStr = destination.countryName;
  if (destination.parentCode) {
    countryStr += ' (' + destination.parentName + ')';
    parent.find('.secondary-flag').attr('src', `assets/flags/${destination.parentCode}.png`);
  }
  let locationStr = destination.location ? `${destination.location}, ${countryStr}` : countryStr;
  parent.find('.destination-location').html(locationStr);

  let isCultural, isNatural = false;
  let tagsSection = parent.find('.tags-section');
  for (let tag of destination.tags) {
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
  }
  else if (isCultural) {
    categoryColor = CULTURAL_COLOR;
  }
  else if (isNatural) {
    categoryColor = NATURAL_COLOR;
  }
  parent.find('.fa-location-dot').css('color', categoryColor);
  return categoryColor;
}

function appendTag(tagsSection, tag, badgeClass) {
  tagsSection.append(`<span class="badge bg-${badgeClass}">${tag}</span> `);
}

function addDestinationMarker(id, title, color, lat, lon) {
  let markerId = 'marker-' + id;
  markers[id] = L.marker([lat, lon], {
    title: id,
    icon: L.divIcon({
      className: 'marker-icon',
      html: MARKER_SVG.replace('###', markerId),
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    })
  }).bindTooltip(title, {
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

// Update country filter
function updateContinent(continent) {
  currentContinent = continent;
  $('#destinationsHeader').html(continent == null ? 'All Destinations' : continent);

  let icon = continent == null ? 'globe' : 'earth-' + continent.toLowerCase();
  $('#continentSelect').html(`<i class="fa-solid fa-${icon} fa-fw">`);

  populateCountrySelect();
  updateDestinations();
}

// Populate country select with countries from currently selected continent
function populateCountrySelect() {
  let countrySelect = $('#countrySelect');
  countrySelect.val(null);
  countrySelect.empty();

  for (let countryCode in COUNTRIES) {
    let country = COUNTRIES[countryCode];
    if (country.continent == currentContinent || currentContinent == null) {
      countrySelect.append(`<option value="${countryCode}">${country.name}</option>`);
    }
  }
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

  populateTagsSelect();
  updateDestinations();
}

// Populate tags select with tags under currently selected category
function populateTagsSelect() {
  let tagsSelect = $('#tagsSelect');
  tagsSelect.val(null);
  tagsSelect.empty();

  $.each(categoryTagMap[currentCategory], function(idx, tag) {
    tagsSelect.append(`<option value="${tag}">${tag}</option>`);
  });
}

const SORT_ICONS = {
  'a-z': 'arrow-down-a-z',
  'z-a': 'arrow-up-a-z',
  'n-s': 'arrow-down-short-wide',
  's-n': 'arrow-up-wide-short',
  'w-e': 'arrow-up-wide-short fa-rotate-90',
  'e-w': 'arrow-down-short-wide fa-rotate-90',
  '9-1': 'arrow-down-9-1',
  '1-9': 'arrow-up-9-1',
  'random': 'shuffle'
};

// Update sorting order
function updateSort(sort) {
  currentSort = sort;
  $('#sortSelect').html(`<i class="fa-solid fa-${SORT_ICONS[sort]} fa-fw">`);
  updateDestinations();
}
