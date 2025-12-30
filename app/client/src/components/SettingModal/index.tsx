import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal
} from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import HubIcon from '@mui/icons-material/Hub';
import {ConnectorSetting} from "./ConnectorSetting";
import {FeedsSetting} from "./FeedsSetting";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import FoldersSetting from "./FoldersSetting";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountSetting from "./AccountSetting";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import GeneralSetting from "./GeneralSetting";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArticleShortcutSetting from "./ArticleShortcutSetting";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {useFilterPanel} from "../../contexts/FilterPanelContext";

type SettingModalProps = {
  open: boolean,
  defaultIndex?: number,
  onClose: () => void,
}

export default function SettingModal(props: SettingModalProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(props.defaultIndex || 0);
  const {filterContent} = useFilterPanel();

  React.useEffect(() => {
    if (!filterContent) {
      setSelectedIndex(prev => {
        if (prev === 1) return 0;
        if (prev > 1) return prev - 1;
        return prev;
      });
    }
  }, [filterContent]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const style = {
    width: 1000,
    height: 660,
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
  };

  return (
    <Modal open={props.open} onClose={props.onClose} className={'flex justify-center items-center'}>
      <Box className={'flex scrollbar'} sx={style}>
        <svg width={0} height={0} style={{ position: 'absolute', visibility: 'hidden' }}>
          <linearGradient id="geminiGradientSettings" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="50%" stopColor="#a18cd1" />
            <stop offset="100%" stopColor="#fbc2eb" />
          </linearGradient>
        </svg>
        <div className={'w-[220px] h-full bg-[rgb(251,251,250)] sticky self-start top-0 left-0 shrink-0'}>
          <List component="nav" aria-label="setting items" className={''}>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <SettingsApplicationsIcon/>
              </ListItemIcon>
              <ListItemText primary="General"/>
            </ListItemButton>
            {filterContent && (
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <FilterAltIcon/>
                </ListItemIcon>
                <ListItemText primary="Filters"/>
              </ListItemButton>
            )}
            <ListItemButton
              selected={selectedIndex === (filterContent ? 2 : 1)}
              onClick={(event) => handleListItemClick(event, filterContent ? 2 : 1)}
            >
              <ListItemIcon>
                <AutoAwesomeIcon sx={{ fill: "url(#geminiGradientSettings)" }} />
              </ListItemIcon>
              <ListItemText primary="AI Shortcuts"/>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === (filterContent ? 3 : 2)}
              onClick={(event) => handleListItemClick(event, filterContent ? 3 : 2)}
            >
              <ListItemIcon>
                <HubIcon/>
              </ListItemIcon>
              <ListItemText primary="Connect"/>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === (filterContent ? 4 : 3)}
              onClick={(event) => handleListItemClick(event, filterContent ? 4 : 3)}
            >
              <ListItemIcon>
                <RssFeedIcon/>
              </ListItemIcon>
              <ListItemText primary="Feeds"/>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === (filterContent ? 5 : 4)}
              onClick={(event) => handleListItemClick(event, filterContent ? 5 : 4)}
            >
              <ListItemIcon>
                <FolderOpenIcon/>
              </ListItemIcon>
              <ListItemText primary="Folders"/>
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === (filterContent ? 6 : 5)}
              onClick={(event) => handleListItemClick(event, filterContent ? 6 : 5)}
            >
              <ListItemIcon>
                <AccountBoxIcon/>
              </ListItemIcon>
              <ListItemText primary="Account"/>
            </ListItemButton>
          </List>
        </div>

        <div className={'grow'}>
          <div className={'p-4'}>
            {selectedIndex === 0 && <GeneralSetting/>}
            {filterContent && selectedIndex === 1 && <div>{filterContent}</div>}
            {selectedIndex === (filterContent ? 2 : 1) && <ArticleShortcutSetting/>}
            {selectedIndex === (filterContent ? 3 : 2) && <ConnectorSetting/>}
            {selectedIndex === (filterContent ? 4 : 3) && <FeedsSetting/>}
            {selectedIndex === (filterContent ? 5 : 4) && <FoldersSetting/>}
            {selectedIndex === (filterContent ? 6 : 5) && <AccountSetting/>}
          </div>
        </div>
      </Box>
    </Modal>
  )
}
