/* eslint-disable import/prefer-default-export */

export const isEmpty = (data) => {
  if (Array.isArray(data)) {
    return !!data.length;
  }

  return JSON.stringify(data) === "{}";
};

export function parseTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let hours = "";

  minutes = minutes >= 10 ? minutes : `0${minutes}`;

  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : `0${hours}`;
    minutes -= hours * 60;
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
  }

  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : `0${seconds}`;
  if (hours !== "") {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export function numberWithCommas(x) {
  if (!x && x !== 0) return "";

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, "flat", {
  value(depth = 1) {
    return this.reduce(
      (flat, toFlatten) =>
        flat.concat(
          Array.isArray(toFlatten) && depth > 1
            ? toFlatten.flat(depth - 1)
            : toFlatten
        ),
      []
    );
  },
});
