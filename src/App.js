import React, { useState } from 'react';
import './index.css';
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [sevenDayData, setSevenDayData] = useState(null);

  const handleSearch = async () => {
    if (city === '') {
      alert('Please enter a city name to continue');
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=171d71eba201f63fa475687a2213c2ae`);
      const data = await response.json();
      setWeatherData(data);
      setShowForecast(true);
      setShowMap(true);

      const coord = data.coord;
      const sevenDayResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=171d71eba201f63fa475687a2213c2ae`);
      const sevenDayData = await sevenDayResponse.json();
      setSevenDayData(sevenDayData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching weather data. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1 id="app_heading">Weather <span id="forecast">Forecast</span> </h1>
      <div className="seven_day_forecast" style={{ display: showForecast ? 'grid' : 'none' }}>
        {/* Display weather forecast */}
        {sevenDayData && sevenDayData.daily.slice(0, 7).map((day, index) => (
          <div className="day_box" key={index}>
            <h2>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</h2>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].description} />
            <h3>{day.temp.max}°C</h3>
            <h3>{day.temp.min}°C</h3>
          </div>
        ))}
      </div>
      <div className="main">
        <div className="left">
          <div className="inputBox">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City name here" />
            <button id="submit" onClick={handleSearch}>Search</button>
          </div>
          <div className="map_box" style={{ display: showMap ? 'flex' : 'none' }}>
            {/* Display map */}
            {weatherData && (
              <iframe
                title="Map"
                width="100%"
                height="300px"
                src={`https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            )}
          </div>
        </div>
        <div className="right">
          {/* Display weather data */}
          {weatherData && (
            <table>
              <tbody>
                <tr>
                <td>
                  Current
                  <img
                  className='tdImage'
                    src="https://w7.pngwing.com/pngs/222/641/png-transparent-computer-icons-temperature-miscellaneous-photography-presentation.png"
                    alt=""
                  />
                </td>
                  <td id="current_temp">{weatherData.main.temp}° Celsius</td>
                </tr>
                <tr>
                <td>
                  Min
                  <img
                  className='tdImage'
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhIVFRIXFxcVFxcVFRIQFRUVFxcXFxUSFxcYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGzcgHyY3Nys4LzcrNTU1MDMwMi03LzcrLTc3LS03MisvNy0tNzc1ListLysvLS43LS0tKystLv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIDBAcGCAX/xABGEAACAQICBAkHCAkEAwAAAAAAAQIDEQQxBhIhQQUHEyIyUWFxgTRCYnORsdEWIzV0k7KzwRQzUlNUcoKSoRUkJUOi8PH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAArEQEAAgECBAQGAwEAAAAAAAAAAQIDBBESMUHwITJRkQUTFFOB4WFxoVL/2gAMAwEAAhEDEQA/AO4gAARGVykpFoAWAAAAAACrYFgUt2lkwJAMVarZ5AZQEAAAAERldXKSkXjkBIAAAAAAVbAsCiKVa1rWAzAw8v2MkCKSlfbkWlIrGrfYXjECIWv+RkNSPT8WbFWpYC5EZJ5MrrXV+wwYbPw+AE4ibT2M2UauJz8DYlKyuBY1FN62e82KVS5R0Nt79oFyyQSJAFZNb7GjwlwzRw9KVavNU6UFdyl7Ekltbb2JLazmHCXHbh9f5nCVZwy1pzhRbXWopS/y0wOvg8joXxg4PhB8nTcqddK/JVbKTSzlBptTXc7rekeuArrLK5WUvYa9Rc7x/MzylbawLxiSpLrIhK6ua2HzAviJu+Zni9hSrSvvLN2XcBYjWV7X2laVS5rz6figNspEuQ0BUOyz/wAladVN2MeKzQGxcGiAL0HZm4aBs4XJ94GRRV77zDit3iVj0/FlsVu8QLU5rVzMeGz8PgYi9KdncDalFbyuI6LNerO7uZ6/R9gFcLkyOVetbdexWjVsVg7yv2gbhDInNLMKV1cDgXHrwtOWKp4a/wA1Spqq4rfUqOS1n12ikl1a0us9JwDxZ4KFGKxFPlq0opzk51IpSa2xgotWSyvmeJ46H/yk/U0fdI7dHJdxow1iebNqLTG2zgemfA0uC8bCWGnJJKNejJu8oNSacG/OSa8VKzvtPpTgnGqtQpVlsVSnCol1a8VK3+Tg/Hav9zQvlyMvHnvYdj0Mq2wOF+r0fw4lWSNpW4pmaxMv3tVXvvMWKyRiUryv2mXFZIgsTRmtXMxYfMxmTD9IDJXqNPYXqPm+BixWfgJVubbeBOF3+H5mZxV77zDhd/h+ZSq+cBtg1a1W6sZcP0QMFF7S2Je0xAAAABaFRrIqALUnzkZcVuMAAAAAWlUbVioABMAC05t5mxRfN9pqgD5846vpSfqaPukdvhku44lx0L/k5t5cjS8dktiO2xyXcacPVk1PRx/jvX+5oepl99nXtEfIcJ9Xo/hxOQcdz/3OH9TL77Ov6JeQ4T6vR/DiVZPNK7D5IfrwzXejPiska4K1oTGVtqIAEzk3mQABaE2sirYAA2sO+aaoAAAAAAABDAkEWCYEgAAAAAAAERdyGyUB8+8dX0pP1NH3SO3wyXccQ46vpSfqaPukdvhku404erJqejj3Hf5Th/Uy++zr+iPkOE+r0fw4nIOO/wApw/qZffZ1/RHyHCfV6P4cSrJ5pXYfJD9YA8NpTpG6l6FB3i9kmvP7F6Pv7s8+TJFI3lu0ulvqL8NfzPo2uFdN4wqOFGCqRWxzcmk36NltXbvNP5e1P3EP7pfA3dGtFUo8piacXN5U3FNRXXJZOXZu78v3lwJhf4aj9nD4FEVz28d9np3y/DsU8Hy+Pbrvz/15T5e1P3EP7pfAj5e1P3EP7pfA9Z/oeF/hqP2cPgP9Dwv8NR+zh8Dvy8//AEh9V8P+zPv+3k/l7U/cQ/ul8DZ4P03lOrCEqKSnKMLxk205Oydmtu1no/8AQ8L/AA1H7OHwMmH4KoQkpQoUoyWTjCEWu5pbDsY82/jZG+q0E1mIwzv/AH+24ADS8gIiyrZZASAABCJIaAm9/wD3MgJEgAAAAAAo2WkgkBEUWAA+fOOr6Un6mj7pHb4ZLuOIcdX0pP1NH3SO3wyXcacPVk1PRx7jv8pw/qZffZ1/RLyHCfV6P4cTkHHf5Th/Uy++z0dTSNywWGw1JtRVCjGpLJzapxTgvR6+vuzzanJGPeZeh8O0l9TMUr+Z9H6mluk3KXoUH83lOa8/0Y+j7+7P9PRTRzk2q9ZfOWWrB+ZsXOl6Xu78q6JaMcnavXXzmcIPzOqT9L3d+XrGjLixzaePJ7PU1mrx4qfTabl1n17/AFyT3kIIk1PGAAAAAAo2WkgkASJAAAAAAAAAAAAAAAAAAAAD5+46FfhOa38jS8dkth22OXgcQ46fpSfqaPukb/GJp4698JhJWpdGpUX/AHPfTg90O3zssulfjtFYlnzUm8xEPyuNPh6jisVHkXrQpQdNz82ctZtuPXFZX37d219Q4utG1GhQxFVJzdOEqcc1FOKam+uXV1d+XCMbgJUVDXVpSjrKO+KvZa3b2H01ol5DhPq9H8OJRkrFpiZa8Ga+Kk0pO0T4P1gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPC6VaScpejQfMylNef6MfR7d/dno0+nvnvw19/Rn1GopgpxW9vVzDjcxcKvCU5U3eKp0433NxTu11rbmU0c4C1LVaq5+cYvzfSfpdm409PMHOlitWorSdOnLV3pNO2t29h61HbUrF5ivjEIxe046zbwmXktNNtSHXqPx5z/yfQWiXkOE+r0fw4nz3pr+sh/I/vM+hNEvIcJ9Xo/hxKb81+Pyv1gAQTAAAAAAAAAAAAAAAAAAAIiyrZaIEgAAAAAB4rSbSHlPmKDvF7HJef2L0ff3Z36fT2zW4a+/ooz6iuGvFb29WLSrSTlL0aD5mUprz/Rj6Pbv7s/0NFNG+TtWrL5zOEH5npP0uzd35W0Z0cdO1WulymcI2XM9J7Ol7j06Zr1Gprjp8jDy6z699+DJp9NbJf5+bn0j0778Xz9x0/Sk/U0fdI/XR+Rx0/Sk/U0fdI/XRjxteXo8hpr+sh/I/vM+hNEfIcJ9Xo/hxPnvTX9ZD+R/eZ9CaI+Q4T6vR/DiQvzWY/K/WABBMIiyrZZASAAAAAAEZgSCLBMCQAAKNlmiEgCRYADxukvD+KpV5QhaEElqtwUta6TcrvtutnUflfKzGftr7OHwOj3Fz0MesxVrETiif57h5+TR5bWmYyzH8dy5x8rMZ+2vs4fAfKzGftr7OHwOj3Fyf12H7Md/hD6HN96e/wAuZYvSHFVYOnKfNlsajFRbXVdK9n1HpNFtHtTVrVl85ZasX5na/St7O/L1NyGivLruKnBjrwR127hZi0PDfjyW456b9yl9phxeKp0oSqVZxhTirylJqMYrrbZklJJNt2SV23sSS2ttnzxp5pbV4TxCp0r/AKNGVqNPLXa/75rre1q/RXbe+GIb2pxkcN0cZjp16Dk6WpCCcouGs4J3kk9ttu+zPUowaKcX9SoteNPlJJ9OTUacWt0b9Jrr2+B+3wto/iMOr1ado5a0WpRv1NrLxLqeDPknfk55pr+sh/I/vM7Zxc6TYXE4WjRpVPnqNGnCdOXNmtSMYuSXnRvvV89tjnONwNOqrVIp9Tya7mtqPJY/AVcHVhWozktWV4VI7JQl1Pwv2NXTW4jes80sd422fUDZVs8zxf6VLhDC68rRr02oVorYtbdUiv2ZJN9jTW49Ql7SpcJEgAAAAAAAiJJDQEkIIkAAAAAAA2JQWrluNcAATKLWaAgAJAATKNsyAPD8cfCrocGzhF2lXlGh/TJOVT2whKP9RynQnAJp1HscpcnF9Udms/a//E95x+p/o+Fe7lpe3k3b3M8hot5NDvn9+X5WLMceKrLPg+i8Jho04RpwVoxSSXYvzGKw8akJQmrxkmmnvTPJ6Pab0ZU4wxMtSpFJOTTcZ2866yfXfYTw/pvRjBxw0teq1ZSs1GHpXeb6kiPDO6XHXZzivT1ZSje+rJq/XZ2uYMVho1IShNc2St8H4Pb4GUg0Mz8bin4Slh+FIUm+bW16E1u1knKDt2ShZdk2fQh808DJvhihqZ/ptHLqVaLn/hSPpeKvkZp5tcckANA46AmMW8kQAAAAGXDxuytdWYFAS4vOxAAAAAXoxuya8EnsAzS6HgYKVO5tQyXcTGKWQGnq2du0z4nLxMjir9pjxWXj8QMVOldXFDpIzYbIx0YPWyAYrNGEzYrNEuktW++1wPFcavAjxXBtXUjrVKLjiIpK7epfXS7eTlOy67HGdDceudRbz58O3ZzkvYn7T6awu84DxoaBVMDWeKw0X+hyetzM8NNvotLKnfoyyXRdrLWlWdpRtXeNm6SjznBek8Wkq/Nl+0k3GXa0tq93cfsw4RovaqtN/wBcfiXxMSzTWYbeff7zV4QxkaVOVSW5bF1y3R9pp4zh+hTXTU31Q53+cl7T8CCxPCVeNGjDWm+jBdGMd9Sct1t8n3LbsfLWiEq0mXo+JbgaWJ4SVeSvDDxlVk9zqVFKEI9/OnL+g+hqVKx+DoJovT4PwsaEHrTfPq1LWdSo832RSSSXUlvueiM8tLUxHSYqUbK5atB62RkxOQEYXLxMDjd27TPhsvEyKKvuuBq1adihnxW7x/IRprVvvAjC5+BXEZlsLn4GeUVvsBSv0TVN5o1a8EnsAxgADJh+kZq1K5aNNJ3RLYExWwkpqlosDVqdLxRsVYXQdNXvvLgUpQsrERqpuxkNWiucBOKzRmirxt2Ezpp5k5AY6VPVvc163ObTSs9jTs011P4GzJ3CpLN5gc70l4ncFXbnh5Sws3uglUo39W2tXujJLsPHVuI/Gp8zE4eS65KrTfsUZe87yDu44rwPxJ89fpWLvHfGhDVb/rm3906hwJoxhsHT5PC0o015z2ynN9c5vbJ95+uqavfeXOCIKysSCj293vAiVVJ2JqQurGtWhzsjbiwK0YWRrw6fizbNWC5/iwLYrd4/kZKS5pacE8yUgMdGlYw4jM2zHUivEC05e0x1aV7EpXIrVGrWAj9G7QTykv2SQIpU2nd//TIWIaAqWSCRIAAAAAAbMblcu0RGICMSwAAAAYYU3rX3GYAAURchoCpZIJEgAAAAAFZSKLaZJRuEgCRIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"
                    alt=""
                  />
                </td>
                  <td id="min_temp">{weatherData.main.temp_min}° Celsius</td>
                </tr>
                <tr>
                <td>
                  Max
                  <img
                  className='tdImage'
                    src="https://image.shutterstock.com/image-vector/temperature-limits-cargo-signs-260nw-345554684.jpg"
                    alt=""
                  />
                </td>
                  <td id="max_temp">{weatherData.main.temp_max}° Celsius</td>
                </tr>
                <tr>
                <td>
                  Wind
                  <img
                  className='tdImage'
                    src="https://previews.123rf.com/images/urfandadashov/urfandadashov1808/urfandadashov180803010/106755145-wind-vector-icon-isolated-on-transparent-background-wind-logo-concept.jpg"
                    alt=""
                  />
                </td>
                  <td id="wind">Wind Speed {weatherData.wind.speed}</td>
                </tr>
                <tr>
                <td>
                  Clouds
                  <img
                  className='tdImage'
                    src="https://image.shutterstock.com/image-vector/cloud-computing-logo-design-vector-260nw-1913778415.jpg"
                    alt=""
                  />
                </td>
                  <td id="clouds">{weatherData.clouds.all || 'Clear Sky'}</td>
                </tr>
                <tr>
                <td>
                  Sunrise
                  <img
                  className='tdImage'
                    src="https://static.vecteezy.com/system/resources/thumbnails/000/584/809/small/17022019-08.jpg"
                    alt=""
                  />
                </td>
                  <td id="sunrise">{new Date(weatherData.sys.sunrise * 1000).toLocaleString()}</td>
                </tr>
                <tr>
                <td>
                  Sunset
                  <img
                  className='tdImage'
                    src="https://thumbs.dreamstime.com/b/beautiful-sunset-logo-vector-half-sun-mirage-icon-symbol-graphic-design-illustrations-170629419.jpg"
                    alt=""
                  />
                </td>
                  <td id="sunset">{new Date(weatherData.sys.sunset * 1000).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
