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
`;



export default function Folder({ id, x, y, z, title, content, handleCloseWindow, handleOpenNotepad, updateZvalue }) {
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

  return (
    <div style={style} onClick={() => updateZvalue(id)}>
      <Wrapper>
        <Window className='window'>
          <div ref={setNodeRef} {...listeners} {...attributes}>
            <WindowHeader className='window-title'>
              <span>📁 {title}</span>
            </WindowHeader>
          </div>
          <div style={{position: 'absolute', top: 9, right: 9}} >
            <Button size="sm" onClick={(e) => {e.stopPropagation(); handleCloseWindow(id);}}>
              <span className='close-icon' />
            </Button>
          </div>
          <WindowContent>
            <div style={{ display: "flex" }}>
              <div style={{ width: '340px', height: "600px" }}>
                <GroupBox label='Projects Folder'>
                  <ScrollView style={{ height: '560px' }}>
                    <TreeView tree={maxWidthText(content)} expanded={['projects']} />
                  </ScrollView>
                </GroupBox>
              </div>
              <div style={{ width: '20px' }} />
              <div style={{ width: '800px' }}>
                <MenuList fullWidth>
                  <ScrollView style={{ height: '590px' }}>
                  {content.map((item) => {
                    return (
                      <MenuListItem onDoubleClick={() => handleOpenNotepad(item)} size='sm'>📄 {item}.txt</MenuListItem>
                    )
                  })}
                  </ScrollView>
                </MenuList>
              </div>
            </div>
          </WindowContent>
        </Window>
      </Wrapper>
    </div>
  );
}

function maxWidthText(content) {
  let tmp = [
      {
        id: 'projects',
        label: 'Projects',
        icon: <>📁</>,
        items: []
      }
  ]

  content.forEach((element, idx) => {
    if (element.length > 25) {
      tmp[0].items.push({ id: idx, label: element.slice(0, 25) + "...", icon: <>📄</> },)
    } else {
      tmp[0].items.push({ id: idx, label: element+'.txt', icon: <>📄</> },)
    }    
  });

  return tmp;
}
