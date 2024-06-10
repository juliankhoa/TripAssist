const DEFAULT_STAY_TIME_MIN = 60;
const FORECAST_DAYS = 14;
const COLORS = [
  '#d7005d', '#8b4852', '#fa7188', '#e08384', '#69000e', '#bf001a', '#d75a00',
  '#d18f5d', '#683300', '#e38819', '#8a8d00', '#484c00', '#6b6e3a', '#7bab48',
  '#7e9d6b', '#2cad00', '#00b189', '#017a65', '#0099ce', '#40a3f7', '#026fc1',
  '#001c5e', '#817fff', '#0033ea', '#8320ff', '#4f009e', '#390072', '#bb6dff',
  '#624673', '#82009d', '#f063f4', '#6f0068', '#3e0033', '#d2009e', '#82004d'
];
const WARNING_ICON = '<i class="fa-solid fa-triangle-exclamation fa-fw text-warning"></i>';
const EMPTY_FIELD = '<i class="fa-regular fa-pen-to-square edit-placeholder"><b>...</b></i>';

var showGuide = true;
// Available colors for pseudorandom generated markers
var colorPool = [...COLORS];
// Index of stop currently being edited
var editingIdx = -1;

var tripName = null;
var tripStartDateTime;
var tripTotalDistance;
var tripTotalDuration;
var itinerary = [];

// Initialize map
var map = L.map('map').setView([20, 20], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  maxZoom: 20
}).addTo(map);
// Initialize save modal
var saveModal = new bootstrap.Modal($('#saveModal'));

$(function() {
  // Fetch existing trip data, if opened from Saved Trips
  tripName = decodeURI(window.location.hash).replace('#', '');
  if (tripName) {
    $('#tripName').html(tripName);
    $('#helpText').hide();
    showGuide = false;

    let tripSave = JSON.parse(localStorage.getItem(tripName));
    // Set start date/time from save
    let startDateTimeStr = formatDateTime(new Date(Date.parse(tripSave.startDateTime)));
    setStartDateTime(startDateTimeStr);
    // Set trip description from save
    $('#tripDescriptionInput').val(tripSave.description);
    // Load itinerary from save
    loadSavedItinerary(tripSave.itinerary);
  }

  // If trip name input already exists, disable save button and show warning
  let tripNameInput = $('#tripNameInput');
  tripNameInput.on('change input keyup paste', function() {
    let newTripName = tripNameInput.val().trim();
    if (localStorage.hasOwnProperty(newTripName)) {
      $('#saveTripBtn').prop('disabled', true);
      $('#saveWarning .trip-name').html(`"${newTripName}"`);
      $('#saveWarning').show();
    } else {
      $('#saveTripBtn').prop('disabled', false);
      $('#saveWarning').hide();
    }
  });

  // Initialize date/time picker
  $('#tripStartInput').datetimepicker({
    initialDate: new Date(),
    format: use12hrClock ? DATETIME_FORMAT_12HR_CLOCK : DATETIME_FORMAT_24HR_CLOCK,
    showMeridian: use12hrClock,
    autoClose: true
  });
  // Initialize sortable itinerary
  $('#itinerary').sortable({
    stop: function(event, ui) {
      let droppedItem = ui.item;
      let oldIdx = itinerary.findIndex((stop) => stop.id == droppedItem.attr('id'));
      let newIdx = droppedItem.index();
      if (oldIdx == editingIdx) {
        editingIdx = newIdx;
      }
      itinerary.splice(newIdx, 0, itinerary.splice(oldIdx, 1)[0]);
      updateStopData(Math.min(oldIdx, newIdx), null, null);
    }
  });

  if (showGuide) {
    $('#tripStartBlinker').show();
  }
  $('#showItineraryBtn').click();
});

// Load saved stops into itinerary and hydrate data
function loadSavedItinerary(saveItinerary) {
  $.each(saveItinerary, function(idx, stop) {
    // Add stop data/card
    itinerary.push(stop);
    createStopCard(stop.id, stop.color);
    let parent = $('#' + stop.id);
    // Load location input value
    parent.find('.location-input').val(stop.location.name);
    // Load stay duration input values
    let [hrs, min] = getHoursMinutes(stop.stayDuration);
    parent.find('.bdp-hours-input').val(hrs);
    parent.find('.bdp-minutes-input').val(min);
  });
  // Hydrate itinerary data
  updateStopData(0, null, null);
}

