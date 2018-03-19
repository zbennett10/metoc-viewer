import React, {Component} from 'react';

export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.map = L.map('MapRoot', {
            center: [20, -163],
            zoom: 3 
        });
    }

    render() {
        return (
            <div style={{display: "none"}}></div>
        )
    }
}
