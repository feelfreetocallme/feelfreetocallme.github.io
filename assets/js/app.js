$('body').flowtype({
  fontRatio: 90,
  minFont: 8,
  maxFont: 15
});

$('.box__smaller').flowtype({
  fontRatio: 140,
  minFont: 8
});

$('.rounded').flowtype({
  fontRatio: 60,
  minFont: 8
});

jQuery(function() {
  $.getJSON("https://spreadsheets.google.com/feeds/list/15bwiN1SvMBnvk-XWASutNxd7gdrI1g6eZVLRH92pFJs/od6/public/values?alt=json", function(data) {
    //var today = data.feed.entry[0].gsx$start.$t.split(' at')[0]
    var today = moment().tz("America/New_York").format('MMMM DD, YYYY');

    console.log("Today: " + today);
    $.each(data.feed.entry, function(index, value) {
      var start = value.gsx$start.$t;
      var dateOnly = value.gsx$start.$t.split(' at')[0];
      var timeOnly = value.gsx$start.$t.split("at ").pop();
      var currentFull = moment().tz("America/New_York").format('YYYY-MM-DD HH:mm');
      var currentTime = moment().tz("America/New_York").format('HH:mm');

      var year = dateOnly.split(', ').pop();
      var month = moment().month(dateOnly.split(' ')[0]).format("MM");
      var day = dateOnly.split(',')[0].split(" ").pop();
      var time = moment(timeOnly, ["hh:mm A"]).format("HH:mm");
      var eventFull = year + "-" + month + "-" + day + " " + time;

      var eventMoment = moment(eventFull, 'YYYY-MM-DD HH:mm');
      var currentMoment = moment(currentFull, 'YYYY-MM-DD HH:mm')

      if (dateOnly == today) {
        dateOnly = "Today";
      }

      console.log(currentMoment);

      console.log(eventMoment);

      if(eventMoment.isAfter(currentMoment)) {
        $('.rounded').append("<p>" + dateOnly + " at " + timeOnly + " EST</p>");
      }

    });
  });
});
