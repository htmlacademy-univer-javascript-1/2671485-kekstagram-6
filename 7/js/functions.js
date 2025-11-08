const canHaveMeeting = (startWork, endWork, startMeeting, duration) => {
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const startWorkMinutes = timeToMinutes(startWork);
  const endWorkMinutes = timeToMinutes(endWork);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;
  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};

canHaveMeeting('08:00', '17:30', '14:00', 90);
canHaveMeeting('8:0', '10:0', '8:0', 120);
canHaveMeeting('08:00', '14:30', '14:00', 90);
canHaveMeeting('14:00', '17:30', '08:0', 90);
canHaveMeeting('8:00', '17:30', '08:00', 900);
