import styles from './page.module.css'

export default function Page() {

    return (

        <section className={styles.feed}>
            <h2 className={styles.heading}>ALL POSTS</h2>
            <div className={styles.feedCard}>
                <div className={styles.postInfo}>
                    <h3 className={styles.cardHeader}>Det här är en titel</h3>
                    <p className={styles.details}>Petra Johansson</p>
                    <p className={styles.subject}>Den här texten kan vara nästan hur lång som helst.
                        Men det borde kanske finnas en gräns för hur mkt som ska synas innan man får trycker på Visa mer?</p>
                    <p className={styles.details}>10:32 - 20 maj 2023</p>
                </div>
                <div className={styles.cardFooter}>

                    <p className={styles.details}>Comments</p>
                    <p className={styles.details}>Likes</p>
                </div>
            </div>

            <div className={styles.feedCard}>
                <div className={styles.postInfo}>
                    <h3 className={styles.cardHeader}>Det här är en annan ganska så lång titel</h3>                        <p className={styles.details}>Hannes Colt</p>
                    <p className={styles.subject}>Den här texten kan vara nästan hur lång som helst.
                        Men det borde kanske finnas en gräns för hur mkt som ska synas innan man får trycker på Visa mer?</p>
                    <p className={styles.details}>10:32 - 25 maj 2023</p>
                </div>
                <div className={styles.cardFooter}>

                    <p className={styles.details}>Comments</p>
                    <p className={styles.details}>Likes</p>
                </div>
            </div>

        </section>

    )
};