import { Link } from "react-router-dom";
import "./Sidebar.css";

const CashierSideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to="/">
          <img src="jldlogo.png" alt="JLD Ventures" />
        </Link>
      </div>

      <nav className="navbar">
        <div className="container-fluid">
          <ul className="navbar-nav sidebar-menu">
            {/* Transaction Menu */}
            <li>
              <a
                className="nav-link  transaction-nav"
                href="#transaction"
                role="button"
                data-bs-toggle="collapse"
                data-bs-target="#transactionMenu"
                aria-expanded="false"
              >
                Transaction <span className="dropdown-arrow">&gt;</span>
              </a>

              {/* Task Menu */}
              <div className="collapse" id="transactionMenu">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="dropdown-item" href="#tasks">
                      Incoming
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item" href="#status">
                      Approved
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="dropdown-item" href="#suspended">
                      Suspended
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <img
            src="profile_pix.svg"
            alt="Profile Pix"
            className="profile-img"
          />
          <div className="profile-details">
            <p className="profile-name">Ayo Dare</p>
            <p className="profile-email">ayo@jld.com</p>
          </div>
        </div>
        <div className="sidebar-signout">
          <Link to="/">
            <a href="#signout" className="signout-link">
              Sign out <i className="fas fa-sign-out-alt"></i>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CashierSideBar;