// Switch formatting/units and rehydrate data
function switchTimeFormat(format) {
  use12hrClock = format == '12hr';
  updateStopData(0, null, null);
}

function switchDistanceUnits(units) {
  useMiles = units == 'mi';
  updateStopData(0, null, null);
}

function switchTempUnits(units) {
  useFahrenheit = units == 'F';
  updateStopData(0, null, null);
}

// Get random color
function randomColor() {
  if (!colorPool.length) {
    colorPool = [...COLORS];
  }
  let idx = Math.floor(Math.random() * colorPool.length);
  return color = colorPool.splice(idx, 1)[0];
}

// Set trip start date/time
function setStartDateTime(dateTime) {
  $('#tripStartBlinker').hide();
  $('#addNewStopBtn').prop('disabled', false);
  if (showGuide && !itinerary.length) {
    $('#addNewStopBlinker').show();
  }

  tripStartDateTime = new Date(Date.parse(dateTime));
  $('#tripStartInput').val(dateTime.replace(' at ', ', '));

  if (itinerary.length) {
    updateStopData(0, null, null);
  }
}

// Enable/disable buttons based on edit state
function updateButtons() {
  let isEditing = editingIdx >= 0;
  let isEditingNew = isEditing;
  if (isEditing) {
    isEditingNew = !itinerary[editingIdx].location.name;
  } else {
    // Enable all edit buttons if not currently editing
    $('.edit-btn').prop('disabled', false);
  }
  // Disable add stop and save buttons if currently editing blank stop
  $('#addNewStopBtn').prop('disabled', isEditingNew);
  $('#saveMenuBtn').prop('disabled', isEditingNew);
}

// Create stop card element in itinerary
function createStopCard(id, color) {
  let template = $('#stopCardTemplate').html();
  $('#itinerary').append(
    template.replace('###', id).replace('#888', color)
  );
  $('.duration-picker').durationPicker({
    showDays: false
  });
}

// Add a new stop to the itinerary
function addNewStop() {
  showGuide = false;
  $('#helpText').hide();
  $('#addNewStopBlinker').hide();
  $('#saveMenuBtn').prop('disabled', true);

  let id = self.crypto.randomUUID();
  let color = randomColor();
  // Add default stop data to itinerary
  itinerary.push({
    id: id,
    color: color,
    location: {
      name: null,
      address: null,
      coords: []
    },
    travelDuration: null,
    travelDistance: null,
    arriveTime: !itinerary.length ? tripStartDateTime : null,
    leaveTime: null,
    stayDuration: DEFAULT_STAY_TIME_MIN,
    cumTravelDistance: null,
  });
  // Add stop card to itinerary view and enter its edit mode
  createStopCard(id, color);
  enterEditMode($('#' + id).find('.edit-btn'));
}

// Enable stop editing inputs
function enterEditMode(btn) {
  let parent = btn.closest('.stop-card');
  editingIdx = parent.index();
  // Show edit inputs & hide display inputs
  parent.find('.edit-field').show();
  parent.find('.display-field').hide();
  // Display departure time as TBD
  parent.find('.leave-time').html(EMPTY_FIELD);

  // Change edit button to save button
  btn.attr('onclick', 'exitEditMode($(this), true)');
  btn.removeClass('btn-primary').addClass('btn-success');
  btn.find('.fa-solid').removeClass('fa-pen').addClass('fa-check');
  btn.prop('title', 'Save');

  // Disble save button if location input is invalid
  let locationInput = parent.find('.location-input');
  btn.attr('disabled', !locationInput.val());
  locationInput.focus();
  locationInput.on('change input keyup paste', function() {
    btn.attr('disabled', !locationInput.val().trim().length);
  });

  // Exit any other stops from edit mode
  $(`.stop-card:not(#${parent.attr('id')})`).each(function() {
    let otherEditBtn = $(this).find('.edit-btn');
    exitEditMode(otherEditBtn, false);
    if (!itinerary[editingIdx].location.name) {
      otherEditBtn.prop('disabled', true);
    }
  });
  updateButtons();
}

