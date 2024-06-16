import Number from '../Number/Number';
import './styles.css';

type DrawNumbersProps = {
    possibleDrawNumbers: {
        primary: number;
        secondary?: number; // some tickets may not have secondary numbers
    };
    primaryDrawNumbers: number[] | undefined;
    secondaryDrawNumbers?: number[] | undefined; // some tickets may not have secondary numbers
};

const DrawNumbers = ({ possibleDrawNumbers, primaryDrawNumbers, secondaryDrawNumbers }: DrawNumbersProps) => {
    return (
        <div className='drawNumbersContainer'>
            <div className='ticket-numbers-container'>
                {(primaryDrawNumbers && primaryDrawNumbers.length > 0 ? primaryDrawNumbers : Array.from({ length: possibleDrawNumbers.primary }, (_, index) => ""))
                    .map((num, index) => (
                        <Number 
                            key={`primary-${index}`} 
                            number={num} 
                            id = {`draw-primary-${num || index}`}
                            type={"Primary"} 
                            isDrawNumber={true} 
                            isContainerNumber={false}
                        />
                    )
                )}
                {possibleDrawNumbers.secondary && (
                    (secondaryDrawNumbers && secondaryDrawNumbers.length > 0 ? secondaryDrawNumbers : Array.from({ length: possibleDrawNumbers.secondary }, (_, index) => "PB"))
                        .map((num, index) => (
                            <Number 
                                key={`secondary-${index}`} 
                                number={num} 
                                id = {`draw-secondary-${num || index}`}
                                type={"Secondary"} 
                                isDrawNumber={true} 
                                isContainerNumber={false}
                            />
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default DrawNumbers;