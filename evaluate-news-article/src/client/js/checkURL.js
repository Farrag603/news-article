const checkURL = (url) => {
    const regex = new RegExp(
      /^(https?:\/\/)?([a-z0-9]+[.])?[a-z0-9-]+\.[a-z]{2,}(:\d{1,5})?(\/.*)?$/i
    );
    return regex.test(url);
  };
  
  export { checkURL };
  