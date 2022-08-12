import styles from './Contact.module.css';

const Contact = () => {


    return (
        <div className={styles.contact}>

            <article className={styles['heading-wrapper']}>
                <h1 className={styles.heading}>Contact</h1>
            </article>
            <article className={styles['p-wrapper']}>
                <p className={styles['p-text']}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis ab ipsa et voluptatibus dignissimos, sapiente tempora nam velit
                    explicabo eius odio architecto qui ducimus cumque inventore ut rerum voluptas,
                    sed voluptatem. Necessitatibus rem similique, adipisci tempora id quas provident
                    aut iusto? Quaerat cumque magni hic, officia voluptatum odit nostrum magnam!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </article>
            <section className={styles.info}>
                <article className={styles['address-card']}>
                    <p className={styles['p-info']}><span className={styles['bold-text']}>Address:</span> Via Giovanni Di Cagno Abbrescia, 7023 Bari BA, Italy </p>
                    <p className={styles['p-info']}><span className={styles['bold-text']}>Working hours: </span>Mo-Fr: 8:00-20:00</p>
                    <p className={styles['p-info']}><span className={styles['bold-text']}>Phone: </span> +01 234 567</p>

                </article>
                <div className={styles['map-wrapper']}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.8698728748054!2d16.903758315664394!3d41.115532920766334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347e82222a1e841%3A0xa64dac1f5a5269d5!2sVia%20Giovanni%20Di%20Cagno%20Abbrescia%2C%2070126%20Bari%20BA%2C%20Italy!5e0!3m2!1sen!2sde!4v1660331908666!5m2!1sen!2sde"
                        width={'100%'}
                        height={450}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>

        </div>
    );
};

export default Contact;