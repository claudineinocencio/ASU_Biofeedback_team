import { Component } from 'react';
import { EventHandler } from './EventHandler';
export declare const state: EventHandler;
export declare class sComponent<P = {} & {
    state?: EventHandler;
    doNotSubscribe?: string[];
}, S = {}> extends Component<P, S> {
    state: any;
    __statemgr: EventHandler;
    __state_subs: {
        [key: string]: number;
    };
    __updated: any[];
    __unique: string;
    react_setState: any;
    setState: (s: any) => void;
    constructor(props?: P & {
        state?: EventHandler;
        doNotSubscribe?: string[];
    });
    __subscribeComponent(prop: string, onEvent?: (value: any) => void): number;
    __unsubscribeComponent(prop?: string): void;
}
