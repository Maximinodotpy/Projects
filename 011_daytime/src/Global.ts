import { type Moment } from "moment";
import moment from "moment";

export const SECONDS_IN_DAY = 86400;
export const TIME_FORMAT = "HH:mm";

export function getSecondsSinceMidnight(date: Moment) {
    var midnight = moment(date).startOf("day");

    var seconds = date.diff(midnight, "seconds");

    return seconds;
}

export function getDayProgress(date: Moment) {
    var seconds = getSecondsSinceMidnight(date);

    return seconds / SECONDS_IN_DAY;
}