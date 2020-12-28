import './index.css'

$(function() {
  var doctorsList = [];
  var $searchContainer = $('#searchContainer');
  var $availabilityFilterSelect = $('#availabilityFilterSelect');
  $searchContainer.append('<input id="search-doctor" type="text" name="search" placeholder="Search doctors" />');

  function onFilter(value) {
    $('#doctors tr').filter(function() {
      $(this).toggle(
        $(this).text().toLowerCase().indexOf(value) > -1
      )
    })
  }

  $availabilityFilterSelect.on('change', function () {
    var query = '';
    if ($(this).val() === 'available') {
      query = 'Unavailable';
    }

    $('#doctors tr').filter(function() {
      $(this).toggle(
        $(this).text().indexOf(query) > -1
      )
    });
  });

  $('#search-doctor').on('keyup', function() {
    onFilter($(this).val())
  });

  function renderDoctor(doctor) {
    var tr = $('tr[data-upin='+ doctor.upin +']');
    var status = 'Available';
    var classButton = 'available';

    if (doctor.available) {
      status = 'Unavailable';
      classButton = 'unavailable';
    }

    tr.children().eq(0).html(doctor.name);
    tr.children().eq(3).html(
      '<button id="buttonDoctor" class="button button-outline '
      + classButton
      +'" data-upin-button="'
      +doctor.upin
      +'">Mark as '
      +status
      +'</button>'
    );
  }

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3030/doctors',
    success: function (doctors) {
      doctorsList = doctors
      $.each(doctors, function(_, doctor) {
        renderDoctor(doctor);
      });
    },
  });

  $('#doctors').on('click', '#buttonDoctor', function() {
    var upin = $(this).attr('data-upin-button');
    var doctor = null;
    var newStatus = false;

    for(let i = 0; i < doctorsList.length; i++) {
      if (Number(upin) === Number(doctorsList[i].upin)) {
        doctor = doctorsList[i]
      }
    }

    if (doctor && !doctor.available) {
      newStatus = true
    }

    $.ajax({
      type: 'PUT',
      url: `http://localhost:3030/doctors/${upin}`,
      data: {
        upin: doctor.upin,
        name: doctor.name,
        available: newStatus,
      },
      success: function (doctors) {
        $.each(doctors, function(_, doctor) {
          renderDoctor(doctor)
        });
      },
    });
  });
});