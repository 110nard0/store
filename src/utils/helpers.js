// ==========HELPERS/UTILITIES FUNCTIONS====================
// HDR: HELPERS/UTILITIES FUNCTIONS

// SUB: GET CURRENT PAGE
const getPage = (path = "admin/") => {
  return window.location.pathname.split(path)[1]
    ? window.location.pathname.split(path)[1]
    : window.location.pathname.split("/")[1];
};

// SUB: CONFIRM PAGE LOCATION
const checkInLocation = (val) => {
  return new RegExp("^" + val).test(getPage());
};

// SUB: CONVERTS A ROMAN NUMBER TO NUMERIC NUMBER
const romanToNumber = (s) => {
  const romanNumerals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let num = 0;
  for (let i = 0; i < s.length; i++) {
    if (i < s.length - 1 && romanNumerals[s[i]] < romanNumerals[s[i + 1]]) {
      num -= romanNumerals[s[i]];
    } else {
      num += romanNumerals[s[i]];
    }
  }

  return num;
};

// SUB: CONVERT CLOTH SIZE TO NUMERICAL REPRESENTATION
const clothSizeToNum = (s) => {
  let sizes = {
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
  };

  return sizes[s] ? sizes[s] : 0;
};

// SUB: CAPITALISE A VALUE
const toCapitalise = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export {
  getPage,
  checkInLocation,
  romanToNumber,
  clothSizeToNum,
  toCapitalise,
};
