'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CommonHeader } from '@/app/reusableComponents/layout/CommonHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/reusableComponents/ui/Table';

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  icon: string;
}

export default function WeatherTablePage() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Mumbai', 'Toronto', 'Dubai'];

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Using Open-Meteo API (no API key required)
      const cityCoords: { [key: string]: { lat: number; lon: number } } = {
        'London': { lat: 51.5074, lon: -0.1278 },
        'New York': { lat: 40.7128, lon: -74.0060 },
        'Tokyo': { lat: 35.6762, lon: 139.6503 },
        'Paris': { lat: 48.8566, lon: 2.3522 },
        'Sydney': { lat: -33.8688, lon: 151.2093 },
        'Mumbai': { lat: 19.0760, lon: 72.8777 },
        'Toronto': { lat: 43.6532, lon: -79.3832 },
        'Dubai': { lat: 25.2048, lon: 55.2708 }
      };

      const promises = cities.map(city => {
        const coords = cityCoords[city];
        return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`);
      });

      const responses = await Promise.all(promises);
      const weather = responses.map((response, index) => {
        const data = response.data.current_weather;
        return {
          city: cities[index],
          temperature: Math.round(data.temperature),
          condition: getWeatherDescription(data.weathercode),
          humidity: Math.round(Math.random() * 40 + 40), // Mock humidity
          icon: getWeatherIcon(data.weathercode)
        };
      });

      setWeatherData(weather);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherDescription = (code: number): string => {
    if (code === 0) return 'Clear';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    return 'Stormy';
  };

  const getWeatherIcon = (code: number): string => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '🌨️';
    return '⛈️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-blue-900/20">
      <CommonHeader
        title="Weather Data Table"
        description={`Current weather for major cities${lastUpdated ? ` • Updated at ${lastUpdated}` : ''}`}
        icon="🌤️"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex justify-end">
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Refreshing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Weather
              </>
            )}
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20">
                <TableHead className="w-[60px]"></TableHead>
                <TableHead>City</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Humidity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weatherData.map((weather, index) => (
                <motion.tr
                  key={weather.city}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <TableCell className="text-3xl">{weather.icon}</TableCell>
                  <TableCell className="font-semibold text-lg">{weather.city}</TableCell>
                  <TableCell>
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {weather.temperature}°C
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                      {weather.condition}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {weather.humidity}%
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}

