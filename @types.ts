export interface openWeatherApiByCity {
  name: string,
  local_names?: string
  lat: string,
  lon: string,
  country?: string,
  state?: string,
}

export interface openWeatherApiByZip {
  zip: string,
  name: string,
  lat: string,
  lon: string,
  country: string
}

export interface geoCodeOptions {
  key?: string | undefined,
  version?: string,
  limit?: string,
}
