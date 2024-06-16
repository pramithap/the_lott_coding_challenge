import './styles.css';

type BannerProps = {
    text: string;
};

const Banner = ({ text }: BannerProps) => {
    return (
        <div className="banner-container">
            {text}
        </div>
    );
}

export default Banner;
