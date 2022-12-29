import React, { useState } from 'react'
import { Table, Button, Select, } from 'antd';
import styled from 'styled-components';

const CustomTable = styled(Table)`
  .indent-level-1 {
    padding-left : 0 !important
  }
`;

const Dashboard = () => {

    const [data, setData] = useState([
        {
            key: 1,
            name: 'John Brown sr.',
            parent: "1",
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [
                {
                    key: 11,
                    // name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    key: 12,
                    // name: 'John Brown jr.',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                },
                {
                    key: 13,
                    // name: 'Jim Green sr.',
                    age: 72,
                    address: 'London No. 1 Lake Park',
                },
            ],
        },

        {
            key: 2,
            parent: "2",
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },

        {
            key: 3,
            parent: "3",
            name: 'Panji',
            age: 50,
            address: 'Kopti',
            children: [
                {
                    key: 34,
                    // name: 'Dimas',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    key: 35,
                    // name: 'Asep',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                },
                {
                    key: 36,
                    // name: 'Rizal',
                    age: 72,
                    address: 'London No. 1 Lake Park',
                },
            ],
        },
    ])

    console.log("Data : ", data);

    const handleDelete = (key) => {
        let _data = [...data]
        key.forEach((element) => {
            _data = _data.filter((item) => item.key !== element)
        });

        setData(_data)

        // setData(data.filter((item) => item.key !== key));
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        // {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     render: (text, record) => (
        //         record.parent ? <Button onClick={() => handleDelete(record.key)}>Delete</Button> : null
        //     ),
        // },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    console.log("selectedRowKeys : ", selectedRowKeys);

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };



    // Data Select Component
    const [userGroupOptions, setUserGroupOptions] = useState([
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
    ])

    console.log("userGroupOptions : ", userGroupOptions);

    const handleSelect = (value) => {
        const v_select = JSON.parse(value)
        console.log("Value Select : ", v_select);


        // let _select = [...UserGroupOptions]

        setUserGroupOptions(userGroupOptions.filter((item) => item.value !== v_select.value))

    }

    // Practice 

    function checkDuplicate(array) {
        return array.some((elem, i, arr) => {
            return arr.slice(i + 1).some(otherElem => elem.approvalLevel === otherElem.approvalLevel);
        });
    }





    const validator = [
        {
            approvalLevel: "ANY"
        },
        {
            approvalLevel: "Level 1"
        },
        {
            approvalLevel: "Level 2"
        },
        {
            approvalLevel: "Level 3"
        },
        {
            approvalLevel: "Level 5"
        },
        {
            approvalLevel: "Level 5"
        }
    ]

    const dataToTable = [
        {
            key: 34,
            name: 'Dimas',
            age: 42,
            address: 'New York No. 2 Lake Park',
        },
        {
            key: 35,
            // name: 'Asep',
            age: 30,
            address: 'New York No. 3 Lake Park',
        },
        {
            key: 36,
            // name: 'Rizal',
            age: 72,
            address: 'London No. 1 Lake Park',
        },
    ]

    const dataToTable2 = [
        {
            key: 3,
            name: 'Dimas',
            age: 42,
            address: 'New York No. 2 Lake Park',
        },
    ]

    console.log("checkDuplicate : ", checkDuplicate(validator));

    const filterParent = dataToTable.find((item, i) => i === 0)
    console.log("filterParent : ", filterParent);

    const filterChildren = dataToTable.filter((item, i) => i !== 0)
    console.log("filterChildren : ", filterChildren);

    const newValidator = [{ ...filterParent, children: [...filterChildren] }, ...dataToTable2]
    console.log("newValidator : ", newValidator);


    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={{
                    ...rowSelection,
                    checkStrictly: false,
                    getCheckboxProps: record => ({
                        style: {
                            display: record.name === undefined ? 'none' : '',
                        },
                        name: record.name,
                    }),
                }}
                defaultExpandAllRows={true}
                expandable={{
                    expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                            null
                        ) : (
                            null
                        )
                }}
            />
            <Button onClick={() => handleDelete(selectedRowKeys)}>
                Delete Selected
            </Button>

            <hr />

            <Select
                placeholder={"Select User Group Option"}
                onChange={handleSelect}
            >
                {userGroupOptions?.map((item, index) => (
                    <Select.Option
                        key={index + 1}
                        value={JSON.stringify(item)}
                    >
                        {item.label}
                    </Select.Option>
                ))}
            </Select>

            <Select
                placeholder={"Select User Group Option"}
                onChange={handleSelect}
            >
                {userGroupOptions?.map((item, index) => (
                    <Select.Option
                        key={index + 1}
                        value={JSON.stringify(item)}
                    >
                        {item.label}
                    </Select.Option>
                ))}
            </Select>

            <Select
                placeholder={"Select User Group Option"}
                onChange={handleSelect}
            >
                {userGroupOptions?.map((item, index) => (
                    <Select.Option
                        key={index + 1}
                        value={JSON.stringify(item)}
                    >
                        {item.label}
                    </Select.Option>
                ))}
            </Select>

            <Select
                placeholder={"Select User Group Option"}
                onChange={handleSelect}
            >
                {userGroupOptions?.map((item, index) => (
                    <Select.Option
                        key={index + 1}
                        value={JSON.stringify(item)}
                    >
                        {item.label}
                    </Select.Option>
                ))}
            </Select>
        </>
    )
}

export default Dashboard