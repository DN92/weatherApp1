import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Paper, TextInput, Button, Text, Group, Select } from "@mantine/core"
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { getGeoCodeByCity, getGeoCodeByZip } from '../calls/geocoding'
import { openWeatherApiByCity, openWeatherApiByZip } from '../@types'
import { isNumeric } from '../utility/functions'
import states from '../statesDictionary'

// localhost:3000 => home

// Design the user interface
// Call Open weather Api
//Show the user data

function getBackgroundImage(): string {
  const source = '/images/background-1.avif'
  return `url(${source})`
}

const homeStyles: React.CSSProperties = {
  position: 'static',
  height: '100vh',
  backgroundImage: getBackgroundImage(),
  backgroundSize: 'cover'
}

const paperWrapperStyles: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

const paperStyels: React.CSSProperties = {
  maxWidth: '500px'
}

const stateSelectorData = Object.keys(states)
  .concat('')
  .concat('')
  .sort()
  .map(state => ({value: state, label: state, key: state+Math.floor(Math.random() * 10000)}))

const Home: NextPage = () => {

  const [locationInput, setLocationInput] = useState('')
  const [state, setState] = useState('')
  const [geoCodeCity, setGeoCodeCity] = useState<openWeatherApiByCity>()
  const [getCodeZip, setGeoCodeZip] = useState<openWeatherApiByZip>()
  const [fetchError, setFetchError] = useState('')
  const [formError, setFormError] = useState('')

  // getGeoCodeByCity('high point', 'NC', setGeoCodeCity as Dispatch<SetStateAction<openWeatherApiByCity>>, setError)

  // getGeoCodeByZip('27265', setGeoCodeZip as Dispatch<SetStateAction<openWeatherApiByZip>>, setError)

  function handleLocationInput(event: React.ChangeEvent<HTMLInputElement>) {
    setLocationInput(event.target.value)
  }

  function handleStateChange(event: string | null) {
    if(event) setState(event)
  }

  function isValidCityState(city: string, state: string) {
    // if(!(city && state)) {
    //   setFormError('Enter a valid 5 digit zip code, or provide a City and State')
    // }
    return(city.length >= 2 && state)
  }

  async function handleGetWeather() {
    console.log('getting weather')
    if (isValidZipCode(locationInput)) {
      getGeoCodeByZip(
        locationInput,
        setGeoCodeZip as Dispatch<SetStateAction<openWeatherApiByZip>>,
        setFetchError,
        )
    } else if(isValidCityState(locationInput, state)) {
      getGeoCodeByCity(
        locationInput,
        state,
        setGeoCodeCity as Dispatch<SetStateAction<openWeatherApiByCity>>,
        setFormError,
      )
    }
  }

  function isValidZipCode(zipCode: string) {
    const validLength = zipCode.length === 5
    const validNumeric = isNumeric(zipCode, false)
    return validLength && validNumeric
  }


  useEffect(() => {
    if(geoCodeCity) console.log('geoCode:: ', geoCodeCity)
  }, [geoCodeCity])

  useEffect(() => {
    if(getCodeZip) console.log('getCodeZip:: ', getCodeZip)
  }, [getCodeZip])

  useEffect(() => {
    if(state) console.log('current selected state:: ', state)
  }, [state])

  return (

      <main
        className='TEST'
        style={homeStyles}
      >
        <div
          className='paper-wrapper'
          style={paperWrapperStyles}
        >
          <Paper withBorder p='lg'>
            <Group position='apart'>
              <Text size='xl' weight={500}>
                Get the Weather!
              </Text>
            </Group>
            <Group position='apart' mb='xs'>
              <Text size='lg'>
                Enter a City and get the weather
              </Text>
            </Group>
            <Group position='apart'>
              <Group position='apart'>
                <TextInput
                  label="Location"
                  placeholder='city or zip'
                  onChange={handleLocationInput}
                  value={locationInput}
                />
              </Group>
              <Group position='apart'>
                <Select
                  label='select-state'
                  data={stateSelectorData}
                  onChange={e => handleStateChange(e)}
                >
              </Select>
              </Group>
            </Group>
            <Group>
              <Button variant='gradient' size='md' onClick={handleGetWeather}>
                Get Weather
              </Button>
            </Group>
          </Paper>
        </div>
      </main>
  )
}

export default Home
