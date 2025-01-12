const FieldErrors = ({ meta }: { meta: object }) => {
    const { isTouched, errors } = meta as {
      isTouched: boolean;
      errors: Array<string>;
    };
  
    if (isTouched && errors.length) {
      return <p className="text-red-500 text-xs">{errors.join(", ")}</p>;
    }
  
    return null;
  };
  
  export default FieldErrors;
  