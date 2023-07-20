export const useConsole = (text = 'Default Console Log Message', bgColor = '#bbf7d0') => {
  const logStyle = `color: black; background: ${bgColor};`
  console.log(`%c${text}`, logStyle)
}
