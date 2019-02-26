import React, { Component } from "react";

class Button extends Component {

    onClick(e) {
        e.preventDefault();
        this.props.inputed(this.props.element);
    }

    render() {
        const {element} = this.props;
        return (
            <button onClick={this.onClick.bind(this)}>
                {element}
            </button>
        );
    }
}

export default Button;