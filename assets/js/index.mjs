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


/**
 * @type {NodeListOf<Element>}
 */
const DATA_COUNT_LIST = document.querySelectorAll("[data-count]");

/**
 * @type {HTMLSelectElement}
 */
const SHEET_SELECTOR = document.querySelector("select#sheet-selector");

/**
 * @type {HTMLElement}
 */
const SHEET_MENU = document.querySelector("#sheet-menu");

/**
 * @type {HTMLDialogElement}
 */
const DIALOG_SHARE = document.querySelector("dialog#share");

/**
 * @type {HTMLPreElement}
 */
const DIALOG_SHARE_CONTENT = DIALOG_SHARE.querySelector("pre.content");

/**
 * @type {HTMLButtonElement}
 */
const DIALOG_SHARE_COPY = DIALOG_SHARE.querySelector("#share-copy");

/**
 * @type {HTMLButtonElement}
 */
const DIALOG_SHARE_WHATSAPP = DIALOG_SHARE.querySelector("#share-whatsapp");


// Initialize the "select" element
SHEET_SELECTOR.length = SHEETS.length;
for (let idx = 0; idx < SHEET_SELECTOR.length; idx += 1) {
  // Set its text to the Sheet’s title
  SHEET_SELECTOR.item(idx).text = SHEETS[idx].title;
}
// Update the initial selection
SHEET_SELECTOR.selectedIndex = INDEX;
// Select the last selected option
applySheet(SHEETS[INDEX]);


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

  // Switch based on the closest "button" element ID
  switch (event.target.closest("button")?.id) {

    case "new-sheet": {
      // Close popover
      SHEET_MENU.hidePopover();
      // Ask the user for a name
      const title = window.prompt("Name:");
      if (!title) {
        break
      }
      // Create a new Sheet
      SHEETS.push(new Sheet(title));
      setSheets(SHEETS);
      // Update the index
      INDEX = SHEETS.length - 1;
      setIndex(INDEX);
      // Create a new "option" element
      const option = document.createElement("option");
      option.text = title;
      // Insert it into the SHEET_SELECTOR
      SHEET_SELECTOR.add(option);
      SHEET_SELECTOR.selectedIndex = INDEX;
      // Apply the new Sheet
      applySheet(SHEETS[INDEX]);
      break;
    }

    case "rename-sheet": {
      // Close popover
      SHEET_MENU.hidePopover();
      // Ask the user for a new name
      const title = window.prompt("New name:");
      if (!title) {
        break
      }
      // Rename the current Sheet
      SHEETS[INDEX].rename(title);
      setSheets(SHEETS);
      // Rename the current "option" element
      const option = SHEET_SELECTOR.item(INDEX);
      option.text = SHEETS[INDEX].title;
      break;
    }

    case "delete-sheet": {
      // Close popover
      SHEET_MENU.hidePopover();
      // Ask the user for confirmation
      const confirmation = window.confirm("Are you sure?");
      if (!confirmation) {
        return
      }
      // Remove from "select" element list
      SHEET_SELECTOR.removeChild(SHEET_SELECTOR.item(INDEX));
      // Remove from SHEETS
      SHEETS.splice(INDEX, 1);
      // If no Sheet left, create a Default sheet
      if (SHEETS.length === 0) {
        SHEETS.push(new Sheet("Default"));
        // Create a new "option" element
        const option = document.createElement("option");
        option.text = "Default";
        // Insert it into the SHEET_SELECTOR
        SHEET_SELECTOR.add(option);
      }
      setSheets(SHEETS);
      // Validate INDEX
      INDEX = Math.min(INDEX, SHEETS.length - 1);
      setIndex(INDEX);
      // Update the "select" element selected index
      SHEET_SELECTOR.selectedIndex = INDEX;
      // Apply the next Sheet
      applySheet(SHEETS[INDEX]);
      break;
    }

    case "share-sheet": {
      // Close popover
      SHEET_MENU.hidePopover();
      DIALOG_SHARE_CONTENT.textContent = generateShareText();
      DIALOG_SHARE.showModal();
      break;
    }

    case "share-close": {
      DIALOG_SHARE.close();
      break;
    }

    case "share-copy": {
      navigator.clipboard.writeText(DIALOG_SHARE_CONTENT.textContent).then(function() {
        DIALOG_SHARE_COPY.textContent = "Copied!";
        setTimeout(function() {
          DIALOG_SHARE_COPY.textContent = "Copy to Clipboard";
        }, 2000);
      })
      break;
    }

    case "share-whatsapp": {
      window.open("https://wa.me/?text=" + encodeURIComponent(DIALOG_SHARE_CONTENT.textContent), "_blank");
      break;
    }
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


// Event Listener: select
SHEET_SELECTOR.addEventListener("change", function(event) {
  INDEX = event.target.selectedIndex;
  setIndex(INDEX);
  applySheet(SHEETS[INDEX]);
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


/**
 * Apply a Sheet to the page.
 *
 * @param   {Sheet} sheet
 *
 * @returns {void}
 */
function applySheet(sheet) {
  DATA_COUNT_LIST.forEach(function(element) {
    element.dataset.count = sheet.get(element.id)
  })
}


/**
 * Generate the text for the share dialog.
 *
 * @returns {string}
 */
function generateShareText() {
  // Teams
  const teams = {};
  // For each [data-count] element
  DATA_COUNT_LIST.forEach(function(element) {

    // Get the count
    const count = parseInt(element.dataset.count, 10);

    // Get the Team Code and Index
    const match = element.id.split("-");
    if (!match || match.length != 2) {
      throw new Error(
        `Corrupted element id: ${element.id}`
      );
    }

    // Extract Team Code and Index
    const team_code = match[0];
    const index     = parseInt(match[1], 10);

    // Initialize in "teams" array
    if (!(team_code in teams)) {
      teams[team_code] = [];
    };

    // Push to the corresponding teams array
    teams[team_code].push({ num: index, count: count });
  });

  /**
   * @type {Array<string>}
   */
  const completed = [];

  /**
   * @type {Array<string>}
   */
  const missing   = [];

  /**
   * @type {Array<string>}
   */
  const duplicate = [];

  Object.keys(teams).forEach((team_code) => {

    // Sort based on the sticker number
    const items = teams[team_code].sort((a, b) => a.num - b.num);

    // Lists
    const completedLine = items.filter((i) => i.count >=  1 ).map((i) => i.num );
    const missingLine   = items.filter((i) => i.count === 0 ).map((i) => i.num );
    const duplicateLine = items.filter((i) => i.count >   1 );

    if (completedLine.length) {
      completed.push(`${team_code}: ${completedLine.join(",")}`);
    }
    if (missingLine.length) {
      missing.push(  `${team_code}: ${missingLine.join(",")}`);
    }
    if (duplicateLine.length) {
      duplicate.push(`${team_code}: ${duplicateLine.map((i) => `${i.num} (${i.count - 1})`).join(",")}`);
    }
  });

  // Return
  return [
    completed.length > 0 ? "Completed\n" + completed.join("\n") : null,
    missing.length   > 0 ? "Missing\n"   + missing.join("\n")   : null,
    duplicate.length > 0 ? "Duplicate\n" + duplicate.join("\n") : null,
  ].filter(i => i !== null && i !== undefined).join("\n\n");
}
