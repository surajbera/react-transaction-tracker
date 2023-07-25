export const useCustomDelay = async (milliSeconds) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, milliSeconds)
  )
}
