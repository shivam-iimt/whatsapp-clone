import React from 'react'
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import img from './imgs/profile.jpeg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar,IconButton} from '@material-ui/core';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className='sidebar'>
      
            <div className="sidebar_header">
                <Avatar src={img}/>
                <div className="sidebar_headerright">
                    <IconButton>
                    <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                    <ChatIcon/>
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon/>
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchcontainer">
                    <SearchIcon/>
                    <input type="text" placeholder='Search or start new chat' />

                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
         
            </div>

        </div>
    )
}

export default Sidebar;
