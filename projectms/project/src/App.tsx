import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import UploadScreen from './components/UploadScreen';
import ResultsScreen from './components/ResultsScreen';
import LivingGallery from './components/LivingGallery';
import SettingsScreen from './components/SettingsScreen';

type Screen = 'splash' | 'home' | 'upload' | 'scan' | 'camera' | 'results' | 'gallery' | 'tours' | 'settings';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [screenData, setScreenData] = useState<any>(null);

  const handleNavigate = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    setScreenData(data);
  };

  const handleSplashComplete = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'upload':
      case 'scan':
      case 'camera':
        return <UploadScreen onNavigate={handleNavigate} />;
      case 'results':
        return <ResultsScreen data={screenData} onNavigate={handleNavigate} />;
      case 'gallery':
        return <LivingGallery onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsScreen onNavigate={handleNavigate} />;
      case 'tours':
        // For now, redirect to gallery - you can implement tours later
        return <LivingGallery onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;