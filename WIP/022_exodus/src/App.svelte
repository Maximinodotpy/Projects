<script lang="ts">
  import moment from "moment";

  const DATE_FORMAT = "DD. MMMM YYYY";

  const TARGET_DATE = moment("2025-07-31");

  let week_until = TARGET_DATE.diff(moment(), "weeks");
  let days_until = TARGET_DATE.diff(moment(), "days");

  let workdays_until = 0;

  // Add workdays
  let current_date = moment();
  while (current_date.isBefore(TARGET_DATE)) {
    if (current_date.day() !== 0 && current_date.day() !== 6) {
      workdays_until++;
    }
    current_date.add(1, "days");
  }

  let betriebsfenster = [
    {
      start: "2025-07-01",
      end: "2025-07-31",
    },
    {
      start: "2025-07-01",
      end: "2025-07-31",
    },
  ];

  let betriebsfenster_days = 0;

  // Add all workdays except mondays and tuesdays except if they are in a betriebsfenster
  current_date = moment();
  while (current_date.isBefore(TARGET_DATE)) {
    if (current_date.day() !== 0 && current_date.day() !== 6) {
      // Check if this day is in a betriebsfenster loop over all betriebsfenster
      let is_in_betriebsfenster = false;
      for (let i = 0; i < betriebsfenster.length; i++) {
        let start = moment(betriebsfenster[i].start);
        let end = moment(betriebsfenster[i].end);
        if (current_date.isBetween(start, end, "days", "[]")) {
          is_in_betriebsfenster = true;
          break;
        }
      }

      let should_count =
        !(current_date.day() != 1 && current_date.day() != 2) ||
        is_in_betriebsfenster;

      if (should_count) {
        betriebsfenster_days++;
      }
    }
    current_date.add(1, "days");
  }
</script>

<div>Weeks: {week_until}</div>
<div>Days: {days_until}</div>
<br />
<div>Days: {workdays_until}</div>
<div>Betriebsdays: {betriebsfenster_days}</div>
