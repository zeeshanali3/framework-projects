import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArchiveIcon from "@mui/icons-material/Archive";
import RestoreIcon from "@mui/icons-material/Restore";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LabelIcon from "@mui/icons-material/Label";
import StarIcon from "@mui/icons-material/Star";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SortIcon from "@mui/icons-material/Sort";
import CommentIcon from "@mui/icons-material/Comment";
import DoneIcon from "@mui/icons-material/Done";
import HelpIcon from "@mui/icons-material/Help"; // Fallback

// Define a static mapping
const iconMap = {
  edit: EditIcon,
  delete: DeleteIcon,
  view: VisibilityIcon,
  save: SaveIcon,
  cancel: CancelIcon,
  duplicate: ContentCopyIcon,
  archive: ArchiveIcon,
  restore: RestoreIcon,
  download: DownloadIcon,
  upload: UploadIcon,
  approve: CheckCircleIcon,
  reject: CancelPresentationIcon,
  print: PrintIcon,
  share: ShareIcon,
  assign: AssignmentIndIcon,
  lock: LockIcon,
  unlock: LockOpenIcon,
  tag: LabelIcon,
  favorite: StarIcon,
  filter: FilterListIcon,
  refresh: RefreshIcon,
  settings: SettingsIcon,
  info: InfoIcon,
  expand: ExpandMoreIcon,
  collapse: ExpandLessIcon,
  select: CheckBoxIcon,
  deselect: CheckBoxOutlineBlankIcon,
  sort: SortIcon,
  comment: CommentIcon,
  resolve: DoneIcon,
  start: PlayArrowIcon,
  import: UploadIcon,
  export: DownloadIcon,
  pause: PauseIcon,
  // Fallback for unknown actions
  default: HelpIcon,
};

// /**
//  * Get the icon component for a given action name.
//  * @param {string} actionName - The name of the action.
//  * @returns {React.Component} - The corresponding icon component or a fallback.
//  */
export const getIconComponent = (actionName) => {
  return iconMap[actionName?.toLowerCase()] || HelpIcon; // Return fallback icon if action is not in the map
};

export default iconMap;
