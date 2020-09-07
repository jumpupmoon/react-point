import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import axios from 'axios';

export default function Point({history}) {
    const [pointList, setPointList] = useState([]);
    const [orderList, setOrderList] = useState([]);

    // 날짜 포맷 변경
    function formatDate(date) { 
        const d = new Date(date)
        const year = d.getFullYear(); 
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        
        if (month.length < 2) month = '0' + month; 
        if (day.length < 2) day = '0' + day; 
        
        return [year, month, day].join('-'); 
    }

    // 주문 상세보기
    const orderInfo = id => {
        history.push(`/order?id=${id}`);
    }

    useEffect(() => {
        // 액세스 토큰으로 유저 정보 확인, 없을 경우 로그인 화면으로 이동
        const access = localStorage.getItem('userAccessToken');
        axios.get(`/api/kakao/${access}`)
        .then(({data}) => {
            if(data.result == 0 || !data.kuser) return history.push('/login');
            else {
                // 유저 어드레스로 토큰 히스토리 가져오기
                axios.get(`/api/point/${data.kuser.address}`)
                .then(({data}) => {
                    if(data.result == 1) setPointList(data.pointList);
                    else console.log(data);
                })

                // 유저 어드레스로 주문 기록 가져오기
                axios.get(`/api/order/list/${data.kuser.address}`)
                .then(({data}) => {
                    if(data.result == 1) setOrderList(data.orderList);
                    else console.log(data);
                })
            }
        })
    }, [])

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    sm="4"
                    title="주문내역"
                    className="text-sm-left"
                />
            </Row>

            <Row>
                <Col lg="12" className="mb-4">
                    <Card small className="mb-4">
                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="border-0">주문 매장</th>
                                        <th scope="col" className="border-0">주문일</th>
                                        <th scope="col" className="border-0">구분</th>
                                        <th scope="col" className="border-0">포인트</th>
                                        <th scope="col" className="border-0">주문 총액</th>
                                        <th scope="col" className="border-0">주문 상세</th>
                                        <th scope="col" className="border-0">Tx</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orderList?.map((order) => {
                                    return (
                                        <tr key={order._id}>
                                            <td onClick={() => history.push(`/ordermenu?id=${order.store._id}`)}>{order.store.name}</td>
                                            <td>{formatDate(order.create)}</td>
                                            <td>{order.point >= 0 ? "적립" : "사용"}</td>
                                            <td>{order.point}KUN</td>
                                            <td>{order.total}원</td>
                                            <td>
                                                <Button theme="secondary" onClick={() => orderInfo(order._id)}>확인</Button>
                                            </td>
                                            <td>
                                                <a href={`https://baobab.scope.klaytn.com/tx/${order.txHash}`} target="_blank">
                                                    <Button theme="secondary">확인</Button>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}