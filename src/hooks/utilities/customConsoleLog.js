export const customConsoleLog = (text = 'Default Console Log Message', bgColor = '#bbf7d0') => {
  const logStyle = `color: black; background: ${bgColor};`;
  const LOG_CONSOLE = true;
  if (LOG_CONSOLE) {
    console.log(`%c${text}`, logStyle);
  }
};
