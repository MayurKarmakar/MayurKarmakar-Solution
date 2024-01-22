import * as yup from "yup";

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} The debounced function.
 *
 * @example
 * // Example usage:
 * const debouncedFunction = debounce(myFunction, 300);
 * window.addEventListener('resize', debouncedFunction);
 */

export function debounce(func: Function, wait: number): Function {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any[]) {
    if (timeout) clearTimeout(timeout);
    const context = globalThis;
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

/**
 * Fetches information about countries based on a search term.
 *
 * @param {string} searchTerm - The search term used to query for countries.
 * @returns {Promise} A Promise that resolves to the response JSON or rejects with an error.
 * @throws {Error} Throws an error if the search term is empty.
 *
 * @example
 * // Example usage:
 * try {
 *   const searchTerm = "United";
 *   const countriesData = await fetchCountries(searchTerm);
 *   console.log(countriesData);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */

const countryDetailSchema = yup.object().shape({
  name: yup.object().shape({
    common: yup.string().required(),
  }),
  cca2: yup.string().required(),
  flags: yup.object().shape({
    png: yup.string().required(),
    svg: yup.string().required(),
  }),
});

const arrayOfCountryDetailSchema = yup.array().of(countryDetailSchema);

export async function fetchCountries(searchTerm: string) {
  if (!searchTerm) {
    throw new Error("Search term cannot be empty");
  }

  const response = await fetch(
    `https://restcountries.com/v3.1/name/${searchTerm}`
  );

  const jsonResponse = await response.json();
  const validatedCountriesList = await arrayOfCountryDetailSchema.validate(
    jsonResponse,
    {
      stripUnknown: true,
      strict: true,
    }
  );

  if (!validatedCountriesList) {
    throw new Error("validation returning undefined");
  }

  return validatedCountriesList;
}

/**
 * Calculates the age based on a given birthdate string.
 *
 * @param {string} date - The birthdate string in the format "YYYY-MM-DD".
 * @returns {number} The calculated age.
 *
 * @example
 * // Example usage:
 * const birthdate = "1990-05-15";
 * const age = getAgeFromDateString(birthdate);
 * console.log(`The person is ${age} years old.`);
 */

export function getAgeFromDateString(date: string) {
  const parts: string[] = date.split("/");
  const day: number = parseInt(parts[0], 10);
  const month: number = parseInt(parts[1], 10) - 1;
  const year: number = parseInt(parts[2], 10);

  const now: Date = new Date();
  const birthDate: Date = new Date(year, month, day);

  const diff: number = now.getTime() - birthDate.getTime();
  const age: number = Math.floor(diff / 31557600000);

  return age;
}
