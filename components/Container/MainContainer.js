"use client"

import "../../config/i18n";
import Head from "next/head";
import styles from "../../styles/components/container/MainContainer.module.css";
import { useTranslation } from "react-i18next";
import localFont from "next/font/local";
import classNames from "classnames";
 
const ffFont = localFont({ src: "../../fonts/FFXIVAppIcons.ttf" });

export default function MainContainer({
    title,
    children,
}) {
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.rootContainer, ffFont.className)}>
            <Head>
                <title>{t(title)} v{process.env.NEXT_PUBLIC_APP_VERSION}</title>
                <link rel="icon" href={`/favicon.ico`} />
            </Head>

            <main className={styles.mainContainer}>
                {children}
            </main>
        </div>
    )
}
