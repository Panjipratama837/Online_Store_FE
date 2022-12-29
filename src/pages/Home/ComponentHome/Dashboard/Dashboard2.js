import React, { useState } from 'react'
import { Table, Button, Select, Row, Form, Col, Tag, } from 'antd';
import styled from 'styled-components';

import TableAppMatrix from './TableAppMatrix';

const CustomTable = styled(Table)`
  .indent-level-1 {
    padding-left : 0 !important
  }
`;

const Dashboard = () => {
    const [form] = Form.useForm();

    const [dataAppMatrix, setDataAppMatrix] = useState({});

    const childToParent = (childdata) => {
        setDataAppMatrix(childdata);
    }


    const [data, setData] = useState([])

    const [data2, setData2] = useState([
        {
            key: 1,
            sequence: 'John Brown sr.',
            sequential: false,
            rangeLimitApproval: "60",
            noOfUser: 3,
            noOfApproval: 3,
            approvalLevel: "Any",
            userGroupOption: "Any",
            children: [
                {
                    key: 2,
                    sequence: 'John Brown sr.',
                    noOfUser: 3,
                    noOfApproval: 3,
                    approvalLevel: "Any",
                    userGroupOption: "Any",
                },
                {
                    key: 3,
                    sequence: 'John Brown sr.',
                    noOfUser: 3,
                    noOfApproval: 3,
                    approvalLevel: "Any",
                    userGroupOption: "Any",
                },
                {
                    key: 4,
                    sequence: 'John Brown sr.',
                    noOfUser: 3,
                    noOfApproval: 3,
                    approvalLevel: "Any",
                    userGroupOption: "Any",
                },
            ],
        },

        // {
        //     key: 2,
        //     parent: "2",
        //     name: 'Joe Black',
        //     age: 32,
        //     address: 'Sidney No. 1 Lake Park',
        // },
    ])

    console.log("Data : ", data);
    console.log("Dua Data : ", data2);

    const handleDelete = (key) => {
        let _data = [...data]
        key.forEach((element) => {
            _data = _data.filter((item) => item.key !== element)
        });

        setData(_data)

        // setData(data.filter((item) => item.key !== key));
    };

    const approvalListingColumn = [
        {
            title: "typeTransaction",
            dataIndex: 'transactionType',
            key: 'transactionType',
            render: (text) => (
                text ? text === "TRANSACTIONAL" ? "Yes" : "No" : ''
            ),
        },
        {
            title: "limitApproval",
            dataIndex: 'rangeLimitApproval',
            key: 'rangeLimitApproval',
            render: (text) => (
                <div>
                    {text}
                </div>
            ),
        },
        {
            title: "sequential",
            dataIndex: 'sequential',
            key: 'sequential',
            render: (text) => (
                text !== undefined ? text ? "yes" : "no" : "no"
            ),
        },
        {
            title: "NumberOfApproval",
            dataIndex: 'noOfApproval',
            key: 'noOfApproval',
        },
        {
            title: "sequence",
            key: 'sequence',
            render: (text, record, idx) => (
                `#${idx + 1}`
            ),
        },
        {
            title: "userNumber",
            key: 'noOfUser',
            dataIndex: 'noOfUser',
        },
        {
            title: "approvalLevel",
            dataIndex: 'approvalLevel',
            key: 'approvalLevelName',
            render: (text) => {
                return text?.approvalLevelName ?? 'ANY'
            }
        },
        {
            title: "userGroupOption",
            dataIndex: 'userGroupOption',
            key: 'userGroupOption',
            render: (text) => {
                return text?.label
            }
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    console.log("selectedRowKeys : ", selectedRowKeys);

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };



    // Data Select Component
    const userGroupOptions = [
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
    ]

    const onFinish = (e) => {
        console.log("e target : ", e);


        let array = e.approvalList;
        array[0]['transactionType'] = e?.transactionType
        console.log('cek result', array)
        array.map((item) => {
            if (typeof item.approvalLevel == 'string') {
                item.approvalLevel = JSON.parse(item.approvalLevel)
            }
            if (typeof item.userGroupOption == 'string') {
                item.userGroupOption = JSON.parse(item.userGroupOption)
            }
            // item.userGroupOption = JSON.parse(item.userGroupOption)
        })

        let tempAppListing = array
        console.log("tempAppListing : ", tempAppListing);

        const filterParent = tempAppListing.find((item, i) => i === 0)
        console.log("filterParent : ", filterParent);

        const filterChildren = tempAppListing.filter((item, i) => i !== 0)
        console.log("filterChildren : ", filterChildren);

        tempAppListing = [{ ...filterParent, children: [...filterChildren] }]
        console.log("newValidator : ", tempAppListing);


        setData([...data, ...tempAppListing])


        // console.log('array', tempAppListing)
        // let tempNewApprovalListing = {
        //     transactionType: e.transactionType,
        //     limitApproval1: 0,
        //     limitApproval2: e.rangeLimitApproval?.replace(/[^\d]/g, ''),
        //     approvalNumber: Number(e.approvalNumber),
        //     approvalLevel: userInputApprovalListing.approvalLevelName,
        //     userGroupOption: e.userGroupOption,
        //     targetUserGroup: e.targetUserGroup,
        //     targetUser: e.targetUser
        // }

        // setApprovalListing([...approvalListing, ...tempAppListing])

    }

    const onFinishFailed = (e) => {
        console.log('hehehe error', e)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    return (
        <>
            <Form form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed}
                validateMessages={{ required: ' ' }}>

                <Row>
                    {/* Table Approval Matrix */}
                    <TableAppMatrix form={form} childToParent={childToParent} />
                </Row>

                <Row justify={'center'} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                    <Button type="primary" htmlType={'submit'} >
                        Add To List
                    </Button>
                </Row>
            </Form>
            <Table
                columns={approvalListingColumn}
                dataSource={data}
                rowSelection={{
                    ...rowSelection,
                    checkStrictly: false,
                    getCheckboxProps: record => ({
                        style: {
                            display: record.rangeLimitApproval === undefined ? 'none' : '',
                        },
                        rangeLimitApproval: record.rangeLimitApproval,
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
            <Button type='primary' onClick={() => handleDelete(selectedRowKeys)}>
                Delete Selected
            </Button>

            <Button type='primary' onClick={() => setData(data2)}>
                Add to table
            </Button>

            <hr />
        </>
    )
}

export default Dashboard