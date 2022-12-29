import {
    Button,
    Checkbox,
    Col,
    Form,
    Input as InputAntd,
    InputNumber,
    Row,
    Select as SelectAntd,
} from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useEffect } from "react";
// import useGetApprovalLevel from "../hooks/useGetApprovalLevel";

const TableAppMatrix = ({ form, childToParent }) => {
    // const [approvalLevelOption] = useGetApprovalLevel();
    const approvalLevelOption = [
        {
            value: "ANY",
            label: "Any Lavel"
        },
        {
            value: "1",
            label: "Approval Lavel 1"
        },
        {
            value: "2",
            label: "Approval  Lavel 2"
        },
        {
            value: "3",
            label: "Approval  Lavel 3"
        },
        {
            value: "4",
            label: "Approval  Lavel 4"
        },
        {
            value: "5",
            label: "Approval  Lavel 5"
        },
    ]
    console.log("approvalLevelOption : ", approvalLevelOption);
    const totalApprovalLevel = approvalLevelOption && approvalLevelOption.length
    console.log("totalApprovalLevel : ", totalApprovalLevel);
    const validator = Form.useWatch('approvalList', form);
    const options = [
        {
            value: "1",
            label: "SATU",
        },
        {
            value: "2",
            label: "DUA",
        },
    ];

    const UserGroupOptions = [
        {
            value: "ANY",
            label: "Any Group",
        },
        {
            value: "INTRA",
            label: "Intra Group",
        },
        {
            value: "CROSS",
            label: "Cross Group",
        },
        {
            value: "SPECIFIC",
            label: "Specific Group",
        },
    ];




    useEffect(() => {
        form.setFieldsValue({
            approvalList: [{
                rangeLimitApproval: "0.00",
                noOfApproval: 1,
                sequential: false,
                // approvalLevel: "ANY",
                // userGroupOption: "ANY",
            }],
        });

    }, []);

    const filterUndefined = validator && validator.filter((item) => item !== undefined)
    const noOfApproval = validator && validator[0]?.noOfApproval

    console.log("noOfApproval", noOfApproval);

    console.log("filterUndefined : ", filterUndefined);

    const totalNoUser = filterUndefined && filterUndefined.map((item) => item.noOfUser).reduce((a, b) => a + b)


    console.log('totalNoUser : ', totalNoUser);

    const dataToParent = {
        noOfApproval: noOfApproval,
        totalNoUser: totalNoUser,
    }

    console.log("sequential : ", validator && !validator[0]?.sequential);

    useEffect(() => {
        console.log("Validator : ", validator);
        childToParent(dataToParent)
    }, [validator]);

    const headerTitle = [
        {
            key: "limitApproval",
            label: "limitApproval",
            minWidth: 200,
            width: '12%'
        },
        {
            key: "sequential",
            label: "sequential",
            minWidth: 80,
            width: '4.81%'
        },
        {
            key: "noOfApproval",
            label: "noOfApproval",
            minWidth: 100,
            width: '6%'
        },
        {
            key: "sequence",
            label: "sequence",
            minWidth: 100,
            width: '6%'
        },
        {
            key: "userNumber",
            label: "userNumber",
            minWidth: 100,
            width: '6%'
        },
        {
            key: "approvalLevel",
            label: "approvalLevel",
            minWidth: 212,
            width: '12.7%'
        },
        {
            key: "userGroupOption",
            label: "userGroupOption",
            minWidth: 200,
            width: '12%'
        },
        {
            key: "targetUserGroup",
            label: "targetUserGroup",
            minWidth: 200,
            width: '12%'
        },
        {
            key: "targetUser",
            label: "targetUser",
            minWidth: 200,
            width: '12%'
        },
        {
            key: "action",
            label: "Action",
            minWidth: 80,
            width: '4.81%'
        },
    ];

    return (
        <>
            <Form.List name="approvalList">
                {(fields, { add, remove }) => (
                    <>
                        {console.log("fields : ", fields)}
                        <Row style={{ marginBottom: "2rem" }} className="table-app-matrix">
                            <Col
                                className="container-table-applist"
                                span={24}
                                style={{ overflow: "auto" }}
                            >
                                <table className="table-app-listing-input">
                                    <thead>
                                        <tr className="thead-app-listing">
                                            {headerTitle.map((item, idx) => (
                                                <th key={idx} style={{ width: item.width, minWidth: item.minWidth }}>
                                                    {item.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fields.map((field, index) => (
                                            <tr
                                                key={field.name}
                                                className={
                                                    index % 2 === 0 ? "table-row-light" : "table-row-dark"
                                                }
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "key"]}
                                                    initialValue={field.name}
                                                    rules={[
                                                        {
                                                            required: true,
                                                        }]}
                                                >

                                                </Form.Item>
                                                <td>
                                                    {field.name === 0 && (
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "rangeLimitApproval"]}
                                                            initialValue="0.00"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    )}
                                                </td>
                                                <td>
                                                    {field.name === 0 && (
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "sequential"]}
                                                            noStyle
                                                            valuePropName="checked"
                                                        // initialValue={false}
                                                        >
                                                            <Checkbox disabled={fields.length > 1 ? true : false} name={'sequential'} />
                                                        </Form.Item>
                                                    )}
                                                </td>
                                                <td>
                                                    {field.name === 0 && (
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, "noOfApproval"]}
                                                            initialValue={1}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please input No. of Approval'
                                                                }

                                                            ]}
                                                        >
                                                            <InputNumber className={totalNoUser !== noOfApproval ? "error-field" : ""} min={1} max={10} />
                                                        </Form.Item>
                                                    )}
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, "sequence"]}
                                                        initialValue={`#${field.name + 1}`}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input No. of Approval'
                                                            }

                                                        ]}
                                                    >
                                                        {`#${field.name + 1}`}
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, "noOfUser"]}
                                                        initialValue={1}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Test err"
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber className={totalNoUser !== noOfApproval ? "error-field" : ""} min={1} max={noOfApproval} onChange={(value) => console.log("value", value)} />
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        {...field}
                                                        name={[field.name, "approvalLevel"]}
                                                        initialValue={
                                                            {
                                                                value: "ANY",
                                                                label: "Any Level"
                                                            }
                                                        }
                                                        rules={[
                                                            {
                                                                required: true,
                                                            }]}
                                                    >
                                                        <Select
                                                            placeholder="Level"
                                                        >
                                                            {approvalLevelOption?.map((item, index) => (
                                                                <Select.Option
                                                                    key={index + 1}
                                                                    value={item.value}
                                                                >
                                                                    {item.label}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <Form.Item
                                                        {...field}
                                                        shouldUpdate
                                                        name={[field.name, "userGroupOption"]}
                                                        initialValue={
                                                            {
                                                                value: "ANY",
                                                                label: "Any Group"
                                                            }
                                                        }
                                                        rules={[
                                                            {
                                                                required: true,
                                                            }]}
                                                    >
                                                        <Select
                                                            placeholder={"Select User Group Option"}
                                                        >
                                                            {UserGroupOptions?.map((item, index) => (
                                                                <Select.Option
                                                                    key={index + 1}
                                                                    value={JSON.stringify(item)}
                                                                >
                                                                    {item.label}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </td>
                                                <td>
                                                    <DeleteOutlined
                                                        onClick={() => index !== 0 && remove(field.name)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Col>
                        </Row>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                            <Button
                                type="primary"
                                disabled={(validator && !validator[0]?.noOfApproval || validator && validator.length >= totalApprovalLevel || validator && totalNoUser >= validator[0]?.noOfApproval) ? true : false}
                                onClick={() => {
                                    add()
                                    console.log("ADD DONE");
                                }}
                            >
                                Add
                            </Button>


                            <Button
                                type="primary"
                                onClick={() => {
                                    form.resetFields()
                                    // validator.pop()

                                    console.log("MAPPING : ", fields.map((item) => {
                                        return item?.name
                                    }));
                                    const mappingFields = fields.map((item) => {
                                        return item?.name
                                    })

                                    const filterFields = mappingFields.filter((item) => item !== 0)

                                    console.log("Array Maps", mappingFields);
                                    console.log("filterFields", filterFields);
                                    filterFields.reverse().forEach((item) => {
                                        console.log(`NO : ${item}`);
                                        remove(item)
                                    })
                                    console.log("RESET DONE");
                                }}
                            >
                                Reset
                            </Button>


                        </div>
                    </>
                )}
            </Form.List>
        </>
    );
};
export default TableAppMatrix;

const Input = styled(InputAntd)`
  border-radius: 4px;
  height: 40px;
`;
const Select = styled(SelectAntd)`
  & .ant-select-selector {
    height: 40px !important;
    border-radius: 4px !important;
  }
  width: 100%;

  & .ant-select-selection-placeholder {
    align-self: center !important;
  }
  & .ant-select-selection-item {
    align-self: center !important;
  }
`;
