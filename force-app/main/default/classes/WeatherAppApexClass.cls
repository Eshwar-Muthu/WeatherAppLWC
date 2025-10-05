public with sharing class WeatherAppApexClass
{
    // Returns the raw JSON response from the weather API for the given city input
    @AuraEnabled
    public static String getWeatherInfo(String input)
    {
        String url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + getApiKey() + '&units=metric';
        String response = getResponse(url);
        return response;
    }

    public static string getResponse(string strurl)
    {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setmethod('GET');
        req.setendpoint(strurl);
        req.setTimeout(120000);
        res =h.send(req);
        String bodyOfResponse = res.getBody();
        return bodyOfResponse;

    }

    public static String getApiKey()
    {
        String key = system.label.WeatherAppAPIKey;
        String output = '&appid=' + key;
        return output;
    }
}