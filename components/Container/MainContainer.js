"use client"

import "../../config/i18n";
import Head from "next/head";
import styles from "../../styles/Container.module.css";
import { useTranslation } from "react-i18next";

export default function MainContainer({
    title,
    children,
}) {
    const { t } = useTranslation();

    return (
        <div className={styles.rootContainer}>
            <Head>
                <title>{t(title)}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.mainContainer}>
                {children}
            </main>
        </div>
    )
}
