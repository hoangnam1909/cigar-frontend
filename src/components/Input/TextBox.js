import { useState } from "react";

export default function TextBox(props) {
  const { label, type, placeholder, id, error, onChange, ...inputProps } =
    props;

  return (
    <>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          className="form-control"
          {...inputProps}
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
}
