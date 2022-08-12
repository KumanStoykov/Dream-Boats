import Slideshow from '../../components/ui/Slider/Slider';
import styles from './About.module.css';

const About = () => {


    return (
        <div className={styles.about}>
            <div className={styles['image-wrapper']}>
                <Slideshow
                    thumbnail={false}
                    imgs={['https://res.cloudinary.com/dyexk2s2s/image/upload/v1660327593/mohamed-masaau-nfF5-G6cFwY-unsplash_gc3bcc.jpg',
                        'https://res.cloudinary.com/dyexk2s2s/image/upload/v1660327610/skylake-studio-8snzcgjC1KE-unsplash_rgvpgk.jpg',
                        'https://res.cloudinary.com/dyexk2s2s/image/upload/v1660327722/oliver-sjostrom-CihXnvELE00-unsplash_1_wyqrkb.jpg']
                    }
                />
            </div>
            <section className={styles['heading-wrapper']}>
                <h1 className={styles.heading}>About us</h1>
                <h1 className={styles['sub-heading']}>Welcome in the club</h1>
            </section>
            <section className={styles['p-wrapper']}>
                <p className={styles['p-text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Perferendis ab ipsa et voluptatibus dignissimos, sapiente tempora nam velit 
                    explicabo eius odio architecto qui ducimus cumque inventore ut rerum voluptas, 
                    sed voluptatem. Necessitatibus rem similique, adipisci tempora id quas provident 
                    aut iusto? Quaerat cumque magni hic, officia voluptatum odit nostrum magnam!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </p>
                <p className={styles['p-text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Perferendis ab ipsa et voluptatibus dignissimos, sapiente tempora nam velit 
                    explicabo eius odio architecto qui ducimus cumque inventore ut rerum voluptas, 
                    sed voluptatem. Necessitatibus rem similique, adipisci tempora id quas provident 
                    aut iusto? Quaerat cumque magni hic, officia voluptatum odit nostrum magnam!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </p>
                <p className={styles['p-text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Perferendis ab ipsa et voluptatibus dignissimos, sapiente tempora nam velit 
                    explicabo eius odio architecto qui ducimus cumque inventore ut rerum voluptas, 
                    sed voluptatem. Necessitatibus rem similique, adipisci tempora id quas provident 
                    aut iusto? Quaerat cumque magni hic, officia voluptatum odit nostrum magnam!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </p>
             </section>   
            
        </div>
    );
};

export default About;