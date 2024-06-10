const SPREADSHEET_ID = '1ugUmLCRYnuB5jk08WnjFauOQN81ZHBjqg4COVGVmp7Q';
const API_KEY = 'AIzaSyAECjJcpTbhSc-1JYwnS2Qat-Z1CvPvGUE';

const COMMON_TAGS = ['heritage site', 'scenic point'];
const CULTURAL_TAGS = ['monument', 'palace', 'port', 'archaeological site', 'architecture', 'market', 'bridge', 'venue', 'garden', 'castle', 'fort', 'library', 'museum', 'place of worship', 'church', 'mosque', 'synagogue', 'temple', 'shrine', 'ruins', 'town'];
const NATURAL_TAGS = ['beach', 'cave', 'desert', 'oasis', 'canyon', 'cliff', 'crater', 'forest', 'glacier', 'lake', 'mountain', 'valley', 'fjord', 'park', 'rock formation', 'trail', 'volcano', 'wildlife', 'hot spring', 'waterfall', 'river', 'wetland'];

var currentContinent = null;
var currentCategory = null;

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
  });

  $('#tagsSelect').select2({
    placeholder: 'Select tags',
    theme: 'bootstrap-5'
  });
});

function addWorldDestinations() {
  addDestinationsByContinent('Asia');
  // for (let continent of ['Americas', 'Europe', 'Asia', 'Oceania', 'Africa']) {
  //   addDestinationsByContinent(continent);
  // }
}


function addDestinationsByContinent(continent) {
  $.getJSON(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${continent}?alt=json&key=${API_KEY}`, function(json) {
    $.each(json.values, function(idx, row) {
      if (row.length) {
        let id = self.crypto.randomUUID();
        let [name, coords, location, country, description, tags, img] = row;
        if (!img) return;
        let color = createDestinationCard(id, name, location, country, description, tags, img);
        addDestinationMarker(id, name, color, coords);
      }
    });
  });
}


function createDestinationCard(id, name, location, countryName, description, tags, img) {
  let template = $('#destinationCardTemplate').html();
  $('#destinationList').prepend(template.replace('###', id));

  let parent = $('#' + id);
  parent.find('.destination-name').html(name);
  parent.find('.destination-description').html(description);
  parent.find('.destination-img').attr('src', img);

  let locationStr = location ? `${location}, ${countryName}` : countryName;
  $.each(COUNTRIES, function(idx, country) {
    if (country.name == countryName) {
      parent.find('.primary-flag').attr('src', `assets/flags/${country.code}.png`);
    }
    if (country.territories) {
      if (country.territories.includes(countryName)) {
        parent.find('.secondary-flag').attr('src', `assets/flags/${country.code}.png`);
        locationStr += ' (' + country.name + ')';
      }
    }
  });
  parent.find('.destination-location').html(locationStr);

  let categoryColor = '#6c757d';
  let tagsSection = parent.find('.tags-section');
  for (let tag of tags.split(',')) {
    let badgeClass = 'secondary';
    if (CULTURAL_TAGS.includes(tag)) {
      badgeClass = 'primary'
      categoryColor = '#0d6efd';

      if (['church', 'mosque', 'synagogue', 'temple', 'shrine'].includes(tag)) {
        appendTag(tagsSection, 'place of worship', badgeClass);
      }

    } else if (NATURAL_TAGS.includes(tag)) {
      badgeClass = 'success';
      categoryColor = '#198754';
    }
    appendTag(tagsSection, tag, badgeClass);
  }
  parent.find('.fa-location-dot').css('color', categoryColor);
  return categoryColor;
}

function appendTag(tagsSection, tag, badgeClass) {
  tagsSection.append(`<span class="badge bg-${badgeClass}">${tag}</span> `);
}

function addDestinationMarker(id, name, color, coords) {
  let markerId = 'marker-' + id;
  L.marker(coords.split(','), {
    icon: L.divIcon({
      className: 'marker-icon',
      html: MARKER_SVG.replace('###', markerId),
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    })
  }).bindTooltip(name, {
    direction: 'top',
    offset: L.point(0, -24)
  }).addTo(markerLayer);

  $('#' + markerId).css({
    fill: color
  });
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
  countrySelect.empty();
  $.each(COUNTRIES, function(idx, country) {
    if (country.continent == continent || continent == null) {
      countrySelect.append(`<option value="${country.code}">${country.name}</option>`);
    }
  });

  markerLayer.clearLayers();
  $('#destinationList').empty();
  if (continent == null) {
    addWorldDestinations();
  }
  else {
    addDestinationsByContinent(continent);
  }
}

// Update tags filter
function updateCategory(category) {
  currentCategory = category;
  let icon;
  let btnClass;
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
  tagsSelect.empty();

  let tags = COMMON_TAGS;
  if (category == 'Cultural' || category == null) {
    tags = tags.concat(CULTURAL_TAGS);
  }

  if (category == 'Natural' || category == null) {
    tags = tags.concat(NATURAL_TAGS);
  }
  tags.sort();

  $.each(tags, function(idx, tag) {
    tagsSelect.append(`<option value="${tag}">${tag}</option>`);
  });
}
