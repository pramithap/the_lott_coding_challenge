import React, { useState, useCallback, useMemo } from 'react';
import Number from '../Number/Number';
import DrawNumbers from '../DrawNumbers/DrawNumbers';
import Banner from '../Banner/Banner';
import Button from '../Button/Button';
import fetchLatestResults from '../../api/api';
import autoFillImage from '../../icons/autofill.png';
import deleteImage from '../../icons/delete.png';

import './styles.css';

type TicketProps = {
    type: string;
    possibleTicketNumbers: {
        primary: number,
        secondary?: number,
    }
    possibleDrawNumbers: {
        primary : number,
        secondary : number
    }
};

const Ticket = ({ type, possibleTicketNumbers, possibleDrawNumbers }: TicketProps) => {

    //initialize the primary and secondary numbers in the ticket
    const primaryNumbers = useMemo(() => Array.from({ length: possibleTicketNumbers.primary }, (_, i) => i + 1), [possibleTicketNumbers.primary]);
    const secondaryNumbers = useMemo(() => possibleTicketNumbers.secondary
        ? Array.from({ length: possibleTicketNumbers.secondary }, (_, i) => i + 1)
        : [], [possibleTicketNumbers.secondary]);

    //keep the state of primary and secondary draw numbers in the ticket 
    const [primaryDrawNumbers, setPrimaryDrawNumbers] = useState<number[]>([]);
    const [secondaryDrawNumbers, setSecondaryDrawNumbers] = useState<number[]>([]);

    // fetch and update the state of primary and secondary draw numbers in the ticket 
    const handleAutoFill = useCallback(async () => {
        try {
            const data = await fetchLatestResults();
            if (data && data.DrawResults && data.DrawResults.length > 0) {
                const result = data.DrawResults[0];
                setPrimaryDrawNumbers(result.PrimaryNumbers);
                setSecondaryDrawNumbers(result.SecondaryNumbers);
            }
        } catch (error) {
            console.error('Error fetching the latest draw numbers:', error);
        }
    }, []);

    // reset the state of primary and secondary draw numbers in the ticket
    const handleClear = useCallback(() => {
        setPrimaryDrawNumbers([]);
        setSecondaryDrawNumbers([]);
    }, []);

    // Added the Memoization to avoid unnecessary re-rendering of the primary numbers components
    const primaryNumbersComponents = useMemo(() => primaryNumbers.map((num, index) => (
        <Number 
            key={`primary-${index}`} 
            number={num} 
            id = {`container-primary-${num}`}
            type="Primary" 
            isDrawNumber={primaryDrawNumbers.includes(num)} 
            isContainerNumber={true}
        />
    )), [primaryNumbers, primaryDrawNumbers]);

    // Added the Memoization to avoid unnecessary re-rendering of the secondary numbers components
    const secondaryNumbersComponents = useMemo(() => secondaryNumbers.map((num, index) => (
        <Number 
            key={`secondary-${index}`} 
            number={num} 
            id = {`container-secondary-${num}`}
            type="Secondary" 
            isDrawNumber={secondaryDrawNumbers.includes(num)} 
            isContainerNumber={true}
        />
    )), [secondaryNumbers, secondaryDrawNumbers]);

    return (
        <div className='ticket-container'>
            <div className='ticket-header-wrapper'>
                <div className='ticket-header'>
                    <DrawNumbers 
                        possibleDrawNumbers={possibleDrawNumbers}
                        primaryDrawNumbers={primaryDrawNumbers} 
                        secondaryDrawNumbers={secondaryDrawNumbers}
                    />
                </div>
                <div className='control-buttons'>
                    <Button 
                        text="" 
                        imgURL={autoFillImage} 
                        altText="AutoFill" 
                        width="45px" 
                        height="40px" 
                        onClick={handleAutoFill} 
                    />
                    <Button 
                        text="" 
                        imgURL={deleteImage} 
                        altText="Clear" 
                        width="50px" 
                        height="50px" 
                        onClick={handleClear} 
                    />
                </div>
            </div>

            <div className='ticket-numbers-container-wrapper'>
                <div className='ticket-numbers-container'>
                    {primaryNumbersComponents}
                </div>
                {type === 'PowerBall' && <Banner text="SELECT YOUR POWER BALL" />}
                {secondaryNumbers.length > 0 &&
                    <div className='ticket-numbers-container'>
                        {secondaryNumbersComponents}
                    </div>
                }
            </div>
        </div>
    );
}

export default Ticket;
