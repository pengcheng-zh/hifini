import styles from './layout.module.css'

interface PropsType {
    children: React.ReactNode
}

const PacalBody: React.FC<PropsType> = ( {children} ) => {
    return (
        <div className={styles.body}>
            <main className={styles.main}>{children}</main>
        </div>
    )
}

export default PacalBody