import Nav from "./Nav";
import Footer from "./Footer";

const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
};

const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    margin: "26px 0px"
};

const Layout = props => (
    <div className="Layout" style={layoutStyle}>
        <Nav />
        <div className="Content" style={contentStyle}>
            {props.children}
        </div>
        <Footer />
    </div>
);

export default Layout;