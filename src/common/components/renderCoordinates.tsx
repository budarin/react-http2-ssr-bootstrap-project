import React from 'react';

const renderCoordinates = ({ x, y }: ICoordinates): JSX.Element => {
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
