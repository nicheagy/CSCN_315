// Function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';')[0];
  }
  
  // Function to set a cookie with name, value, and expiration (in days)
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
  
  // Function to apply preferences to the page style
  function applyPreferences(prefs) {
    if (prefs.bgColor) document.body.style.backgroundColor = prefs.bgColor;
    if (prefs.textColor) document.body.style.color = prefs.textColor;
    if (prefs.fontSize) document.body.style.fontSize = prefs.fontSize;
  }
  
  // Function to read preferences from the URL query string
  function getPrefsFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
      bgColor: params.get("bgColor"),
      textColor: params.get("textColor"),
      fontSize: params.get("fontSize")
    };
  }
  
  // Function to read preferences from cookies
  function getPrefsFromCookies() {
    return {
      bgColor: getCookie("bgColor"),
      textColor: getCookie("textColor"),
      fontSize: getCookie("fontSize")
    };
  }
  
  // Function to save preferences into cookies (7-day expiration)
  function savePrefsToCookies(prefs) {
    for (const key in prefs) {
      if (prefs[key]) {
        setCookie(key, prefs[key], 7);
      }
    }
  }
  
  // Function to populate the form with preferences (if available)
  function populateForm(prefs) {
    const form = document.getElementById("customizationForm");
    form.bgColor.value = prefs.bgColor || "#ffffff";
    form.textColor.value = prefs.textColor || "#000000";
    form.fontSize.value = prefs.fontSize || "16px";
  }
  
  // Main logic executed when the page loads
  const urlPrefs = getPrefsFromURL();       // Get preferences from URL
  const cookiePrefs = getPrefsFromCookies(); // Get preferences from cookies
  
  // Use URL preferences if present; otherwise, fallback to cookie preferences
  const prefs = {
    bgColor: urlPrefs.bgColor || cookiePrefs.bgColor,
    textColor: urlPrefs.textColor || cookiePrefs.textColor,
    fontSize: urlPrefs.fontSize || cookiePrefs.fontSize
  };
  
  // Apply the preferences to the page and populate the form
  applyPreferences(prefs);
  populateForm(prefs);
  
  // Save URL preferences into cookies if they exist
  if (urlPrefs.bgColor || urlPrefs.textColor || urlPrefs.fontSize) {
    savePrefsToCookies(urlPrefs);
  }
  
  // Event listener for form submission
  document.getElementById("customizationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const bgColor = e.target.bgColor.value;
    const textColor = e.target.textColor.value;
    const fontSize = e.target.fontSize.value;
  
    // Update URL query parameters with selected preferences
    const url = new URL(window.location.href);
    url.searchParams.set("bgColor", bgColor);
    url.searchParams.set("textColor", textColor);
    url.searchParams.set("fontSize", fontSize);
  
    // Redirect to the new URL to apply the settings
    window.location.href = url.toString();
  });  