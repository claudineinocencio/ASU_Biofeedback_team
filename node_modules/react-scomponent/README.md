# sComponent

![status](https://img.shields.io/npm/v/react-scomponent) 
![downloads](https://img.shields.io/npm/dt/react-scomponent)
![size](https://img.shields.io/github/size/moothyknight/sComponent/state.component.jsx)
![lic](https://img.shields.io/npm/l/react-scomponent)

`npm i react-scomponent`

Mixes [`anotherstatemanager`](https://github.com/moothyknight/statemanager) functionality into React by wrapping the component's setState function in [React.Component](https://reactjs.org/docs/react-component.html) with the ability to setState on a shared global state object. 

The benefits of this are:
- Components don't require writing any extra logic to have cascading effects on components across your app, or to talk to external scripts subscribed to your shared state object. Just setState in the component as you would normally!
- Makes a lot of react quality of life tools (e.g. routers, redux store) sort of irrelevant, write a whole app with just components and some state subscription logic.
- Easy to cache the global state as JSON to save state on your components.

You can create new state objects and pass them as props otherwise a default `state` can be imported. The component always updates its render first then sets state on the shared object. 

The state object will check on frame for updates to its own values or can be triggered immediately with state.setState({etc:'etc..'}). 

If you update a state value on your component, it will update the corresponding state value on the shared state object so it will be propagated automatically to other components or wherever else in your script.


### Just extend the sComponent as you would a normal react component!
```jsx
import {state, sComponent} from 'react-scomponent'
class myComponent extends sComponent {
    state = {
        clicked:false
    }
    
    onclicked() {
        this.setState({clicked:!this.state.clicked})
        
        console.log(state.data)
    }

    render() { 
        (
            <div> 
                <button onClick={this.onclicked}>Clickme</button>
                {this.state.clicked && 
                    <div> Clicked on! </div>
                }
            </div>
            
        )
    }
}

state.subscribeTrigger('clicked',(res)=>{
    console.log('clicked!');
})


```

Just make sure you preserve the `state` prop if you need to add to those. Else it defaults to the provided `state` object.

### The component code:
```js

import { Component } from 'react'
import {StateManager} from 'anotherstatemanager'

export const state = new StateManager({ }); //globally available state object

//These components share their state with the global state, and changes propagate both directions with setState
export class sComponent extends Component {

    statemgr=state
    UPDATED=[]

    constructor(
        props={
            state:state //can apply a new state other than the global state so you can have states for certain pages for example
        }
    ) {
        super(props);

        if(props.state)
            this.statemgr = props.state;

        //lets overload setState
        let react_setState = this.setState.bind(this);
        
        this.setState = (s={}) => {

            this.UPDATED = Object.keys(s);
            react_setState(s);
            if(typeof s === 'object') {            
               state.setState(s); //now relay through statemanager
            }
        }

        //so this runs AFTER the inherited constructor
        setTimeout(()=>{
            let found = {};
            for(const prop in this.state) { //for all props in state, subscribe to changes in the global state
                this.statemgr.subscribeTrigger(prop,(res)=>{
                    let c = this;
                    if(typeof c === 'undefined'){
                        this.statemgr.unsubscribeTrigger(prop);
                    }
                    else {
                        let wasupdated = this.UPDATED.indexOf(prop);
                        if( wasupdated > -1) {
                            this.UPDATED.splice(wasupdated,1);
                        }
                        else {
                             react_setState({[prop]:res});//only updates one prop at a time rn
                        }
                    }
                });
            }
            if(Object.keys(found).length > 0) react_setState(found); //override defaults
        },0.001);
        
    }

}
```


### StateManager example code:
```js

import {StateManager} from 'anotherstatemanager'

let state = new StateManager(
    {x:1}
    "FRAMERATE" //or 1000 (ms) etc.
    true //start the subscription loops automatically? False to just use the trigger state
    );

let sub = state.subscribe('x',(newx) => {console.log(newx);});


let sub = state.subscribe(key,onchange); //triggers changes on frame
state.unsubsribe(sub); //pass the key you received from .subscribe to remove the function
state.subscribeOnce(key,onchange);

let subt = state.subscribeTrigger(key,onchange); //fire the function when you setState, these run independent of the interval based functions so you can have on-demand functions and on-frame/interval functions
state.unsubscribeTrigger(subt); //pass the key you received from .subscribe to remove the function
state.subscribeTriggerOnce(key,onchange);

let subs = state.subsribeSequential(key,onchange); //this is a sequence state manager so it fires on the update interval and for each update pushed between the update periods e.g. tallying key inputs. This won't relate to the state component by default.
state.unsubscribeSequential(sub);
state.subscribeSequentialOnce(key,onchange);
//...

state.setState({x:3});
state.setState({...keys:values});

```
