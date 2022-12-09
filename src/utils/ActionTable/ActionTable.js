import { EditOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react'
import Styles from './ActionTable.module.scss'

const ActionTable = (props) => {
    const { onClick, arrayContent } = props;
    const [open, setOpen] = React.useState(false);
    // const hide = () => {
    //     setOpen(false);
    // };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const arrayProps = arrayContent;


    return (
        <Popover
            content={
                <>
                    {arrayProps.map((item, index) => {
                        return (
                            <p key={index} className={Styles.content_popover_p} onClick={onClick}>{item}</p>
                        )
                    })}
                </>
            }

            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <EditOutlined className={Styles.edit_action} />
        </Popover>
    )
}

export default ActionTable;