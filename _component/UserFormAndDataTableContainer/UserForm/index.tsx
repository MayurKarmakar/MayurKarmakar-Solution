"use client";

import { FormInputDropdown } from "@/_component/form-component/FormInputDropdown";
import { FormInputText } from "@/_component/form-component/FormInputText";
import { addUser } from "@/_store";
import {
  debounce,
  fetchCountries,
  getAgeFromDateString,
} from "@/_utility/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Fade,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { Fragment, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export default function UserForm(): JSX.Element {
  const [currentForm, setCurrentForm] = useState<
    "USER_DETAILS" | "COMMUNICATION_DETAILS"
  >("USER_DETAILS");
  const [loading, setLoading] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<Country[]>([]);
  const dispatch = useDispatch();
  const phoneRegExpWithoutCountryCode = /^[6789]\d{9}$/;
  const phoneRegExpWithCountryCodeA = /^(\+91[\-\s]?)?[6789]\d{9}$/;
  const phoneRegExpWithCountryCodeB = /^(\+91?)?[6789]\d{9}$/;
  const dateRegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const ageRegExp = /^[0-9][0-9]{0,2}$/;
  const aadharRegExp = /^[2-9]\d{11}$/;
  const panRegExp = /^[A-Z]{5}\d{4}[A-Z]$/;
  const sexOptions: SelectOption = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const govtIdOptions: SelectOption = [
    {
      value: "Aadhar",
      label: "Aadhar",
    },
    { value: "PAN", label: "PAN" },
  ];

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Enter name")
      .min(3, "Name must be 3 or more characters long"),
    age: yup
      .string()
      .required("Enter date of birth or age")
      .test("date-or-age-validation", "Invalid date or age", (value) => {
        //To validate date in format DD/MM/YYYY
        if (dateRegExp.test(value)) {
          return true;
        }

        //To validate date so that it's not a negative number
        if (ageRegExp.test(value)) {
          return true;
        }

        return false;
      })
      .transform((value) => {
        //To validate date in format DD/MM/YYYY
        if (dateRegExp.test(value)) {
          return getAgeFromDateString(value).toString();
        }
        //Value is already in the age format
        return value;
      }),
    sex: yup.string().required("Please select your sex type"),
    mobile: yup
      .string()
      .default("N/A")
      .test(
        "mobile-validation",
        "Invalid mobile number",
        function (value, context) {
          if (!value || value === "N/A") return true;
          if (!phoneRegExpWithoutCountryCode.test(value)) {
            context.createError({ message: "Invalid indian phone number" });
            return false;
          }

          if (!phoneRegExpWithCountryCodeA.test(value)) {
            context.createError({ message: "Invalid indian phone number" });
            return false;
          }

          if (!phoneRegExpWithCountryCodeB.test(value)) {
            context.createError({ message: "Invalid indian phone number" });
            return false;
          }

          return true;
        }
      )
      .transform((value) => {
        // If no value for mobile field is entered then transform the value to "N/A"
        return value || "N/A";
      }),
    govtIdType: yup
      .string()
      .nullable()
      .default("N/A")
      .transform((value) => {
        // If no value for govt id type field is entered then tranforming the value to N/A
        if (!value) return "N/A";

        return value;
      }),
    govtId: yup
      .string()
      .nullable()
      .default("N/A")
      .when("govtIdType", {
        is: (value: string) => value !== null || value !== "",
        then: (schema) => {
          return schema.test("govtId-validation", function (value, context) {
            const { govtIdType } = this.parent;
            if (!govtIdType && !value) return true;

            if (!govtIdType && value) {
              return context.createError({
                message: "Please select an Id type",
              });
            }

            if (govtIdType && !value) {
              return context.createError({
                message: "Please enter ID",
              });
            }

            if (govtIdType && value) {
              if (govtIdType === "Aadhar" && !aadharRegExp.test(value)) {
                return context.createError({
                  message: `Invalid Aadhar number`,
                });
              }

              if (govtIdType === "PAN" && !panRegExp.test(value)) {
                return context.createError({ message: `Invalid Pan number` });
              }
            }

            return true;
          });
        },
        otherwise: (schema) => {
          return schema.test("govtId-validation", function (value, context) {
            const { govtIdType } = this.parent;

            if (!govtIdType && value) {
              return context.createError({
                message: "Please select an Id type",
              });
            }

            return true;
          });
        },
      }),
    //   ,
    address: yup
      .string()
      .default("N/A")
      .transform((value) => {
        // If no value for address field is entered then tranforming the value to N/A
        if (value === undefined || value === "") return "N/A";

        //Returning the value entered
        return value;
      }),
    state: yup
      .string()
      .default("N/A")
      .transform((value) => {
        // If no value for state field is entered then tranforming the value to N/A
        if (value === undefined || value === "") return "N/A";

        //Returning the value entered
        return value;
      }),
    city: yup
      .string()
      .default("N/A")
      .transform((value) => {
        console.log("value", value);
        // If no value for city field is entered then tranforming the value to N/A
        if (value === undefined || value === "") return "N/A";

        //Returning the value entered
        return value;
      }),
    country: yup
      .string()
      .default("N/A")
      .transform((value) => {
        // If no value for country field is entered then tranforming the value to N/A
        if (value === undefined || value === "") return "N/A";

        //Returning the value entered
        return value;
      }),
    pincode: yup
      .string()
      .default("N/A")
      .test("pincode-validation", function (value, context) {
        if (!value || value === "N/A") return true;

        if (!/^[1-9]\d{5}$/.test(value)) {
          context.createError({
            message: "Invalid pincode",
          });
          return false;
        }
        return true;
      })
      .transform((value) => {
        // If no value for pincode field is entered then tranforming the value to N/A
        if (value === undefined || value === "") return "N/A";

        //Returning the value entered
        return value;
      }),
  });

  const debouncedFetchCountries = useCallback(
    debounce(async function (value: string) {
      setLoading(true);
      try {
        const countries = await fetchCountries(value);
        const countryOptions = countries.map((country, index) => {
          return {
            id: country.cca2,
            cflag: country.flags.png,
            name: country.name.common,
            key: index.toString(),
          };
        });
        setCountryOptions(countryOptions);
      } catch (err) {
        console.debug("fetch countries error:: ", err);
      }
      setLoading(false);
    }, 300),
    []
  );

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  console.log("form errors:: ", errors);

  const formSubmitHanlder = handleSubmit((data) => {
    if (currentForm === "USER_DETAILS") {
      setCurrentForm("COMMUNICATION_DETAILS");
    } else if (currentForm === "COMMUNICATION_DETAILS") {
      dispatch(addUser(data));
      reset();
      setCurrentForm("USER_DETAILS");
    }
  });

  return (
    <Card sx={{ maxWidth: "90%", minWidth: "60%" }} variant="outlined">
      <CardHeader title="Personal Details" />
      <form onSubmit={formSubmitHanlder}>
        <CardContent>
          {currentForm === "USER_DETAILS" ? (
            <Fade in={currentForm === "USER_DETAILS"}>
              <Box
                sx={{
                  display: { xs: "flex", sm: "grid" },
                  flexDirection: { xs: "column" },
                  height: "100%",
                  width: "100%",
                  gridTemplateRows: "1fr 1fr",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: { xs: "3px", sm: "5px", md: "5px", lg: "20px" },
                }}
              >
                <FormInputText
                  name={"name"}
                  label={"Name"}
                  control={control}
                  helperText={"Enter Name"}
                  required={true}
                />
                <FormInputText
                  name={"age"}
                  label={"Date of Birth or Age"}
                  control={control}
                  helperText={"DD/MM/YYYY or Age in years"}
                  required={true}
                />
                <FormInputDropdown
                  name={"sex"}
                  label={"Sex"}
                  control={control}
                  helperText={"Enter Sex"}
                  required={true}
                  options={sexOptions}
                />
                <FormInputText
                  name={"mobile"}
                  label={"Mobile"}
                  control={control}
                  helperText={"Enter Mobile"}
                  required={false}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    gap: 2,
                    gridColumn: "span 2",
                  }}
                >
                  <FormInputDropdown
                    name={"govtIdType"}
                    label={"Govt issued ID"}
                    control={control}
                    helperText={"ID Type"}
                    required={false}
                    options={govtIdOptions}
                  />
                  <FormInputText
                    name={"govtId"}
                    label={"Id number"}
                    control={control}
                    helperText={"Enter Govt ID"}
                    required={false}
                  />
                </Box>
              </Box>
            </Fade>
          ) : (
            <Fade in={currentForm === "COMMUNICATION_DETAILS"}>
              <Box
                sx={{
                  display: { xs: "flex", sm: "grid" },
                  flexDirection: { xs: "column" },
                  height: "100%",
                  width: "100%",
                  gridTemplateRows: "1fr 1fr",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: { xs: "3px", sm: "5px", md: "5px", lg: "20px" },
                }}
              >
                <FormInputText
                  name={"address"}
                  label={"Address"}
                  control={control}
                  helperText={"Enter address"}
                  required={false}
                />
                <FormInputText
                  name={"state"}
                  label={"State"}
                  control={control}
                  helperText={"Enter state"}
                  required={false}
                />
                <FormInputText
                  name={"city"}
                  label={"City"}
                  control={control}
                  helperText={"Enter city/town/village"}
                  required={false}
                />
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Autocomplete
                        options={countryOptions}
                        id="country-select"
                        getOptionLabel={(option: Country) => option.name || ""}
                        onChange={(e, newInputValue) =>
                          onChange(newInputValue?.name)
                        }
                        loading={loading}
                        renderOption={(props, option) => {
                          return (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              <Image
                                loading="lazy"
                                width="20"
                                height="20"
                                src={`${option.cflag.toLowerCase()}`}
                                alt={option.name}
                              />
                              {option.name}
                            </Box>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            key={params.id}
                            {...params}
                            value={value}
                            onChange={(e) =>
                              debouncedFetchCountries(e.target.value)
                            }
                            label="Country"
                            variant="standard"
                            helperText="Type few keywords of country name"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <Fragment>
                                  {loading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </Fragment>
                              ),
                            }}
                          />
                        )}
                      />
                    );
                  }}
                />
                <FormInputText
                  name={"pincode"}
                  label={"Pincode"}
                  control={control}
                  helperText={"Enter pincode"}
                  required={false}
                />
              </Box>
            </Fade>
          )}
        </CardContent>
        <CardActions>
          <Button variant="contained" type="submit">
            {currentForm === "USER_DETAILS" ? "Next" : "Submit"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
