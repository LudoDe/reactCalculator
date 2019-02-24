import React, { Component } from "react";

class Result extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <result>
                    {this.props.result}
            </result>   
        );
    }
}

export default Result;