from math import ceil
from django.shortcuts import render
import requests
# Create your views here.
def home(request):
    city=request.GET.get('city','Pune')
    
    url=f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid=369cdf2b6f2855a488df08e6ec21b1f0'

    data = requests.get(url).json()
    payload = {
    'city':data['name'],
    'weather':data['weather'][0]['main'],
    'icon':data['weather'][0]['icon'],
    'Kelvin_Temprature':ceil(data['main']['temp']),
    'Celcius_Temprature':ceil(data['main']['temp']) - 273,
    'Pressure':data['main']['pressure'],
    'Humidity':data['main']['humidity'],
    'Description':data['weather'][0]['description'],
    }
    context = {'data': payload}


    return render(request,'home.html',context)