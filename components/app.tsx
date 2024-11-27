import React, {Component} from 'react'
import Espruino from './espruino'
import { SpotifyControl } from './players/spotify'
import { SoundCloudPlayer } from './players/soundcloud'
import { YouTubePlayer } from './players/youtube'
import {Chart} from './chart/Chart'
import { ShaderPlayer } from './threejs/threeshader'
import { HEGscore } from './hegscore'
import GamePage  from './gamePage'
import HomePage from './homePage'
import SoundPage from './SoundPage'
import SettingsPage from './settingsPage'
import '../styles/global.css';


export class App extends Component<{},{}> {
    
    state = {
        currentView: 'home',
    };

    switchRoute = (view) => {
        this.setState({ currentView: view});
    };


    render() {
         
        const{currentView} = this.state;

            {/* <Espruino showLogger={false}/> */}
            {/* <SpotifyControl/> */}
            {/* <SoundCloudPlayer/>
            <YouTubePlayer/> */}

            const renderContent = () => {
                switch (currentView) {
                  case 'home':
                    return <HomePage/>;
                    break;
                  case 'games':
                    return <GamePage />;
                    break;
                  case 'playSound':
                    return <SoundPage />;
                    break;
                  case 'settings':
                    
                    return <SettingsPage />;
                    break;
                  case 'score':
                    //return <ScorePage />;
                    break;
                  default:
                    return <HomePage />;
                }
              };

              
            return (
                <div>
            <div className="menu-bar">
            <button onClick={() => this.switchRoute('home')}>Home</button>
            <button onClick={() => this.switchRoute('games')}>Games</button>
            <button onClick={() => this.switchRoute('playSound')}>Play Sound</button>
            <button onClick={() => this.switchRoute('settings')}>Settings</button>
            <button onClick={() => this.switchRoute('score')}>Score</button>
                      </div>

                  {
                    <>
   
                      {/* Dynamic Content Container */}
             <div className="content-container">{renderContent()}</div>


                      <HEGscore />
                      <Chart presets={['heg_playback']} />
                      <Chart presets={['hr']} />
                      <Chart presets={['ppg']} />
                    </>
                  }
                </div>
              );
            }
          }