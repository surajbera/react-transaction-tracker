export const customConsoleLog = (text = 'Default Console Log Message') => {
  const colorArr = ['#cbd5e1', '#fed7aa', '#fef08a', '#d9f99d', '#a7f3d0', '#bfdbfe', '#e9d5ff'];

  const logStyle = `color: black; background: ${
    colorArr[Math.floor(Math.random() * colorArr.length)]
  };`;
  const LOG_CONSOLE = true;
  if (LOG_CONSOLE) {
    console.log(`%c${text}`, logStyle);
  }
};
