import React from 'react';
import { TMouseEventRenderer } from './MouseCoordinates';

const renderCoordinates: TMouseEventRenderer = ({ x, y }) => {
    return (
        <div>
            <span>Mouse coordinates:</span>
            <br />
            <span>x = {x}</span>
            <span>{'   '}</span>
            <span>y = {y}</span>
        </div>
    );
};

export default renderCoordinates;
