import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {NavLink} from "react-router-dom";
import * as React from "react";
import TreeItem, {treeItemClasses, TreeItemProps} from "@mui/lab/TreeItem";
import {SvgIconProps} from "@mui/material/SvgIcon";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TreeView from "@mui/lab/TreeView";
import ConditionalWrapper from "../common/ConditionalWrapper";
import {NavLabel} from "./NavLabels";

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  iconColor?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  iconUrl?: string,
  labelInfo?: string;
  labelText: string;
  linkTo?: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
  color: theme.palette.text.primary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.primary,
    borderRadius: 12,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    marginBottom: theme.spacing(0.25),
    border: `1px solid transparent`,
    fontWeight: 600,
    transition: 'all 0.18s ease',
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: 'rgba(10, 132, 255, 0.06)',
      borderColor: 'rgba(10, 132, 255, 0.18)',
      transform: 'translateX(2px)',
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      background: 'linear-gradient(90deg, rgba(10,132,255,0.12), rgba(255,92,0,0.07))',
      borderColor: 'rgba(10, 132, 255, 0.28)',
      color: 'var(--tree-view-color)',
      fontWeight: theme.typography.fontWeightBold,
      boxShadow: '0 10px 30px -18px rgba(7, 18, 43, 0.4)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 600,
      color: 'inherit',
      paddingLeft: 0,
      letterSpacing: '0.01em'
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      marginRight: 0,
    },
    [`& .${treeItemClasses.root}`]: {
      paddingLeft: 0,
    },
  },

  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    iconColor,
    iconUrl,
    linkTo,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <ConditionalWrapper condition={linkTo}
                            wrapper={children => <NavLink to={linkTo}>{children}</NavLink>}>
          <Box sx={{display: 'flex', alignItems: 'center', p: 0.5, pr: 0, pl: 0}} className="folo-nav-item">

            {
              iconUrl && <Box component={'img'}
                              color={iconColor || 'inherit'} sx={{mr: 1, width: 28, height: 28}} src={iconUrl} className="folo-nav-item__icon"/>
            }
            {
              !iconUrl && <Box component={LabelIcon} color={iconColor || 'inherit'} sx={{mr: 1}} className="folo-nav-item__icon"/>
            }
            <Typography variant="body2" sx={{fontWeight: 'inherit', flexGrow: 1}}
                        className={'whitespace-nowrap overflow-hidden overflow-ellipsis folo-nav-item__label'}>
              {labelText}
            </Typography>
            {labelInfo && <Typography variant="caption" color="inherit" className={'leading-4 folo-nav-item__badge'}>
              {labelInfo}
            </Typography>}
          </Box>
        </ConditionalWrapper>
      }
      style={{
        '--tree-view-color': color || '#202124',
        '--tree-view-bg-color': bgColor || '#d3e3fd',
      }}
      {...other}
    />
  );
}

export interface NavTreeViewItem extends NavLabel {
  inboxCount?: number,
  childItems?: NavTreeViewItem[],
}

export default function NavTreeView({
                                      treeItems,
                                      ariaLabel,
                                      defaultExpanded,
                                      selectedNodeId
                                    }: { treeItems: NavTreeViewItem[], ariaLabel: string, defaultExpanded: string[], selectedNodeId: string }) {
  function itemView(item: NavTreeViewItem, parentNodeId: string, index: number) {
    const nodeId = item.linkTo || (parentNodeId ? parentNodeId + "_" + index.toString() : index.toString());
    return (<React.Fragment key={nodeId}>
      {
        <StyledTreeItem nodeId={nodeId} labelIcon={item.labelIcon} iconColor={item.iconColor} iconUrl={item.iconUrl}
                        labelText={item.labelText} labelInfo={item.inboxCount > 0 ? item.inboxCount.toString() : ""}
                        linkTo={item.linkTo}
        >
          {item.childItems && item.childItems.map((child, i) => itemView(child, nodeId, i))}
        </StyledTreeItem>
      }
    </React.Fragment>)
  }

  return (
    <TreeView
      aria-label={ariaLabel}
      defaultExpanded={defaultExpanded}
      defaultCollapseIcon={<ArrowDropDownIcon/>}
      defaultExpandIcon={<ArrowRightIcon/>}
      defaultEndIcon={<div style={{width: 24}}/>}
      selected={selectedNodeId}
      sx={{flexGrow: 1, overflowY: 'auto'}}
    >
      {
        treeItems.map((item, i) => itemView(item, "", i))
      }
    </TreeView>
  );
}
