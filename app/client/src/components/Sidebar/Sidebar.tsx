import styles from "./Sidebar.module.css";
import * as React from "react";
import LibraryNavTree from "./LibraryNavTree";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useQuery} from "@tanstack/react-query";
import {ConnectorControllerApiFactory, ConnectorItem, FolderConnectors} from "../../api";
import NavTreeView, {NavTreeViewItem} from "./NavTreeView";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import {useLocation} from "react-router-dom";
import navLabels from "./NavLabels";
import {ConnectorType} from "../../interfaces/connectorType";
import SettingModal from "../SettingModal";
import {useCallback, useState} from "react";

const Sidebar = () => {
  const location = useLocation();

  function leadingHeader(leadingText) {
    return <div className={'folo-nav-title'}>
      <div className={'grow'}>
        {leadingText}
      </div>
      <div>
        <IconButton
          className="folo-icon-btn"
          onClick={() => {
            if (leadingText === 'CONNECT') {
              openConnectSettingModal();
            } else {
              openFeedsSettingModal();
            }
          }}>
          <AddIcon fontSize={"small"} className={"text-gray-500"}/>
        </IconButton>
      </div>
    </div>;
  }

  function folderConnectorsView(folderConnectorsArray: FolderConnectors[], isRss: boolean) {
    const treeItems = folderConnectorsToTreeItems(folderConnectorsArray, isRss);
    return <div className="folo-nav-card">
      <NavTreeView treeItems={treeItems} ariaLabel={isRss ? 'rss' : 'connectors'} defaultExpanded={[]}
                   selectedNodeId={location.pathname}/>
    </div>
  }


  function folderConnectorsToTreeItems(folderConnectorsArray: FolderConnectors[], isRss: boolean) {
    let treeItems: NavTreeViewItem[] = [];

    let allInboxCount = 0;
    folderConnectorsArray.forEach(folderConnectors => {
      const folderInBoxCount = sumInboxCount(folderConnectors.connectorItems);
      allInboxCount += folderInBoxCount;
      if (folderConnectors.id && folderConnectors.name) {
        const item: NavTreeViewItem = {
          linkTo: '/folder/' + folderConnectors.id,
          labelIcon: FolderOpenIcon,
          labelText: folderConnectors.name,
          inboxCount: folderInBoxCount,
          childItems: connectorToTreeItems(folderConnectors.connectorItems)
        }
        treeItems.push(item);
      } else {
        const partItems = connectorToTreeItems(folderConnectors.connectorItems);
        treeItems.push(...partItems);
      }
    })

    if (isRss) {
      const rssItems = [];
      rssItems.push({
        ...navLabels.allFeeds,
        inboxCount: allInboxCount
      }, ...treeItems);
      treeItems = rssItems;
    } else {
      const connectorItems = [];
      connectorItems.push({
        ...navLabels.twitter,
      }, ...treeItems);
      treeItems = connectorItems;
    }
    return treeItems;
  }

  function sumInboxCount(connectorItems: Array<ConnectorItem>) {
    return connectorItems.reduce((sum, cur) => sum + (cur.inboxCount || 0), 0);
  }

  function connectorToTreeItems(connectorItems: Array<ConnectorItem>): NavTreeViewItem[] {
    return connectorItems.map(connectorItem => {
      // const icon = connectorItem.type == 'rss' ? RssFeedIcon : LabelImportantIcon;
      const icon = connectorItem.type === ConnectorType.RSS ? RssFeedIcon : navLabels.github.labelIcon;
      return {
        labelText: connectorItem.name,
        labelIcon: icon,
        linkTo: "/connector/" + connectorItem.id,
        inboxCount: connectorItem.inboxCount,
        iconUrl: connectorItem.iconUrl
      }
    });
  }

  const {
    isLoading,
    error,
    data: view,
  } = useQuery(['folder-connector-view'], async () => (await
    ConnectorControllerApiFactory().getFolderConnectorViewUsingGET()).data, {
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [settingIndex, setSettingIndex] = useState(0);

  const openConnectSettingModal = useCallback(() => {
    setSettingIndex(2);
    setSettingModalOpen(true);
  }, []);

  const openFeedsSettingModal = useCallback(() => {
    setSettingIndex(3);
    setSettingModalOpen(true);
  }, []);

  const closeSettingModal = useCallback(() => {
    setSettingModalOpen(false);
  }, []);

  return (
    <div className={`${styles.sidebar} pb-14 space-y-4`}>
      <div className="folo-nav-section">
        <div className="folo-nav-card">
          <LibraryNavTree selectedNodeId={location.pathname}/>
        </div>
      </div>

      <div className="folo-nav-section">
        {leadingHeader('CONNECT')}
        {view && view.folderConnectors && folderConnectorsView(view.folderConnectors, false)}
      </div>

      <div className="folo-nav-section">
        {leadingHeader('FEEDS')}
        {view && view.folderConnectors && folderConnectorsView(view.folderFeedConnectors, true)}
      </div>

      {
        settingModalOpen &&
        <SettingModal open={settingModalOpen} onClose={closeSettingModal} defaultIndex={settingIndex}></SettingModal>
      }
    </div>
  );
};

export default Sidebar;
