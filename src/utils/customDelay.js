export const customDelay = async (milliSeconds = 1000) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, milliSeconds)
  )
}
