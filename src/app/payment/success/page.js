import Link from 'next/link';
import styles from './Success.module.css';

export default function Success() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>نجاح</h1>
                <p className={styles.message}>تم إيداع المبلغ بنجاح</p>
                <Link href="/" className={styles.button}>
                    العودة إلى الصفحة الرئيسية
                </Link>
            </div>
        </div>
    )
}