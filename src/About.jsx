import {useDraggable} from '@dnd-kit/core';
import React from 'react';
import { GroupBox, TreeView, MenuList, MenuListItem, ScrollView } from 'react95';
import {
  Button,
  Frame,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader
} from 'react95';
import styled from 'styled-components';

const Wrapper = styled.div`
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
`;

const description = "I am a Software Developer with a degree in Informatics Engineering and hands-on experience building reliable, scalable software solutions. Skilled in Java, Python, and modern frameworks, I have worked on projects ranging from smart home systems to large-scale device management platforms in the telecommunications sector. My expertise includes backend development, microservices architecture, REST and gRPC APIs, event-driven systems (Kafka), and cloud deployment (AWS EKS, Docker, Kubernetes). I have strong experience with relational and NoSQL databases (PostgreSQL, MySQL, MongoDB) and CI/CD practices, complemented by monitoring and observability tools such as Prometheus, Grafana, and Datadog. I am passionate about delivering highquality, maintainable software that drives real impact.";

export default function About({ id, x, y, title, content, handleCloseWindow }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = {
    position: 'absolute',
    top: y,
    left: x,
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

  return (
    <div style={style}>
      <Wrapper>
        <Window className='window'>
          <div ref={setNodeRef} {...listeners} {...attributes}>
            <WindowHeader className='window-title'>
              <span>🖥️ About</span>
            </WindowHeader>
          </div>
          <div style={{position: 'absolute', top: 9, right: 9}} >
            <Button size="sm" onClick={() => handleCloseWindow(id)}>
              <span className='close-icon' />
            </Button>
          </div>
          <WindowContent style={{ height: "400px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: '400px' }}>
              [nome h1]
              [foto]

              </div>
              <div style={{ width: '20px' }} />
              <div style={{ width: '400px' }}>

                <GroupBox label='Specifications'>
                  <table>
                  <tr><th>Computer</th><td>{" "}Gateway 2000 P5-120 Tower</td></tr>
                  <tr><th>Operating System</th><td>{" "}Windows 95 (OEM)</td></tr>
                  <tr><th>Processor (CPU)</th><td>{" "}Intel Pentium 120 MHz</td></tr>
                  <tr><th>Memory (RAM)</th><td>{" "}16 MB</td></tr>
                  <tr><th>Storage</th><td>{" "}1.2 GB IDE hard drive</td></tr>
                  <tr><th>Optical Drive</th><td>{" "}4× CD-ROM drive</td></tr>
                  <tr><th>Floppy</th><td>{" "}3.5" 1.44 MB floppy disk drive</td></tr>
                  </table>
                </GroupBox>
              </div>
            </div>
            <br/>
            <p>
              {description}
            </p>
          </WindowContent>
        </Window>
      </Wrapper>
    </div>
  );
}

