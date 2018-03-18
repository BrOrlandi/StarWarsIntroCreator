export const setPaypalKey = (key) => {
  const inputs = document.querySelectorAll('input[type=hidden][name=custom]');
  inputs.forEach((input) => {
    input.value = key;
  });
};

export default setPaypalKey;