// Save/cancel stop edits
function exitEditMode(btn, saveChanges) {
  let parent = btn.closest('.stop-card');
  let idx = parent.index();
  if (idx == editingIdx) {
    editingIdx = -1;
  }
  // Show display inputs & hide edit inputs
  parent.find('.edit-field').hide();
  parent.find('.display-field').show();
  // Revert departure time display
  let leaveTime = itinerary[idx].leaveTime;
  if (leaveTime) {
    parent.find('.leave-time').html(formatTime(leaveTime));
  }

  // Change save button to edit button
  btn.attr('onclick', 'enterEditMode($(this))').attr('disabled', false);
  btn.removeClass('btn-success').addClass('btn-primary');
  btn.find('.fa-solid').removeClass('fa-check').addClass('fa-pen');
  btn.prop('title', 'Edit');

  if (saveChanges) {
    // Get location & stay duration inputs
    let locationQuery = parent.find('.location-input').val();
    let stayDuration = parent.find('.duration-picker').val() / SEC_PER_MIN;

    // Prevent saving an invalid stay duration
    if (!stayDuration) {
      parent.find('.address').html(WARNING_ICON + ' Stay time cannot be 0!');
      enterEditMode(btn);
      return;
    }
    // Try to geocode location query
    $.getJSON(`https://nominatim.openstreetmap.org/search?q=${locationQuery}&limit=1&format=json`, function(json) {
      try {
        let res = json[0];
        let location = {
          name: res.name,
          address: res.display_name.replace(res.name + ', ', ''),
          coords: [res.lat, res.lon]
        };
        // Hydrate stop data based on location/stay duration
        updateStopData(idx, location, stayDuration);
      }
      // Prevent saving an invalid location
      catch (error) {
        parent.find('.address').html(WARNING_ICON + ' Invalid name/address!');
        enterEditMode(btn);
        console.warn(error);
      }
    });
  }
  updateButtons();
}

// Update data for an indexed stop and all following indexed stops
function updateStopData(idx, location, stayDuration) {
  if (!itinerary.length) {
    return;
  }

  let curStop = itinerary[idx];
  // Update location & stay duration inputs if present
  if (location) {
    curStop.location = location;
  }
  if (stayDuration) {
    curStop.stayDuration = stayDuration;
  }

  // Clear previous map route if present
  if (curStop.route) {
    map.removeControl(curStop.route);
    curStop.route = null;
  }

  // Recalculate travel/arrival time based on route from previous stop to this stop
  if (idx > 0) {
    let prevStop = itinerary[idx - 1];
    let waypoints = [
      L.latLng(...prevStop.location.coords),
      L.latLng(...curStop.location.coords)
    ];

    curStop.route = L.Routing.control({
      waypoints: waypoints,
      addWaypoints: false,
      fitSelectedRoutes: false,
      createMarker: function() {
        return null
      },
      lineOptions: {
        styles: [{
          color: '#0d6efd',
          weight: 6
        }]
      },
    }).on('routeselected', function(res) {
      // Save scheduling info and propagate changes to subsequent stops
      let routeSummary = res.route.summary;
      let travelDuration = Math.ceil(Math.round(routeSummary.totalTime) / SEC_PER_MIN);
      let travelDistance = Math.ceil(routeSummary.totalDistance);

      curStop.travelDuration = travelDuration;
      curStop.travelDistance = travelDistance;
      curStop.cumTravelDistance = prevStop.cumTravelDistance + travelDistance;
      curStop.arriveTime = addMinutes(prevStop.leaveTime, travelDuration);
      propagateUpdate(idx);
    }).on('routingerror', function(error) {
      // Prevent saving an invalid route
      let parent = $('#itinerary').children().eq(idx);
      parent.find('.address').html(WARNING_ICON + ' Failed to find route!');
      enterEditMode(parent.find('.edit-btn'));
      console.warn(error);
    }).addTo(map);
  }
  // If this is the first stop, reset travel info and set arrival time to trip start time
  else {
    curStop.travelDuration = 0;
    curStop.travelDistance = 0;
    curStop.cumTravelDistance = 0;
    curStop.arriveTime = tripStartDateTime;
    propagateUpdate(idx);
  }
}

