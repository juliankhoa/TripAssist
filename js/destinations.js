const COMMON_TAGS = ['heritage site', 'scenic point'];
const CULTURAL_TAGS = ['monument', 'palace', 'archaeological site', 'architecture', 'bridge', 'castle', 'fort', 'library', 'museum', 'place of worship', 'church', 'mosque', 'synagogue', 'temple', 'shrine', 'ruins', 'town'];
const NATURAL_TAGS = ['beach', 'cave', 'desert', 'forest', 'glacier', 'lake', 'mountain', 'park', 'rock formation', 'trail', 'volcano', 'wildlife'];

var map = L.map('map').setView([20, 20], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  maxZoom: 20
}).addTo(map);

$(function() {
  $('#showItineraryBtn').click();

  updateCountries(null);
  updateTags(null);

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

function formatCountry(country) {
  if (!country.id) {
    return country.text;
  }
  return $(`<span><img src="assets/flags/${country.id}.png" class="img-flag" /> ${country.text}</span>`)
}

// Update country filter
function updateCountries(continent) {
  let icon = continent == null ? 'globe' : 'earth-' + continent.toLowerCase();
  $('#continentSelect').html(`<i class="fa-solid fa-${icon} fa-fw">`);

  let countrySelect = $('#countrySelect');
  countrySelect.empty();
  $.each(COUNTRIES, function(idx, country) {
    if (country.continent == continent || continent == null) {
      countrySelect.append(`<option value="${country.code}">${country.name}</option>`);
    }
  });
}

// Update tags filter
function updateTags(category) {
  let icon;
  switch (category) {
    case 'Cultural':
      icon = 'landmark';
      break;
    case 'Natural':
      icon = 'leaf';
      break;
    default:
      icon = 'layer-group';
  }
  $('#categorySelect').html(`<i class="fa-solid fa-${icon} fa-fw">`);

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
