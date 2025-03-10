import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { specialOfferData } from '../data/specialOfferData';

function SpecialOffer() {
    return (
        <SOSection>
            <div>
                <h1></h1>
                <h2></h2>
            </div>
        </SOSection>
    );
}

export default SpecialOffer;

const SOSection = styled.section`
    flex: 1;
    display: flex;
    width: 100%;
    max-height: 100%;
    background: url(${process.env.PUBLIC_URL}/asset/categories/running.png);
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
`;
