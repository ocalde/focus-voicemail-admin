'use strict'

export const isEmpty = (value) => {
    return !value || value == null || value.toString().trim() === '';
}

export const formatDuration = (duration) => {
  if(!duration || duration == null || isEmpty(duration)) {
      return '0 mins';
  } else {
      duration = parseInt(duration);
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} mins`;
  }
}