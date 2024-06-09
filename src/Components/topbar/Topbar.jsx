import Search from "@mui/icons-material/Search";
import Person from "@mui/icons-material/Person";
import Chat from "@mui/icons-material/Chat";
import Notifications from "@mui/icons-material/Notifications";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Handy</span>
        <span className="logo1">Fix</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Busca negocios o personas"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Inicio</span>
          <span className="topbarLink">Historial</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="images/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
}
