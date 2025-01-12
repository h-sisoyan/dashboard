const validateFormField = ({
  value,
  callback,
}: {
  value: any;
  callback: (value: any) => void;
}) => {
  try {
    callback(value);

    return "";
  } catch (error: any) {
    const parsedError = JSON.parse(error);

    return parsedError[0].message;
  }
};

export default validateFormField;
