import styles from './loader-in-button.module.css'

const LoaderInButton = () => {
  return (
    <button id={styles['loading-button']}>
      <div className={styles['loading-btn-container']}>
        <div className={styles['loading-btn-bar']}></div>
      </div>
      Loading
    </button>
  )
}

export default LoaderInButton
