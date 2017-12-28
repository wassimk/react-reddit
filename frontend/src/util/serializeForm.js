export default refs => {
  const formValues = {};
  Object.keys(refs).forEach(ref => {
    formValues[ref] = refs[ref].value;
  });
  return formValues;
};
