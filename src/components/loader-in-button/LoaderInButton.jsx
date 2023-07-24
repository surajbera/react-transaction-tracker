import styles from './loader-in-button.module.css'

const LoaderInButton = () => {
  return (
    <button id={styles['loading-button']}>
      <div className={styles['loading-btn-container']}>
        <div className={styles['loading-btn-bar']}></div>
      </div>
      Adding Transaction
    </button>
  )
}

export default LoaderInButton
