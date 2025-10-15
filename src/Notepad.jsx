import {useDraggable} from '@dnd-kit/core';
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView
} from 'react95';
import styled from 'styled-components';

const Wrapper = styled.div`
  ::-webkit-scrollbar {
    width: 25px;
    height: 25px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
  }
  ::-webkit-scrollbar-thumb {
      box-sizing: border-box;
      display: inline-block;
      background: ${({ theme }) => theme['material']};
      color: ${({ theme }) => theme['materialText']};
      outline-offset: -2px;
      
      border-style: solid;
      border-width: 2px;
      border-left-color: ${({ theme }) => theme['borderLightest']};
      border-top-color: ${({ theme }) => theme['borderLightest']};
      border-right-color: ${({ theme }) => theme['borderDarkest']};
      border-bottom-color: ${({ theme }) => theme['borderDarkest']};
      box-shadow:
        inset 1px 1px 0px 1px ${({ theme }) => theme['borderLightest']},
        inset -1px -1px 0 1px ${({ theme }) => theme['borderDarkest']}; 
  }

  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .markdown h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .markdown h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
  }

  .markdown p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .markdown a {
    color: #2563eb;
    text-decoration: underline;
  }

  .markdown ul {
    list-style-type: disc;
    padding-left: 1.5rem; 
    margin-bottom: 1rem;
  }

  .markdown ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  .markdown li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .markdown strong {
    font-weight: 700;
    color: #111827; /* neutral dark gray */
  }

  .markdown code {
    background-color: #f3f4f6; /* light gray background */
    color: #d6336c; /* subtle magenta for inline code */
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.95em;
    font-family: 'Fira Code', 'Courier New', monospace;
  }

  .markdown pre {
    background-color: #1e293b; /* dark slate */
    color: #e2e8f0; /* light text */
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    font-family: 'Fira Code', 'Courier New', monospace;
    margin-bottom: 1rem;
  }

  .markdown pre code {
    background: none; /* prevent double backgrounds */
    color: inherit;
    padding: 0;
    font-size: 0.9em;
  }
`;

export default function Notepad({ id, x, y, z, title, projectData, handleCloseWindow, updateZvalue }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = {
    position: 'absolute',
    top: y,
    left: x,
    zIndex: z,
    width: 0,
    height: 0,
    backgroundColor: isDragging ? '#6c5ce7' : '#0984e3',
    color: 'white',
    borderRadius: 8,
    cursor: 'grab',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/NMPC27/${title}/main/README.md`)
      .then((res) => res.text())
      .then((text) => {
        // Replace relative image paths with full GitHub URLs
        const fixedText = text.replace(
          /!\[(.*?)\]\((?!https?:\/\/)(.*?)\)/g,
          (match, alt, src) =>
            `![${alt}](https://raw.githubusercontent.com/NMPC27/${title}/main/${src})`
        );
        setContent(fixedText);
      })
      .catch((err) => console.error("Error fetching README:", err));
  }, []);

  return (
    <div style={style} onClick={() => updateZvalue(id)}>
      <Wrapper>
        <Window className='window'>
          <div ref={setNodeRef} {...listeners} {...attributes}>
            <WindowHeader className='window-title'>
              <span>📄 {title}.txt</span>
            </WindowHeader>
          </div>
          <div style={{position: 'absolute', top: 9, right: 9}} >
            <Button size="sm" onClick={(e) => {e.stopPropagation(); handleCloseWindow(id);}}>
              <span className='close-icon' />
            </Button>
          </div>
          <Toolbar>
            <a href={`https://github.com/NMPC27/${title}`} target="_blank">
              <Button variant='menu' size='sm'>
                Repo
              </Button>
            </a>
            { projectData[title].demo != null ?
              <a href={projectData[title].demo} target="_blank">
                <Button variant='menu' size='sm'>
                  Demo
                </Button>
              </a>
              :
              <Button variant='menu' size='sm' disabled>
                Demo
              </Button>
            }
            { projectData[title].visit != null ?
              <a href={projectData[title].visit} target="_blank">
                <Button variant='menu' size='sm'>
                  Visit
                </Button>
              </a>
              :
              <Button variant='menu' size='sm' disabled>
                Visit
              </Button>
            }
          </Toolbar>
          <div className="markdown" style={{ width: '1200px' }}>
            <WindowContent>
              <ScrollView style={{ height: '590px' }}>
                <ReactMarkdown >{content}</ReactMarkdown>
              </ScrollView>
            </WindowContent>
          </div>
        </Window>
      </Wrapper>
    </div>
  );
}