type ButtonProps = {
    text: string;
    imgURL?: string;
    altText?: string;
    width?: string;
    height?: string;
    onClick: () => void;
};

const Button = ({ text, imgURL, altText, width, height, onClick}: ButtonProps) => {
    return (
        <div className="button" onClick={onClick}>
            {imgURL && (
                <img 
                    src={imgURL} 
                    alt={`${altText} icon`} 
                    className="button-icon" 
                    style={{ width, height }}
                />
            )}
            <span className="button-text">{text}</span>
        </div>
    );
}

export default Button;
