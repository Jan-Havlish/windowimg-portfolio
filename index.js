const apps = [
  { id: 0, name: "Notes", content: "My Blog" },
  { id: 1, name: "Contacts", content: "Contact me" },
  { id: 2, name: "My Projects", content: "See my projects" },
];


  function initializeApp() {
    const screen = document.getElementById("screen");
    createDesktop(screen);
  }

  function createDesktop(screen) {
    createAppButtons(screen);
  }

  function createAppButtons(screen) {
    apps.forEach((app) => {
      const button = createButton(app);
      screen.appendChild(button);
    });
  }

  function createButton(app) {
    const button = document.createElement("button");
    button.innerHTML = app.name;
    button.id = app.id;
    button.onclick = () => createAppWindow(app);
    return button;
  }

  function createAppWindow(app) {
    if (!document.querySelector(`div[id="${app.id}"]`)) {
      const div = document.createElement("div");
      div.id = app.id;
      div.className = "appWindow";

      const topBar = document.createElement("div");
      topBar.className = "topBar";
      div.appendChild(topBar);

      const moveBar = createMoveBar(app.id);
      topBar.appendChild(moveBar);

      const closeButton = createCloseButton(div);
      topBar.appendChild(closeButton);

      const contentSpan = createContentSpan(app.content);
      div.appendChild(contentSpan);

      div.onclick = () => moveToForeground(app.id);

      document.getElementById("screen").appendChild(div);
    } else {
      moveToForeground(app.id);
    }
  }

  function moveToForeground(appId) {
    const allWindows = document.querySelectorAll(".appWindow");
    allWindows.forEach((window) => {
      window.style.zIndex = 0;
    });
    const appWindow = document.querySelector(`div[id="${appId}"]`);
    appWindow.style.zIndex = 1;
    
  }
  function createMoveBar(appId) {
    const moveBar = document.createElement("button");
    moveBar.className = "moveBar";
    moveBar.textContent = "Move";
    const mouseMoveHandler = createMouseMoveHandler(appId);
    moveBar.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", () =>
        handleMouseUp(mouseMoveHandler)
      );
    });
    return moveBar;
  }

  function createCloseButton(div) {
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.onclick = () => div.remove();
    return closeButton;
  }

  function createContentSpan(content) {
    const contentSpan = document.createElement("span");
    contentSpan.innerHTML = content;
    return contentSpan;
  }

  function createMouseMoveHandler(appId) {
    return function (event) {
      grabDivAndMove(event, appId);
      console.log("handleMouseMove", event.clientX, event.clientY);
    };
  }

  function handleMouseUp(mouseMoveHandler) {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", handleMouseUp);
    console.log("handleMouseUp");
  }

  function grabDivAndMove(event, id) {
    const div = document.querySelector(`div[id="${id}"]`);
    div.style.left = event.clientX + "px";
    div.style.top = event.clientY + "px";
  }

  initializeApp();