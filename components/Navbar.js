import Image from "next/image"

import styles from '../styles/Navbar.module.css'

export default function Navbar(){
    return(
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image src="/imgs/lyric.png" width="30" height="30" alt="lyric"></Image>
                <h1>Your Artits</h1>
            </div>

            <ul className={styles.link_items}>
                <li>
                   Home
                </li>
                <li>
                    Sobre
                </li>
            </ul>
        </nav>
    )
}