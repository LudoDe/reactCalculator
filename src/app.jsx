import React, { Component } from 'react';
import Line from './components/line';
import Result from './components/result';

const math = require('mathjs');

class App extends Component {
    constructor(...args){
        super(...args);
        this.contents = {
            top :       [7, 8, 9, '/', '<', 'C'],
            middle :    [4, 5, 6, '*', '(', ')'],
            bottom :    [1, 2, 3, '-', '^', '\u221A'],
            base :      [0, '.', '%', '+', '=', 'e'],
        }
        this.state = {
            result : '',
            clearOnInput : false
        }
    }

    processInput(e) {
        if(e == 'C'){
            this.setState({result : ''});
        } else if(e == '<'){
            var len = this.state.result.length;
            if(len >= 1){
                this.setState({result : this.state.result.substring(0, len-1)});
            }
        } else if (e == '='){
            var res;
            try {
                res = math.eval(this.state.result.replace("\u221A", "sqrt"));
            } catch(err) {
                console.error('Invalid operation!');
            };
            if(typeof res === 'number'){
                this.setState({result : res});
            } else if (typeof res === 'object'){
                this.setState({result : `${res.re} + i${res.im}`, clearOnInput :  true });
            } 
            else this.setState({result : 'Invalid operation!', clearOnInput :  true});

        } else {
            this.setState({result: this.state.result + e.toString()})
            if(this.state.clearOnInput === true){
                this.setState({result : "", clearOnInput : false});
                console.log("Cleared");
            }
        }
    }

    render() {
        return (
            <app>
                <Result result={this.state.result}/>
                {
                    Object.keys(this.contents).map((e, k) => {
                        return <Line elements = {this.contents[e]} key = {k} passInput = {this.processInput.bind(this)} parent={this}/>
                    })
                }
            </app>
        );
    }
}

export default App;