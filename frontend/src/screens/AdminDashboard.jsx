import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap'
import axios from 'axios'

function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [purchases, setPurchases] = useState([])
  const token = localStorage.getItem('authToken')

  const fetchData = () => {
    if (!token) return
    setLoading(true)

    const headers = { Authorization: `Token ${token}` }

    Promise.all([
      axios.get('http://127.0.0.1:8000/api/admin/stats/', { headers }),
      axios.get('http://127.0.0.1:8000/api/admin/purchases/', { headers })
    ])
      .then(([statsRes, purchasesRes]) => {
        setStats(statsRes.data)
        setPurchases(purchasesRes.data)
      })
      .catch(err => {
        console.error('Admin fetch error', err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [token])

  if (!token) {
    return (
      <Container className="py-5 text-center">
        <h3>Admin Dashboard</h3>
        <p className="text-muted">You must be logged in as a superuser to view this page.</p>
      </Container>
    )
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2 className="mb-0">Admin Dashboard</h2>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : (
        <>
          <Row className="g-3 mb-3">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text style={{fontSize: '1.5rem'}}>{stats?.total_orders ?? 0}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Revenue</Card.Title>
                  <Card.Text style={{fontSize: '1.5rem'}}>
                    ${purchases && purchases.length > 0
                      ? purchases.reduce((sum, p) => {
                          const price = Number(p.price);
                          return sum + (isNaN(price) ? 0 : price);
                        }, 0).toFixed(2)
                      : '0.00'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Order Statuses</Card.Title>
                  <div>
                    {(() => {
                      const merged = {};
                      Object.entries(stats?.by_status || {}).forEach(([status, count]) => {
                        const key = (status || '').trim().toLowerCase();
                        if (!key) return;
                        merged[key] = (merged[key] || 0) + (count || 0);
                      });
                      return Object.entries(merged).map(([status, count]) => (
                        <div key={status} style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <span style={{textTransform: 'capitalize', fontWeight: 500, minWidth: '100px'}}>{status.charAt(0).toUpperCase() + status.slice(1)}:</span>
                          <span style={{backgroundColor: '#6c757d', color: '#ffffff', padding: '6px 14px', borderRadius: '4px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center', display: 'inline-block'}}>{count || 0}</span>
                        </div>
                      ));
                    })()}
                    {Object.entries(stats?.by_status || {}).length === 0 && (
                      <p className="text-muted">No orders yet</p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mb-3">
            <Card.Header>Recent Purchases</Card.Header>
            <Card.Body className="p-0">
              <Table striped hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Txn ID</th>
                    <th>User</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>When</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-3">No purchases yet</td></tr>
                  ) : purchases.map(p => (
                    <tr key={p.id || p.transaction_id}>
                      <td style={{minWidth:160}}>{p.transaction_id || p.id}</td>
                      <td>{p.user?.username || (p.user && p.user.username) || '—'}</td>
                      <td>{p.product_name}</td>
                      <td>{p.quantity}</td>
                      <td>${Number(p.price).toFixed(2)}</td>
                      <td>{p.status}</td>
                      <td>{new Date(p.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  )
}

export default AdminDashboard
