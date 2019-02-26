import React, { Component } from "react";
import Button from "./button";

class Line extends Component {
    addInput(e) {
        this.props.passInput(e);
    }

    render() {
        return (
            <div>
                {
                    this.props.elements.map((e, k) => {
                        return <Button key={k} element={e} parent={this.props.parent} inputed={this.addInput.bind(this)}/>
                    })
                }
            </div>
        );
    }
}

export default Line;