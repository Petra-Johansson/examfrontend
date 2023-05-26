import Header from "@/components/header/header";
import styles from './page.module.css'

export default function Loading(){
return(
    <main>
    <Header/>
    <div className={styles.loadingMain}>

        <h3 className={styles.loading}>Loading...</h3>
        </div>
    </main>
)
}