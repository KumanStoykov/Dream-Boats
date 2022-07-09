import styles from './Thumbnail.module.css';

const Thumbnail = ({ arr, image, index }) => {
    return (
        <div className={styles.thumbnail}>
            {
                arr.map((imgSrc, i) =>
                    <img key={i}
                    alt='image.png'
                    height='50'
                    width='50'
                    src={imgSrc}
                    onClick={() => image(i)}
                    className={index === i ? styles.active : ''}
                    />
                )
            }
        </div>
    );
};

export default Thumbnail;