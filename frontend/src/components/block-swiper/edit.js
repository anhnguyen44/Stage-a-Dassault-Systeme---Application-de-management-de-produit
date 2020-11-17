/**
 * BLOCK: UAGB - Section Edit Class
 */

// Import classes
import React from 'react';
import Select from 'react-select';
import {
    Component,
} from "@wordpress/element";

import SwiperSlide from '../swiper/index';
import { filter } from 'lodash';

class SwiperEdit extends Component {

    constructor() {
        super(...arguments)
        this.state = {

        }

    }

    componentDidMount() {
    }


    render() {

        return (
            <div>
                <SwiperSlide />
            </div>
        )
            ;
    }
}

export default SwiperEdit;
