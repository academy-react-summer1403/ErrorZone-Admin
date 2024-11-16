// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { Lock, User, Users } from "react-feather";


const NewsTabs = ({
  active,
  toggleTab,

}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">کاربر ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Users className="font-medium-3 me-50" />
            <span className="fw-bold">گروه ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>

      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
        </TabPane>

        <TabPane tabId="2">
        </TabPane>

        <TabPane tabId="3">
        </TabPane>

      </TabContent>
    </Fragment>
  );
};
export default NewsTabs;
