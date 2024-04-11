$(function() {
  loadTripSaves();
});

function loadTripSaves() {
  let tripsList = [];
  // Reformat saved trips as array
  for (var i = 0; i < localStorage.length; i++) {
    let tripName = localStorage.key(i);
    let tripData = JSON.parse(localStorage.getItem(tripName));
    tripsList.push({
      dateLastChanged: tripData.dateLastChanged,
      name: tripName,
      description: tripData.description,
      startDateTime: tripData.startDateTime,
      itinerary: tripData.itinerary,
      totalDistance: tripData.totalDistance,
      totalDuration: tripData.totalDuration
    });
  }
  if (!tripsList.length) {
    $('#emptySavesMessage').show();
  }
  // Sort trip array by last modified date
  tripsList.sort(function(a, b) {
    return b.dateLastChanged - a.dateLastChanged;
  });
  // Create view for each trip
  $.each(tripsList, function(idx, trip) {
    createTripCard(trip);
  });
}

// Create trip card element in saves list
function createTripCard(trip) {
  let template = $('#tripCardTemplate').html();
  $('#tripsList').append(template.replace('###', trip.name));

  let tripCard = $(`div[title='${trip.name}']`);
  tripCard.find('h3').html(trip.name);

  let startDateTime = new Date(Date.parse(trip.startDateTime));
  tripCard.find('.lead').html(formatDateTime(startDateTime));

  tripCard.find('.trip-distance').html(getDistance(trip.totalDistance, false));
  tripCard.find('.trip-duration').html(formatTripDuration(trip.totalDuration));

  tripCard.find('.card-text').html(trip.description);
  let dateLastChanged = formatDateTime(new Date(Date.parse(trip.dateLastChanged)));
  tripCard.find('.last-changed').html('Last modified: ' + dateLastChanged.split(',')[0]);

  let tableEl = tripCard.find('tbody');
  if (trip.itinerary.length > 5) {
    let it = trip.itinerary;
    addTableRow(tableEl, 1, it[0].color, it[0].location.name, it[0].stayDuration);
    addTableRow(tableEl, 2, it[1].color, it[1].location.name, it[1].stayDuration);
    // Intermediate stops summary
    let numMiddleStops = trip.itinerary.length - 4;
    tableEl.append(
      `<tr class="text-muted">
        <th><i class="fa-solid fa-ellipsis-vertical"></i></th>
        <td colspan="2"></i> ${pluralize(numMiddleStops, 'more stop')}</td>
      </tr>`
    );
    let last2 = it[it.length - 2];
    let last1 = it[it.length - 1];
    addTableRow(tableEl, it.length - 1, last2.color, last2.location.name, last2.stayDuration);
    addTableRow(tableEl, it.length, last1.color, last1.location.name, last1.stayDuration);
  } else {
    for (let i = 0; i < 5; i++) {
      let stop = trip.itinerary[i];
      if (stop) {
        addTableRow(tableEl, i + 1, stop.color, stop.location.name, stop.stayDuration);
      } else {
        tableEl.append(`<tr><th class="invisible">${i + 1}</th><td colspan="2"></td></tr>`);
      }
    }
  }
}

function addTableRow(tableEl, idx, color, stopName, stayDuration) {
  tableEl.append(
    `<tr>
      <th>${idx}</th>
      <td><i class="fa-solid fa-location-dot" style="color: ${color}"></i> ${stopName}</td>
      <td>${formatDuration(stayDuration)}</td>
    </tr>`
  );
}

// Open trip save in Trip Planner
function openTrip(btn) {
  let tripName = btn.closest('.trip-card').attr('title');
  window.location.replace('planner.html#' + tripName);
}

var deleteModal = new bootstrap.Modal($('#deleteModal'));
var tripToDelete = null;

// Open delete modal
function openDeleteMenu(btn) {
  let parent = btn.closest('.trip-card');
  tripToDelete = parent.attr('title');
  $('#deleteTripName').html(`"${tripToDelete}"`);
  deleteModal.show();
}

// Delete saved trip from local storage
function deleteTrip() {
  if (tripToDelete) {
    localStorage.removeItem(tripToDelete);
    $(`div[title="${tripToDelete}"]`).remove();
  }
  deleteModal.hide();
}
