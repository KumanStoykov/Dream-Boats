import styles from './Thumbnail.module.css';

const Thumbnail = ({ arr, setImageIndexHandler, index }) => {
    return (
        <div className={styles.thumbnail}>
            {
                arr.map((imgSrc, i) =>
                    <img key={i}
                        alt='boat.png'
                        height='50'
                        width='50'
                        src={imgSrc}
                        onClick={() => setImageIndexHandler(i)}
                        className={index === i ? styles.active : ''}
                    />
                )
            }
        </div>
    );
};

export default Thumbnail;