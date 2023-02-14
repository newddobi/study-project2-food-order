import React from "react";
import classes from "./Input.module.css";
import { forwardRef, ReactNode } from "react";

type InputType = {
  id: string;
  type: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
};

interface Props {
  children?: ReactNode;
  label: string;
  input: InputType;
}
export type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