// Propagate data update recursively until last stop
function propagateUpdate(idx) {
  let curStop = itinerary[idx];
  // Recalculate leaving time based on new arrival time/stay duration
  curStop.leaveTime = addMinutes(curStop.arriveTime, curStop.stayDuration);
  updateStopCard(idx);
  // If this isn't the last stop, update subsequent stops
  if (idx < itinerary.length - 1) {
    updateStopData(idx + 1, null, null);
  }
  // Otherwise, update the trip summary info
  else {
    tripTotalDistance = curStop.cumTravelDistance;
    updateSummary();
  }
}

// Update display for a stop card on the itinerary view
function updateStopCard(idx) {
  let element = $('#itinerary').children().eq(idx);
  let stop = itinerary[idx];

  // Update location name/address display
  element.find('.stop-name').html(stop.location.name);
  element.find('.address').html(stop.location.address);
  element.find('.weather').hide();

  if (stop.location.coords.length && stop.arriveTime) {
    // Get date range for weather forecast
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let forecastEndDate = new Date(currentDate.getTime() + FORECAST_DAYS * HRS_PER_DAY * MIN_PER_HR * SEC_PER_MIN * MS_PER_SEC);

    let weatherHour = new Date(stop.arriveTime);
    weatherHour.setMinutes(0, 0, 0);
    // If arrival time falls within forecast range, show weather conditions at that time
    if (weatherHour.getTime() >= currentDate.getTime() && weatherHour.getTime() < forecastEndDate.getTime()) {
      let [lat, lon] = stop.location.coords;
      $.getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=apparent_temperature,precipitation,cloud_cover&forecast_days=${FORECAST_DAYS}`, function(json) {
        try {
          let res = json.hourly;
          let hoursDiff = Math.round((weatherHour - currentDate) / (MIN_PER_HR * SEC_PER_MIN * MS_PER_SEC));

          element.find('.temperature').html(getTemperature(res.apparent_temperature[hoursDiff]));
          let weatherIcon = getWeatherIcon(res.precipitation[hoursDiff], res.cloud_cover[hoursDiff]);
          element.find('.weather-icon').html(`<i class="fa-solid fa-${weatherIcon} fa-fw"></i>`);
          element.find('.weather').show();
        } catch (error) {
          console.warn(`Failed to fetch weather for ${stop.location.name}!`);
        }
      });
    }
  }

  let stayTime = formatDuration(stop.stayDuration);
  // Add/replace map marker
  if (stop.marker != null) {
    map.removeLayer(stop.marker);
  }
  let markerId = 'marker-' + stop.id;
  if (stop.location.coords.length) {
    stop.marker = L.marker(stop.location.coords, {
      icon: L.divIcon({
        className: 'marker-icon',
        html: MARKER_SVG.replace('###', markerId),
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      })
    }).bindTooltip(`${stop.location.name} (${stayTime})`, {
      direction: 'top',
      offset: L.point(0, -24)
    }).addTo(map);

    $('#' + markerId).css({
      fill: stop.color
    });
  }

  // Update travel time/distance display
  let travelDuration = formatDuration(stop.travelDuration);
  if (travelDuration) {
    element.find('.travel-duration').html(travelDuration);
    element.find('.travel-distance').html(getDistance(stop.travelDistance, true));
  } else {
    element.find('.travel-duration').html('<ins class="text-muted">N/A</ins>');
    element.find('.travel-distance').html('');
  }

  // Update arrival/leaving time & stay duration display
  element.find('.arrive-time').html(formatTime(stop.arriveTime));
  element.find('.leave-time').html(formatTime(stop.leaveTime));
  element.find('.stay-duration').html(stayTime);
}

// Get corresponding weather icon for precipitation level/cloud cover
function getWeatherIcon(precipitation, cloudCover) {
  let icon = '';
  // Clear skies
  if (cloudCover < 30) {
    icon = 'sun';
  }
  // Party cloudy
  else if (cloudCover < 60) {
    icon = 'cloud-sun';
    if (precipitation > 0) {
      icon += '-rain';
    }
  }
  // Cloudy/overcast
  else {
    icon = 'cloud';
    if (precipitation > 0) {
      icon += '-showers-heavy';
    }
  }
  return icon;
}

// Update trip summary views
function updateSummary() {
  if (itinerary.length) {
    let finalStop = itinerary[itinerary.length - 1];
    // Calculate total trip duration
    if (finalStop.leaveTime) {
      tripTotalDuration = (finalStop.leaveTime - tripStartDateTime) / (MS_PER_SEC * SEC_PER_MIN)
    }
    // Fit map to markers
    let markersArr = [];
    $.each(itinerary, function(idx, stop) {
      if (stop.marker) {
        markersArr.push(stop.marker);
      }
    });
    if (markersArr.length) {
      map.fitBounds(L.featureGroup(markersArr).getBounds());
    }
  } else {
    tripTotalDistance = 0;
    tripTotalDuration = 0;
  }
  // Update total stops/distance/duration
  $('#total-stops').html(itinerary.length);
  $('#total-duration').html(formatTripDuration(tripTotalDuration));
  $('#total-distance').html(getDistance(tripTotalDistance, false));
  updateButtons();
}

// Delete a stop from the itinerary
function deleteStop(btn) {
  let parent = btn.closest('.stop-card');
  let idx = parent.index();
  if (idx == editingIdx) {
    editingIdx = -1;
  } else if (editingIdx > idx) {
    editingIdx--;
  }
  parent.remove();

  let stop = itinerary[idx];
  // Remove map marker/route
  if (stop.marker) {
    map.removeLayer(stop.marker);
  }
  if (stop.route) {
    map.removeControl(stop.route);
  }

  let wasNotFinalStop = idx < itinerary.length - 1;
  itinerary.splice(idx, 1)[0];
  // Recalculate changes for the stop that took its place
  if (wasNotFinalStop) {
    let replacementStop = itinerary[idx];
    if (replacementStop.route) {
      map.removeControl(replacementStop.route);
      replacementStop.route = null;
    }
    updateStopData(idx, null, null);
  }
  updateSummary();
}

// Open save modal
function openSaveMenu() {
  // Show "save to"/"save as new" prompt depending on currently loaded trip name
  if (localStorage.hasOwnProperty(tripName)) {
    $('.trip-name-form').hide();
    $('#saveModalTitle').html(`Save changes to <i>"${tripName}"</i>`);
  } else {
    $('.trip-name-form').show();
    $('#saveModalTitle').html('Save new trip');
    $('#tripDescriptionInput').val('');
  }
  $('#saveSuccess').hide();
  $('#saveWarning').hide();
  $('#saveModalCancelBtn').html('Cancel');
  saveModal.show();
}

// Save trip data to local storage
function saveTrip() {
  let currentDate = new Date();
  let tripData = {
    description: $('#tripDescriptionInput').val(),
    dateLastChanged: currentDate,
    startDateTime: tripStartDateTime,
    totalDistance: tripTotalDistance,
    totalDuration: tripTotalDuration,
    itinerary: itinerary
  };
  // Get trip name input if saving as new
  let tripNameInput = $('#tripNameInput').val().trim();
  if (tripNameInput) {
    tripName = tripNameInput;
  }
  localStorage.setItem(tripName, JSON.stringify(tripData, replacer));
  $('#saveSuccess').show();
  $('#saveModalCancelBtn').html('Close');
}

const UNSAVED_PROPS = ['marker', 'route', 'travelDuration', 'travelDistance', 'arriveTime', 'leaveTime', 'cumTravelDistance'];
// Remove extraneous properties from itinerary stop data (these will be rehydrated upon loading)
function replacer(key, value) {
  if ($.inArray(key, UNSAVED_PROPS) != -1) {
    return undefined;
  } else {
    return value;
  }
}
