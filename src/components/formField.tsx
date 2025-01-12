import validateField from "../helpers/validateFormField";

import FieldErrors from "./formFieldErrors";

const FormField = ({
  form,
  name,
  label,
  validationCallback,
}: {
  form: any;
  name: string;
  label: string;
  validationCallback: (value: any) => void;
}) => {
  return (
    <div>
      <form.Field
        name={name}
        validators={{
          onChange: ({ value }: { value: any }) =>
            validateField({ callback: validationCallback, value }),
        }}
        children={({
          name,
          handleBlur,
          handleChange,
          state: { value, meta },
        }: {
          name: string;
          handleBlur: () => void;
          state: { value: any; meta: any };
          handleChange: (value: any) => void;
        }) => (
            <div className="flex flex-col">
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                value={value}
                onBlur={handleBlur}
                className="rounded-md p-1"
                onChange={(e) => handleChange(e.target.value)}
              />
              <FieldErrors meta={meta} />
            </div>
          )
        }
      />
    </div>
  );
};

export default FormField;
