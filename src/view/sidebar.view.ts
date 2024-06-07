// Import necessary Leaflet types
import "./sidebar.style.css";
import L from "leaflet";

// Define the options interface
interface SuperBarOptions extends L.ControlOptions {}

// Define the SuperBar class extending Leaflet's Class
class SuperBar extends L.Class {
  private _map: L.Map | undefined;
  private _superBarVisible: boolean;
  private _superBarElement: HTMLElement | null;
  private _superBarButton: HTMLButtonElement | null;

  constructor(options: SuperBarOptions) {
    super();
    L.setOptions(this, options);
    this._superBarVisible = true; // Initial state of super bar visibility
    this._superBarElement = null;
    this._superBarButton = null;
  }

  // Method to add button to map
  addTo(map: L.Map): this {
    this._map = map;

    // create button
    this._createButton();

    // create and show super bar
    this._openSuperBar();

    return this;
  }

  private _createButton(): void {
    this._superBarButton = L.DomUtil.create(
      "button",
      "leaflet-superbar-button"
    ) as HTMLButtonElement;
    this._superBarButton.innerHTML = "open";
    L.DomEvent.on(this._superBarButton, "click", this._toggleSuperBar, this); // Change event handler to toggleSuperBar
    this._map?.getContainer().appendChild(this._superBarButton);
  }

  // Method to toggle super bar visibility
  private _toggleSuperBar(): void {
    if (this._superBarVisible) {
      // Close super bar if visible
      this._closeSuperBar();
    } else {
      // Open super bar if not visible
      this._superBarElement?.classList.add("visible");
      this._superBarButton?.classList.remove("hidden");
    }
    this._superBarVisible = !this._superBarVisible; // Toggle visibility state
  }

  private _openSuperBar(): void {
    fetch("./src/view/superbar_content.html")
      .then((response) => response.text())
      .then((content) => {
        // Parse the HTML content
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(content, "text/html");

        // Get the leaflet-superbar__body element
        const superBarBody = htmlDoc.querySelector(
          ".leaflet-superbar__body__layersList"
        );

        if (superBarBody) {
          // Define a dictionary with test values
          const testValues: { [key: string]: string } = {
            value1: "Value 1",
            value2: "Value 2",
            value3: "Value 3",
          };

          // Loop through the dictionary and create a div for each value
          for (const key in testValues) {
            if (Object.hasOwnProperty.call(testValues, key)) {
              const value = testValues[key];
              const div = L.DomUtil.create(
                "div",
                "leaflet-superbar__body__layersList__layer"
              );
              div.textContent = value;
              superBarBody.appendChild(div);
            }
          }

          // Append the modified content to the map container
          this._superBarElement = L.DomUtil.create(
            "div",
            "leaflet-superbar visible"
          );
          this._superBarElement!.innerHTML = htmlDoc.body.innerHTML;
          this._map?.getContainer().appendChild(this._superBarElement);
          this._superBarButton?.classList.remove("hidden");

          // Prevent clicks on the superbar from affecting the map
          this._preventMapEvents(this._superBarElement!);
        }
      })
      .catch((error) => {
        console.error("Error loading the content html:", error);
      });
  }

  // Method to close the side bar
  private _closeSuperBar(): void {
    if (this._superBarElement) {
      this._superBarElement.classList.remove("visible");
      this._superBarButton?.classList.add("hidden");
    }
  }

  private _preventMapEvents(element: HTMLElement): void {
    const events = ["click", "mousedown", "touchstart", "dblclick"];
    events.forEach((event) => {
      L.DomEvent.on(element, event, L.DomEvent.stopPropagation);
    });
  }
}

// Function to create new instance
function superBar(options: SuperBarOptions): SuperBar {
  return new SuperBar(options);
}

// Add plugin to Leaflet
L.Map.addInitHook("addHandler", "superBar", SuperBar);

// Export the SuperBar class and the factory function
export { SuperBar, superBar };
