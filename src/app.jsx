import React, { Component } from 'react';
import isNumber from 'util';
import Line from './components/line';
import Result from './components/result';

const math = require('mathjs');

class App extends Component {
    constructor(...args){
        super(...args);
        this.contents = {
            top :       [7, 8, 9, '/', '<', 'C'],
            middle :    [4, 5, 6, '*', '(', ')'],
            bottom :    [1, 2, 3, '-', '^', 'sqrt'],
            base :      [0, ',', '%', '+', '='],
        }
        this.state = {
            result : '',
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
                res = math.eval(this.state.result)
            } catch(err) {
                console.error('Invalid operation!');
            };
            if(isNumber(res)){
                this.setState({result : res});
            } else this.setState({result : ''});

        } else {
            this.setState({result: this.state.result + e.toString()})
        }
        console.log(this.state.result);
    }

    render() {
        return (
            <app>
                <Result result={this.state.result}/>
                {
                    Object.keys(this.contents).map((e, k) => {
                        return <Line elements = {this.contents[e]} key = {k} passInput = {this.processInput.bind(this)}/>
                    })
                }
            </app>
        );
    }
}

export default App;