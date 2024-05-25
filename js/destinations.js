const CULTURAL_TAGS = ['monument', 'palace', 'castle', 'fort', 'archaeological', 'town', 'bridge', 'place of worship', 'church', 'mosque', 'temple', 'shrine', 'synagogue'];
const NATURAL_TAGS = ['park', 'trail', 'forest', 'mountain', 'lake', 'beach', 'desert', 'rock formation', 'cave', 'glacier', 'volcano', 'wildlife'];

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
  let tagsSelect = $('#tagsSelect');
  tagsSelect.empty();

  if (category == 'Cultural' || category == null) {
    $.each(CULTURAL_TAGS, function(idx, tag) {
      tagsSelect.append(`<option value="${tag}">${tag}</option>`);
    });
  }

  if (category == 'Natural' || category == null) {
    $.each(NATURAL_TAGS, function(idx, tag) {
      tagsSelect.append(`<option value="${tag}">${tag}</option>`);
    });
  }
}
