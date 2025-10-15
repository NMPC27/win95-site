import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  TextInput,
  Toolbar
} from 'react95';


export default function FootBar(props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer); 
  }, []);

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.toLocaleDateString("en-GB");

  return (
    <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
    }}>
        <AppBar style={{ position: 'relative'}}>
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                <Button
                    onClick={() => setOpen(!open)}
                    active={open}
                    style={{ fontWeight: 'bold' }}
                >
                    <img
                    src={"./img/logo.png"}
                    alt='react95 logo'
                    style={{ height: '20px', marginRight: 4 }}
                    />
                    Start
                </Button>
                {open && (
                    <MenuList
                    style={{
                        position: 'absolute',
                        left: '0',
                        bottom: '100%'
                    }}
                    onClick={() => setOpen(false)}
                    >
                    <MenuListItem onClick={() => props.handleOpenAbout()}>
                        <span role='img'>
                        👨‍💻
                        </span>
                        {" "}Nuno Cunha
                    </MenuListItem>
                    <MenuListItem onClick={() => window.open("./files/Resume.pdf", '_blank')}>
                        <span role='img'>
                        📄
                        </span>
                        Curriculum
                    </MenuListItem>
                    <MenuListItem onClick={() => props.handleOpenFolder()}>
                        <span role='img'>
                        📁
                        </span>
                        Projects
                    </MenuListItem>
                    <Separator />
                    <MenuListItem onClick={() => window.location.href = "https://nmpc27.github.io/"}>
                        <span role='img'>
                        🔙
                        </span>
                        Logout
                    </MenuListItem>
                    </MenuList>
                )}
                </div>

                <div>
                    <div>{time}{" "}{formattedDate}</div>
                </div>
            </Toolbar>
        </AppBar>
    </div>
  );
}