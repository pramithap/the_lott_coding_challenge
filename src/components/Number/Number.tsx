import React from 'react';
import './styles.css';

type NumberProps = {
    number: number | string;
    id : string;
    type: "Primary" | "Secondary";
    isDrawNumber: boolean;
    isContainerNumber: boolean;
};

const Number = ({ number, id, type, isDrawNumber, isContainerNumber }: NumberProps) => {
    // Determine the class for the number based on its type and state
    let typeClass = '';

    // If it's a draw number and not a container number, apply the round styles
    if (!isContainerNumber && isDrawNumber) {
        typeClass = 'number-round';
        if (type === 'Primary') {
            if (number !== '') {
                typeClass += ' number-round-primary';
            }
        } else if (type === 'Secondary') {
            // Apply secondary round styles if it's a secondary number
            typeClass += ' number-round-secondary';
        }
    }

    // If it's a number in the ticket container and also a draw number, apply the container styles
    if (isContainerNumber && isDrawNumber) {
        typeClass = 'container-number number-cross';
    }

    return (
        <div id={id} data-testid={id} className={`number ${typeClass}`}>
            {number}
        </div>
    );
};

export default React.memo(Number);
