import React, { Component } from "react";
import Joi from "joi-browser";

import TextField from "@mui/material/TextField";
import RadioButton from "./radioButton";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { get } from "lodash";

class Form extends Component {
  state = {
    field: {},
    errors: [],
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.field, this.schema, options);
    if (!error) return null;
    let errors = [];
    for (let item of error.details) {
      errors[item.path[0]] = {};
      errors[item.path[0]]["state"] = true;
      errors[item.path[0]]["message"] = item.message + ".";
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || [] });

    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const field = { ...this.state.field };
    field[input.name] = input.value;
    this.setState({ field });
  };

  renderTextField(name, label, numberOfRows, isMultiline) {
    const { field, errors } = this.state;
    return (
      <TextField
        onChange={this.handleChange}
        error={get(errors, `${name}.state`)}
        helperText={get(errors, `${name}.message`)}
        name={name}
        value={field[name]}
        id="outlined-basic"
        variant="outlined"
        label={label}
        color="secondary"
        rows={numberOfRows}
        multiline={isMultiline}
        fullWidth
        required
      />
    );
  }

  renderRadioButton(name, label, data) {
    const { field, errors } = this.state;
    return (
      <RadioButton
        onChange={this.handleChange}
        value={field.categoryID}
        name={name}
        label={label}
        error={errors[name]}
        data={data}
      />
    );
  }

  renderButton(sxObject, label) {
    return (
      <Button
        sx={sxObject}
        type="submit"
        color="secondary"
        variant="contained"
        endIcon={<KeyboardArrowRightIcon />}
      >
        {label}
      </Button>
    );
  }
}

export default Form;
