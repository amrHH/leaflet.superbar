L.SuperBar = L.Class.extend({
  initialize: function (options) {
    L.setOptions(this, options);
  },

  // Method to add button to map
  addTo: function (map) {
    this._map = map;

    // create button
    this._createButton();

    return this;
  },

  _createButton: function () {
    var button = L.DomUtil.create("button", "leaflet-superbar-button");
    button.innerHTML = "open";
    L.DomEvent.on(button, "click", this._openSuperBar, this);
    this._map.getContainer().appendChild(button);
  },

  // Methode to open the side bar
  _openSuperBar: function () {
    fetch("./src/view/superbar_content.html")
      .then((response) => response.text())
      .then((content) => {
        var superBar = L.DomUtil.create("div", "leaflet-superbar");
        superBar.innerHTML = content;
        this._map.getContainer().appendChild(superBar);
      })
      .catch((error) => {
        console.error("Error of charging the content html :", error);
      });
  },
});

// Function to create new instance
L.superBar = function (options) {
  return new L.SuperBar(options);
};

// Add plugin to Leaflet
L.Map.addInitHook("addHandler", "superBar", L.SuperBar);
