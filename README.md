# 3D Rubik's Cube Visualizer

This is a 3D Rubik’s Cube simulation built using **HTML**, **CSS**, and **JavaScript**. The cube mimics the real-world look and behavior of a Rubik’s Cube, allowing users to rotate individual faces with mouse interactions in a web browser.



## FEATURES

**3D Visualization**: Realistic cube rendered in 3D using CSS transforms.
**Face Rotation**: Click on a face and drag slightly toward an anchor to rotate that face.
**Color Stickers**: Each cube face has color stickers using traditional cube colors — blue, green, white, yellow, orange, and red.
**Console Feedback**: Logs every face rotation and cube state in the browser console.
**Cube State Tracker**: Maintains the cube’s internal state using a custom JavaScript class.



## TECHNOLOGIES USED

**HTML5** – For structuring the cube scene and UI elements.
**CSS3** – Used for 3D cube transformations, styles, and face coloring.
**Vanilla JavaScript** – Handles cube creation, face rotation logic, animations, and state tracking.
**DOM Manipulation** – Dynamically adds stickers, rotates cube faces, and interacts with mouse events.



## HOW TO USE

1. **Rotate Cube Faces**  
   Click on a cube face.
   Slightly drag in one of the four directions toward the anchor guides to rotate that face.

2. **View Logs in Console**  
   Press `F12` or `Ctrl + Shift + I` to open browser developer tools.
   Go to the **Console** tab to see face rotations and cube state updates.



## SAMPLE OUTPUT

```bash
Initial Cube State:
wwwwwwwwwrrrrrrrrrgggggggggyyyyyyyyyooooooooobbbbbbbbb

Rotated Face: F
Current Cube State: wwwwwwwwwrrrrrrrrrgggggggggyyyyyyyyyooooooooobbbbbbbbb
```



## LIVE DEMO
You can interact with the cube here:
🔗 https://rubikscubepuzzleusingdom.netlify.app/



## CONCLUSION
This 3D Rubik’s Cube project demonstrates how powerful HTML, CSS, and JavaScript can be when used together to create an interactive and visually rich user experience — all in the browser with no frameworks. It’s a fun and educational way to simulate a Rubik's Cube and visually understand cube mechanics and state tracking. The cube looks and behaves like a real one, offering a playful hands-on UI for practicing face rotations and observing cube transformations in real-time.
