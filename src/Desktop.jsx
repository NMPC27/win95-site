import React, { useState,useEffect } from 'react';
import { styleReset } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import FootBar from './FootBar';
import IconURL from './IconURL';
import FolderIcon from './FolderIcon';
import AboutIcon from './AboutIcon';
import Notepad from './Notepad';
import Folder from './Folder'
import {DndContext} from '@dnd-kit/core';

/* Pick a theme of your choice */
import blue from 'react95/dist/themes/blue';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import About from './About';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
  body {
    background-color: #3A6EA5;
  }
`;

const projectData = {
  "Engenharia-de-Software-main": { demo: null, visit: null },
  "Smart-Home-Solutions-UI": { demo: "https://www.youtube.com/watch?v=cpTlBkZe4VE", visit: null },
  "Smart-Home-Solutions-API": { demo: "https://www.youtube.com/watch?v=cpTlBkZe4VE", visit: null },
  "bdproj": { demo: "https://youtu.be/3CTDktONccw", visit: null },
  "CM-Android": { demo: null, visit: "https://github.com/NMPC27/CM-Android/releases" },
  "ihc-proj-2": { demo: null, visit: "https://ihc-psi.vercel.app/" },
  "WS-TP1": { demo: null, visit: null },
  "RMI-A2-22-23": { demo: null, visit: null },
  "RMI-22-23": { demo: null, visit: null },
  "VI-22-23": { demo: null, visit: "https://nmpc27.github.io/VI-22-23/" },
  "CM-22-23": { demo: null, visit: null },
  "AA2": { demo: null, visit: null },
  "AA3": { demo: null, visit: null },
  "Biometria_Projeto": { demo: null, visit: null },
  "atcll-mobile-backend": { demo: "https://www.youtube.com/watch?v=5ISG9VQtByE", visit: null },
  "atcll-bus-app-main": { demo: "https://www.youtube.com/watch?v=5ISG9VQtByE", visit: null },
  "tpg-tetris-ia_equipa_6-main": { demo: "https://www.youtube.com/watch?v=2Kd3KGwfX5Y", visit: null },
  "project-1---vulnerabilities-equipa_16-main": { demo: null, visit: null },
  "project-2---authentication-equipa_16-main": { demo: null, visit: null },
  "altice-labs-ui": { demo: null, visit: null },
  "altice-labs": { demo: null, visit: null },
  "TAI-G7-Lab2": { demo: null, visit: null },
  "TAI-G7-Lab1": { demo: null, visit: null },
  "Spotify-Discord-BOT": { demo: null, visit: "https://github.com/NMPC27/Spotify-Discord-BOT/releases" }
};


const projectFolder = {
  x: 700,
  y: 400,
  z: null,
  type: "folder",
  title: "Projects",
  content: [
    "Engenharia-de-Software-main",
    "Smart-Home-Solutions-UI",
    "Smart-Home-Solutions-API",
    "bdproj",
    "CM-Android",
    "ihc-proj-2",
    "WS-TP1",
    "RMI-A2-22-23",
    "RMI-22-23",
    "VI-22-23",
    "CM-22-23",
    "AA2",
    "AA3",
    "Biometria_Projeto",
    "atcll-mobile-backend",
    "atcll-bus-app-main",
    "tpg-tetris-ia_equipa_6-main",
    "project-1---vulnerabilities-equipa_16-main",
    "project-2---authentication-equipa_16-main",
    "altice-labs-ui",
    "altice-labs",
    "TAI-G7-Lab2",
    "TAI-G7-Lab1",
    "Spotify-Discord-BOT"
  ]
}
const initalDesktopState = [
  { 
    x: 50, 
    y: 50, 
    type: "icon",
    img: "./img/wellfound.png",
    link: "https://wellfound.com/u/nuno-cunha-5",
    text: "WellFound"
  },
  { 
    x: 50, 
    y: 150, 
    type: "icon",
    img: "./img/linkedin.svg",
    link: "https://www.linkedin.com/in/nunocunha27",
    text: "LinkedIn"
  },
  { 
    x: 50, 
    y: 250, 
    type: "icon",
    img: "./img/github.png",
    link: "https://github.com/NMPC27",
    text: "Github"
  },
  { 
    x: 50, 
    y: 350, 
    type: "icon",
    img: "./img/pdf.png",
    link: "./files/Resume.pdf",
    text: "Curriculum"
  },
  { 
    x: 50, 
    y: 450, 
    type: "icon",
    img: "./img/internet.png",
    link: "https://nmpc27.github.io/",
    text: "Website"
  },
  { x: 50, y: 550, type: "folder_icon" },
  { x: 50, y: 650, type: "about_icon" }
]

export default function Desktop() {
  const [desktopState, setDesktopState] = useState(initalDesktopState);
  const [newPos, setNewPos] = useState({x: 700, y: 400});
  const [maxZ, setMaxZ] = useState(10);

  const updatePos = () => {
    if (newPos.x >= 1200) {
      setNewPos({x: 700, y: 400});
    } else {
      setNewPos({x: newPos.x + 50, y: newPos.y + 50});
    }
  }

  const onDragEnd = (event) => {
    const { delta, active: { id } } = event;
    let tmp = [...desktopState];
    tmp[id].x += delta.x;
    tmp[id].y += delta.y;
    setDesktopState(tmp)
  }

  const onDragStart = (event) => {
    if (desktopState[event.active.id].z != undefined) {
      updateZvalue(event.active.id)
    }
  }

  const updateZvalue = (id) => {
    let tmp = [...desktopState];
    tmp[id].z = maxZ;
    setDesktopState(tmp)
    setMaxZ(maxZ+1)
  }

  const handleOpenFolder = () => {
    let tmp = structuredClone(projectFolder);
    tmp.z = maxZ;
    setDesktopState([...desktopState, tmp]);
    setMaxZ(maxZ+1)
  }

  const handleOpenAbout = () => {
    setDesktopState([...desktopState, { x: 700, y: 400, z: maxZ, type: "about"}]);
    setMaxZ(maxZ+1)
  }

  const handleOpenNotepad = (item) => {
    setDesktopState([...desktopState, { x: newPos.x, y: newPos.y, z: maxZ, type: "notepad", title: item }]);
    setMaxZ(maxZ+1)
    updatePos();
  }

  const handleCloseWindow = (idx) => {
    let tmp = [...desktopState];
    tmp.splice(idx, 1);
    setDesktopState(tmp);
  }

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={blue}>
        <DndContext
          onDragEnd={(event) => onDragEnd(event)}
          onDragStart={(event) => onDragStart(event)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
            }}
          >
            {desktopState.map((entity, idx) => {
              if (entity.type === "icon") {
                return (<IconURL id={idx} x={entity.x} y={entity.y} img={entity.img} link={entity.link} text={entity.text} />)
              }
              if (entity.type === "folder_icon") {
                return (<FolderIcon id={idx} x={entity.x} y={entity.y} handleOpenFolder={handleOpenFolder} />)
              }
              if (entity.type === "about_icon") {
                return (<AboutIcon id={idx} x={entity.x} y={entity.y} handleOpenAbout={handleOpenAbout} />)
              }
              if (entity.type === "folder") {
                return (<Folder id={idx} x={entity.x} y={entity.y} z={entity.z} title={entity.title} content={entity.content} handleCloseWindow={handleCloseWindow} handleOpenNotepad={handleOpenNotepad} updateZvalue={updateZvalue}/>)
              }
              if (entity.type === "about") {
                return (<About id={idx} x={entity.x} y={entity.y} z={entity.z} title={entity.title} content={entity.content} handleCloseWindow={handleCloseWindow} updateZvalue={updateZvalue}/>)
              }
              if (entity.type === "notepad") {
                return (<Notepad id={idx} x={entity.x} y={entity.y} z={entity.z} title={entity.title} projectData={projectData} handleCloseWindow={handleCloseWindow} updateZvalue={updateZvalue}/>)
              }
            })}           
          </div>
        </DndContext>
        <FootBar handleOpenFolder={handleOpenFolder} handleOpenAbout={handleOpenAbout}/>
      </ThemeProvider>
    </div>
  );
};