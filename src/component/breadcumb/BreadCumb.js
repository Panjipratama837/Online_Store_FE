import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

const BreadCrumb = () => {
    const location = useLocation();
    const { pathname } = location;

    const keyMenu = JSON.parse(window.localStorage.getItem('keyNavv'));
    console.log("keyMenu : ", keyMenu);

    // const pathnames = pathname.split("/").filter((item) => item);

    // if in pathname is admin, then remove admin
    const pathnames = pathname.split("/").filter((item) => item !== "admin");
    pathnames.shift();
    console.log("pathname : ", pathnames);

    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
        <div>
            <Breadcrumb>
                {pathnames.length > 0 ? (
                    <Breadcrumb.Item>
                        <Link to="/admin">Home</Link>
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                )}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Breadcrumb.Item key={index}>{capatilize(name)}</Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item key={index}>
                            <Link to={`${routeTo}`}>{capatilize(name)}</Link>
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
        </div >
    );
};

export default BreadCrumb;