export const getLocation = async () => {
  return new Promise((resolve, reject) => {
    let location = null;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(location);
        resolve(location);
      });
    }
  });
};
