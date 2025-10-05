import { LightningElement } from 'lwc';


import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons'
import getWeatherInfo from '@salesforce/apex/WeatherAppApexClass.getWeatherInfo'
export default class WeatherApp extends LightningElement {

    clearIcon = WEATHER_ICONS+'/weatherAppIcons/clear.svg'
    cloudIcon = WEATHER_ICONS+'/weatherAppIcons/cloud.svg'
    dropletIcon = WEATHER_ICONS+'/weatherAppIcons/droplet.svg'
    hazeIcon = WEATHER_ICONS+'/weatherAppIcons/haze.svg'
    mapIcon = WEATHER_ICONS+'/weatherAppIcons/map.svg'
    rainIcon = WEATHER_ICONS+'/weatherAppIcons/rain.svg'
    snowIcon = WEATHER_ICONS+'/weatherAppIcons/snow.svg'
    stormIcon = WEATHER_ICONS+'/weatherAppIcons/storm.svg'
    thermometerIcon = WEATHER_ICONS+'/weatherAppIcons/thermometer.svg'
    arrowBackIcon = WEATHER_ICONS+'/weatherAppIcons/arrow-back.svg'

    cityName = ''
    loadingText=''
    isError=false
    response
    weatherIcon

    get loadingClass()
    {
        return this.isError? 'msg-error' : 'msg-fecting'
    }
    searchHandler(event)
    {
        this.cityName=event.target.value
    }

    submitHandler(event)
    {
        
        event.preventDefault()// to prevent the default behavior of form submission i.e, page reload
        this.fetchData();
        this.loadingText= 'Fetching weather details...'
    }

    fetchData()// function to fetch the data from the API
    {
        this.isError=false
        console.log('City Name: '+this.cityName)
        getWeatherInfo({input:this.cityName}).then(result=>{
            this.weatherDetails(JSON.parse(result))
        }).catch(error=>{
            console.log('Error: '+error) // to catch any error that occurs during the fetch operation
            this.response=null
            this.loadingText='Something went wrong ...'
            this.isError=true
            this.cityName=''
        })
        /*const URL= `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${API_KEY}&units=metric`
        fetch(URL).then(res=>res.json()).then(result=>{
            console.log('Result: '+JSON.stringify(result))
            this.loadingText=''
            this.weatherDetails(result)
        }).catch(error=>{
            console.log('Error: '+error) // to catch any error that occurs during the fetch operation
            this.loadingText='Something went wrong ...'
            this.isError=true
            this.cityName=''
        })*/

    }

    weatherDetails(info)
    {
        if(info.cod === '404')
        {
            this.isError=true
            this.loadingText=`${this.cityName} is not a valid city name, please enter a valid city name`
            this.cityName=''
            

        }
        else
        {
            this.loadingText=''
            this.isError=false
            const city =info.name
            const country=info.sys.country
            const {description,id}= info.weather[0]
            const  {temp,feels_like,humidity}= info.main
            if(id===800)
            {
                this.weatherIcon=this.clearIcon
            } 
            else if(id>=200 && id<=232)
            {
                this.weatherIcon=this.stormIcon
            }
            else if(id>=600 && id<=622)
            {
                this.weatherIcon=this.snowIcon
            }
            else if(id>=701 && id<=781)
            {
                this.weatherIcon=this.hazeIcon
            }
            else if(id>=801 && id<=804)
            {
                this.weatherIcon=this.cloudIcon
            }
            else if((id>=500 && id<=531) || (id>=300 && id<=321))
            {
                this.weatherIcon=this.rainIcon
            }
            this.response={
                city:city,
                temperature: Math.round(temp),
                location: `${city}, ${country}`,
                description: description,
                feels_like: Math.round(feels_like),
                humidity:`${humidity}%`
            }
            
        }
    }
    returnHandler()
    {
        this.response=null
        this.cityName=''
        this.isError=false
        this.loadingText=''
        this.weatherIcon=''
    }    


}