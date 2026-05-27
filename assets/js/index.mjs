// Imports
import Sheet from "./sheet.mjs";


/**
 * List of available sheets.
 *
 * @constant
 * @type {Array<Sheet>}
 */
const SHEETS = getSheets();

// If empty, insert "Default" sheet
if (SHEETS.length === 0) {
  SHEETS.push(new Sheet("Default"))
}


/**
 * Pointer to the active Sheet in the list of Sheets.
 *
 * @type {Number}
 */
let INDEX = getIndex();

// Validate
if (INDEX >= SHEETS.length) {
  INDEX = 0;
}


// Event Listener: Left Click, Tap
document.addEventListener("click", function(event) {
  // [data-count]
  if ("count" in event.target.dataset) {
    // No Default Behavior
    event.preventDefault();
    // Increment data-count by 1
    event.target.dataset.count = String(SHEETS[INDEX].inc(event.target.id))
    // Save the Sheets
    setSheets(SHEETS);
    // Return
    return
  }
})


// Event Listener: Right Click, Hold
document.addEventListener("contextmenu", function(event) {
  // If the element has a "data-count" attribute
  if ("count" in event.target.dataset) {
    // No Default Behavior
    event.preventDefault();
    // Decrement data-count by 1
    event.target.dataset.count = String(SHEETS[INDEX].dec(event.target.id))
    // Save the Sheets
    setSheets(SHEETS);
    // Return
    return;
  }
})


/**
 * Get Sheets.
 *
 * @returns {Array<Sheet>}
 */
function getSheets() {

  // Obtain the data
  const data_raw = localStorage.getItem("SHEETS");

  // Parse the data
  const data = JSON.parse(data_raw) ?? [];

  // Validate
  if (!(data instanceof Array)) {
    throw new Error(
      `Unable to parse SHEETS.`
    )
  }

  // Return
  return data.map(function(sheet) {
    return new Sheet(sheet.title, sheet.counts);
  });;
}


/**
 * Set Sheets.
 *
 * @param   {Array<Sheet>} sheets
 *
 * @returns {void}
 */
function setSheets(sheets) {
  localStorage.setItem("SHEETS", JSON.stringify(sheets))
}


/**
 * Get Index.
 *
 * @returns {number}
 */
function getIndex() {
  // Obtain the data
  const data_raw = localStorage.getItem("INDEX") ?? "0";

  // Parse the data
  const data = parseInt(data_raw, 10);

  // Return
  return data
}


/**
 * Set Index.
 *
 * @param   {number} index
 *
 * @returns {void}
 */
function setIndex(index) {
  localStorage.setItem("INDEX", String(index));
}
