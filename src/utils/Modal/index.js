import { Button, Modal } from "antd";

const App = (props) => {
    const { title, content, handleOk, handleCancel, icon } = props
    const [modal, contextHolder] = Modal.useModal();
    const config = {
        title,
        content: (
            <>
                {content}
            </>
        ),
        onOk: handleOk,
        onCancel: handleCancel,
    };
    return (
        <>
            <div
                onClick={() => {
                    modal.confirm(config);
                }}
            >

                {icon}
            </div>

            {contextHolder}
        </>
    );
};
export default App;