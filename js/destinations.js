const COMMON_TAGS = ['heritage site', 'scenic point'];
const CULTURAL_TAGS = ['monument', 'palace', 'archaeological site', 'architecture', 'bridge', 'castle', 'fort', 'library', 'museum', 'place of worship', 'church', 'mosque', 'synagogue', 'temple', 'shrine', 'ruins', 'town'];
const NATURAL_TAGS = ['beach', 'cave', 'desert', 'forest', 'glacier', 'lake', 'mountain', 'park', 'rock formation', 'trail', 'volcano', 'wildlife'];

const GOOGLE_SHEETS_FILE_ID = '1ugUmLCRYnuB5jk08WnjFauOQN81ZHBjqg4COVGVmp7Q';

var map = L.map('map').setView([20, 20], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  maxZoom: 20
}).addTo(map);

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

  createDestinationCard('s');
});

var url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_FILE_ID}/gviz/tq?tqx=out:csv&sheet=Americas`;
$.ajax({url: url, type: 'GET', dataType: 'text'})
.done(function(csv) {
  console.log(csv);
})
.fail((e) => console.log(e.status));

function createDestinationCard(id) {
  let template = $('#destinationCardTemplate').html();
  $('#destinationList').append(template.replace('###', id));
}

function formatCountry(country) {
  if (!country.id) {
    return country.text;
  }
  return $(`<span><img src="assets/flags/${country.id}.png" class="img-flag" /> ${country.text}</span>`)
}

// Update country filter
function updateContinent(continent) {
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
}

// Update tags filter
function updateCategory(category) {
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
