"use client"

import "../../config/i18n";
import Head from "next/head";
import styles from "../../styles/components/Container/MainContainer.module.css";
import { useTranslation } from "react-i18next";
import localFont from "next/font/local";
import classNames from "classnames";

const ffFont = localFont({ src: "../../fonts/FFXIVAppIcons.ttf" });

interface MainContainerProps {
    title: string,
    children: React.ReactNode,
}

export default function MainContainer({
    title,
    children,
}: MainContainerProps) {
    const { t } = useTranslation();

    return <div className={classNames(styles.rootContainer, ffFont.className)}>
        <Head>
            <title>{t(title)}</title>
            <link rel="icon" href={`/favicon.ico`} />
        </Head>

        <main className={styles.mainContainer}>
            {children}
        </main>
    </div>
};