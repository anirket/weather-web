const preloader = document.querySelector(".preloader");
window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let description = document.querySelector('.temprature-description');
    let degree = document.querySelector('.temprature-degree');
    let timezone1 = document.querySelector('.location-timezone');
    let icon = document.querySelector('.icon');
    let temperaturesection = document.querySelector('.degree-section');
    let logo = document.querySelector('.degree-section span');
    let currentlocationh5 = document.querySelector('.current-location h5');
    let currentlocationh6 = document.querySelector('.current-location h6');
    let error = document.querySelector('.error');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=cf3497c6d54e4930a2d173028202206&q=${latitude},${longitude}`;
            fetch(api)
                .then(data1 => {
                    return data1.json();
                })
                .then(data => {
                    console.log(data);
                 preloader.style.display = "none";
                 preloader.style.pointerEvents = "none";

                    const { temp_f, condition } = data.current;
                    degree.textContent = temp_f;
                    description.textContent = condition.text;
                    timezone1.innerHTML = `Timezone:<br>${data.location.tz_id}`;
                    icon.innerHTML = `<img src="${data.current.condition.icon}"<>`;
                    //change to celcius
                    temperaturesection.addEventListener('click', () => {
                        if (logo.textContent === "F") {
                            logo.textContent = "C"
                            degree.textContent = data.current.temp_c;
                        }
                      else{
                        logo.textContent = "F";
                        degree.textContent = temp_f;
                      }
                    })
                    currentlocationh5.textContent = data.location.name;
                    currentlocationh6.textContent = data.location.region;


                });
        });


    }
    else{
error.textContent = "please allow location for smooth usage";

    }



});