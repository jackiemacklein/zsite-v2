import { parseISO, format } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import { zonedTimeToUtc } from "date-fns-tz";

function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export function getDate(date, formatDate) {
  if (date) {
    return format(parseISO(date), formatDate, { locale: pt });
  } else {
    return "";
  }
}

export function getDateByTimeZoneCba(date, formatDate) {
  if (date) {
    date = date.replace("T00:", "T04");

    return getDate(date, formatDate);
  } else {
    return "";
  }
}

export function getDate2(date, formatDate) {
  if (date) {
    return format(date, formatDate, { locale: pt });
  } else {
    return "";
  }
}

export function maskTelephone89Digitos(field) {
  //var field = target; //global.document.querySelector('input[type="tel"]');
  var formated;
  var telephone = field.value;
  var novo = telephone.replace(/[^0-9]/g, "");

  field.value = novo;

  if (novo.substr(0, 1) === "0") {
    novo = novo.substr(1);
  }

  if (novo.length >= 10) {
    if (novo.length >= 11) {
      novo = "(" + novo.substr(0, 2) + ") " + novo.substr(2, 1) + " " + novo.substr(3, 4) + "-" + novo.substr(7, 4);
      return novo;
    } else {
      novo = "(" + novo.substr(0, 2) + ") " + novo.substr(2, 4) + "-" + novo.substr(6, 4);
      return novo;
    }
  } else {
    return novo;
  }

  return formated;
}

export function maskCep(field) {
  var formated;
  var cep = field.value;
  var novo = cep.replace(/[^0-9]/g, "");

  field.value = novo;

  if (novo.length >= 8) {
    novo = novo.substr(0, 5) + "-" + novo.substr(5, 3);
    formated = novo;
  }

  return formated;
}

export function maskInteger(field) {
  var formated;
  var number = field.value;
  return number.replace(/[^0-9]/g, "");
}

export function maskChaveSeguranca(field) {
  var text = field.value;
  text = text.replace(/[^[a-zA-Z0-9]/g, "");

  if (text.length > 4) {
    text = text.substr(0, 4) + "." + text.substr(4, 4) + "." + text.substr(8, 4) + "." + text.substr(12, 4);
    return text;
  }
  return text;
}

export function maskCurrencyReal(value, onLoad = false) {
  var v;

  if (isInt(value) || isFloat(value)) {
    v = value; //.toString().replace(/\D/g, "");
    v = v.toFixed(2) + "";
  } else {
    v = value.toString().replace(/\D/g, "");
    v = (v / 100).toFixed(2) + "";
  }

  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");

  return v;
}

export function maskCurrencyRealtoCalc(value) {
  return parseFloat((maskCurrencyReal(value).toString().replace(/\D/g, "") / 100).toFixed(2));
}

export function realToFloat(value) {
  return parseFloat(value.toString().replace(".", "").replace(",", "."));
}

export function replaceAllSpecialChars(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/([^\w]+|\s+)/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/(^-+|-+$)/, "");
}

export function filterString(text, term) {
  return replaceAllSpecialChars(text.toString()).includes(replaceAllSpecialChars(term.toString()));
}

export function getTypeByName(name) {
  if (name) {
    const ext = name.toString().split(".")[name.toString().split(".").length - 1];
    return ext;
  }

  return "";
}

export function getUserAgent() {
  var nav = navigator.userAgent.toLowerCase();
  if (nav.indexOf("msie") != -1) {
    return "msie";
  } else if (nav.indexOf("opera") != -1) {
    return "opera";
  } else if (nav.indexOf("mozilla") != -1) {
    if (nav.indexOf("firefox") != -1) {
      return "firefox";
    } else if (nav.indexOf("firefox") != -1) {
      return "mozilla";
    } else if (nav.indexOf("chrome") != -1) {
      return "chrome";
    }
  } else {
    return "";
  }
}

export function activeUrl(to, history) {
  return filterString(history.location.pathname, to);
}

export function confirmExit(force = false, condition) {
  window.onbeforeunload = () => {
    if (force === true && condition) {
      return "Deseja realmente sair desta página?";
    }
  };
}

export function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator
  return !!pattern.test(str);
}

export const handlePaginateChange = (path, pageNumber, history) => {
  history.push(`${path}${pageNumber}${history.location.search}`);
};

export function handleGetPaginate(path, pageNumber) {
  return `${path}${pageNumber}`;
}

export function maskCpfCnpj(target) {
  clearMask(target);

  if (target.value.length <= 11) {
    return (target.value = maskCpf(target.value));
  } else {
    return (target.value = maskCnpj(target.value));
  }
}

function clearMask(target) {
  target.value = target.value.replace(/(\.|\/|\-)/g, "");
}
function maskCpf(value) {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
}
function maskCnpj(value) {
  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
}

export function stripAccents(text) {
  if (text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return "";
}
