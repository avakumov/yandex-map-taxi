function getDistance(lat1:number, lon1:number, lat2:number, lon2:number) 
{
  var R = 6371000; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1Rad = toRad(lat1);
  var lat2Rad = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1Rad) * Math.cos(lat2Rad); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

  // Converts numeric degrees to radians
  function toRad(value: number) 
  {
      return value * Math.PI / 180;
  }

  export {
    getDistance
  }