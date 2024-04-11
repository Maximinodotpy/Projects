import { fetchWeatherApi } from 'openmeteo';

export interface WeatherData {
    current?: {
        time: Date,
        temperature: number,
        weatherCode: number,
        windSpeed: number,
        windDirection: number,
        isDay: boolean
    },
    hourly?: {
        time: Date[],
        temperature: Float32Array,
        precipitation: Float32Array
    },
    daily?: {
        time: Date[],
        weatherCode: Float32Array,
        temperatureMax: Float32Array,
        temperatureMin: Float32Array
    }
}

export async function getWeatherData(coords: { lat: number, lon: number }): Promise<WeatherData> {
    const params = {
        latitude: coords.lat,
        longitude: coords.lon,
        current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,is_day',
        hourly: 'temperature_2m,precipitation',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min'
    };
    const url = 'https://api.open-meteo.com/v1/forecast';

    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    console.log(response);

    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: current.variables(0)!.value(), // Current is only 1 value, therefore `.value()`
            weatherCode: current.variables(1)!.value(),
            windSpeed: current.variables(2)!.value(),
            windDirection: current.variables(3)!.value(),
            isDay: current.variables(4)!.value() === 1
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature: hourly.variables(0)!.valuesArray()!, // `.valuesArray()` get an array of floats
            precipitation: hourly.variables(1)!.valuesArray()!,
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperatureMax: daily.variables(1)!.valuesArray()!,
            temperatureMin: daily.variables(2)!.valuesArray()!,
        }
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        console.log(
            weatherData.daily.time[i].toISOString(),
            weatherData.daily.weatherCode[i],
            weatherData.daily.temperatureMax[i],
            weatherData.daily.temperatureMin[i]
        );
    }

    return weatherData;
}


export function getWeatherCodeName(code: number) {
    switch (code) {
        case 0:
            return 'Clear';
        case 1:
            return 'Mainly clear';
        case 2:
            return 'Partly cloudy';
        case 3:
            return 'Overcast';
        case 45:
            return 'Fog';
        case 48:
            return 'Rime fog';
        case 51:
            return 'Drizzle';
        case 53:
            return 'Moderate rain';
        case 55:
            return 'Dense rain';
        case 56:
            return 'Freezing rain';
        case 57:
            return 'Moderate freezing rain';
        case 61:
            return 'Slight rain';
        case 63:
            return 'Moderate rain';
        default:
            return 'Unknown';
    }

    return 'Unknown';
}