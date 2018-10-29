const useBodyVibrate = () => {
  let currentAlert = false;

  return alert => {
    if (alert !== currentAlert) {
      if (alert === true) {
        document.body.classList.add("vibrate");
      } else {
        document.body.classList.remove("vibrate");
      }

      currentAlert = alert;
    }
  };
};

export default useBodyVibrate();
