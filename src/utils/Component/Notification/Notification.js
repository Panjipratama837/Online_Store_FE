import React, { useEffect } from 'react';
import { Button, notification, Space } from 'antd';
const Notification = (props) => {
    const { message } = props;
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, placement, message, description) => {
        api[type]({
            message,
            description,
            placement,
            duration: 2,
        });
    };

    useEffect(() => {
        openNotificationWithIcon('success', 'top', message)
    }, [])




    return (
        <>
            {contextHolder}
            {/* {openNotificationWithIcon('success', 'top', message, "Ini description")} */}

            {/* <Space>
                <Button onClick={() => openNotificationWithIcon('success', 'top')}>Success</Button>
            </Space> */}
        </>
    );
};
export default Notification;