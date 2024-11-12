import React, {Component} from 'react'
import Espruino from './espruino'
import { SpotifyControl } from './players/spotify'
import { SoundCloudPlayer } from './players/soundcloud'
import { YouTubePlayer } from './players/youtube'
import {Chart} from './chart/Chart'
import { ShaderPlayer } from './threejs/threeshader'
import { HEGscore } from './hegscore'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import   GamePage  from './gamePage'

export class App extends Component<{},{}> {
    
    render() {
        return (<Router>
         

            <Routes>
            {/* <Espruino showLogger={false}/> */}
            {/* <SpotifyControl/> */}
            {/* <SoundCloudPlayer/>
            <YouTubePlayer/> */}
            <Route path = "/" element = {
            <>   
            <div>
                <Link to = "/gamePage">
                <button> Games</button>
                </Link>
            </div>

                <HEGscore/>
                <ShaderPlayer/>
                <Chart presets={['heg_playback']}/>
                <Chart presets={['hr']}/>
                <Chart presets={['ppg']}/>
            </>
            
            }/>
            
            <Route path = "gamePage" element = {
            <>
                <div>
                    <Link to = "/">
                    <button> Home Page </button>
                    </Link>
                </div> 
                
                
                <GamePage/>
            </>
                }/>
            
            </Routes>
        </Router>)
    }
}