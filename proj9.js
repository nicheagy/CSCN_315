function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';')[0];
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function savePrefsToCookies(prefs) {
  for (const key in prefs) {
      if (prefs[key]) {
          setCookie(key, prefs[key], 7);
      }
  }
}

function getPrefsFromCookies() {
  return {
      bgColor: getCookie("bgColor"),
      textColor: getCookie("textColor"),
      fontSize: getCookie("fontSize")
  };
}

function applyPreferences(prefs) {
  if (prefs.bgColor) document.body.style.backgroundColor = prefs.bgColor;
  if (prefs.textColor) document.body.style.color = prefs.textColor;
  if (prefs.fontSize) document.body.style.fontSize = prefs.fontSize;
}

function populateForm(prefs) {
  const form = document.getElementById("customizationForm");
  form.bgColor.value = prefs.bgColor || "#000000";
  form.textColor.value = prefs.textColor || "#ffffff";
  form.fontSize.value = prefs.fontSize || "16px";
}

const form = document.getElementById("customizationForm");

form.addEventListener("input", function () {
  const bgColor = form.bgColor.value;
  const textColor = form.textColor.value;
  const fontSize = form.fontSize.value;

  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;
  document.body.style.fontSize = fontSize;

  const prefs = { bgColor, textColor, fontSize };
  savePrefsToCookies(prefs);
});

document.getElementById("resetBtn").addEventListener("click", function () {
  const defaults = {
      bgColor: "#000000",
      textColor: "#FFFFFF",
      fontSize: "16px"
  };
  applyPreferences(defaults);
  populateForm(defaults);
  savePrefsToCookies(defaults);
});

const savedPrefs = getPrefsFromCookies();
applyPreferences(savedPrefs);
populateForm(savedPrefs);