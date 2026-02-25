import React, { useEffect, useState, useMemo } from 'react'
import { Container, Card, Form, Row, Col, Badge } from 'react-bootstrap'
import './TransactionHistory.css'

function formatDate(dt) {
  if (!dt) return '—'
  try { return new Date(dt).toLocaleString() } catch (e) { return dt }
}

function formatPeso(amount) {
  const value = Number(amount)
  if (Number.isNaN(value)) return '—'
  return `₱${value.toFixed(value % 1 === 0 ? 0 : 2)}`
}

function resolveGameTitle(transaction) {
  const explicitGame = (transaction?.game || '').trim()
  if (explicitGame && explicitGame.toLowerCase() !== 'general') return explicitGame

  const sourceText = `${transaction?.name || ''} ${transaction?.notes || ''}`.toLowerCase()

  if (sourceText.includes('paimon') || sourceText.includes('primogem') || sourceText.includes('genshin')) return 'Genshin Impact'
  if (sourceText.includes('trailblazer') || sourceText.includes('oneiric') || sourceText.includes('honkai')) return 'Honkai: Star Rail'
  if (sourceText.includes('aurora epic skin') || sourceText.includes('diamond pass') || sourceText.includes('twilight pass') || sourceText.includes('ml skin') || sourceText.includes('diamonds')) return 'Mobile Legends: Bang Bang'
  if (sourceText.includes('wild core') || sourceText.includes('wild rift')) return 'League of Legends'
  if (sourceText.includes('call of duty') || sourceText.includes('codm') || sourceText.includes('cp') || sourceText.includes('shell')) return 'Call of Duty: Mobile'
  if (sourceText.includes('roblox') || sourceText.includes('robux')) return 'Roblox'
  if (sourceText.includes('mobile legends') || sourceText.includes('mlbb')) return 'Mobile Legends: Bang Bang'
  if (sourceText.includes('free fire')) return 'Free Fire'
  if (sourceText.includes('valorant')) return 'Valorant'
  if (sourceText.includes('league of legends') || sourceText.includes('lol')) return 'League of Legends'
  if (sourceText.includes('pubg')) return 'PUBG Mobile'

  return 'General'
}

function TransactionHistory() {
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('inventory') || '[]'))
  const [rangeFilter, setRangeFilter] = useState('all')

  useEffect(() => {
    const handler = () => setTransactions(JSON.parse(localStorage.getItem('inventory') || '[]'))
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  // If user is authenticated, fetch transactions from backend and merge with local state
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    fetch('http://127.0.0.1:8000/api/purchases/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) throw new Error(JSON.stringify(data))

        // Map backend purchase structure to frontend transaction shape, including game
        const mapped = data.map(p => ({
          id: p.transaction_id || p.id,
          name: p.product_name,
          quantity: p.quantity,
          price: p.price,
          status: p.status,
          date: p.created_at,
          game: p.game || ''
        }))
        
        // Merge backend purchases with local inventory, avoiding duplicates
        const existing = JSON.parse(localStorage.getItem('inventory') || '[]')
        const backendIds = new Set(mapped.map(p => p.id))
        const merged = [...mapped, ...existing.filter(p => !backendIds.has(p.id))]
        
        setTransactions(merged)
        // keep localStorage in sync for other components that read it
        localStorage.setItem('inventory', JSON.stringify(merged))
      })
      .catch(err => {
        console.warn('Failed to fetch purchases from API', err)
        // Fall back to local storage if fetch fails
      })
  }, [])

  const filtered = useMemo(() => {
    const now = new Date()
    const dayMs = 24 * 60 * 60 * 1000

    return transactions
      .filter(t => {
        if (rangeFilter === 'all') return true
        if (!t.date) return false

        const txDate = new Date(t.date)
        if (Number.isNaN(txDate.getTime())) return false

        const diffDays = (now.getTime() - txDate.getTime()) / dayMs
        if (rangeFilter === '7') return diffDays <= 7
        if (rangeFilter === '30') return diffDays <= 30
        if (rangeFilter === '90') return diffDays <= 90
        return true
      })
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  }, [transactions, rangeFilter])

  return (
    <Container className="transaction-history-wrap">
      <h2 className="transaction-history-title mb-3">Transaction history</h2>

      <div className="transaction-filter-card mb-3">
        <div className="transaction-filter-wrap">
          <Form.Select
            className="transaction-range-select"
            value={rangeFilter}
            onChange={e => setRangeFilter(e.target.value)}
          >
            <option value="all">All transactions</option>
            <option value="7">Past 7 days</option>
            <option value="30">Past 30 days</option>
            <option value="90">Past 90 days</option>
          </Form.Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-5 transaction-empty-card">
          <Card.Body>
            <Card.Title>No transactions found</Card.Title>
            <Card.Text className="text-muted">Your purchases will appear here. Make a purchase to generate a transaction record.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-3 transaction-grid">
          {filtered.map((t, index) => {
            const quantity = t.quantity || t.coins || 1
            const itemPurchased = t.name || (t.coins ? `${t.coins.toLocaleString()} Diamonds` : 'Item')
            const bonusText = t.bonus ? ` + ${t.bonus} Bonus` : ''
            const paymentStatus = t.status || 'Fulfilled'
            const orderId = t.order_id || t.id || '—'
            const transactionId = t.transaction_id || t.id || '—'
            const paymentMethod = t.payment_method || 'GCash'
            const gameTitle = resolveGameTitle(t)

            return (
              <Col key={`${t.id || index}-${t.date || ''}`} xs={12} md={6} lg={4}>
                <Card className="transaction-card h-100">
                  <Card.Body className="pb-2">
                    <h5 className="transaction-game-title mb-3">{gameTitle}</h5>

                    <div className="transaction-meta-row">
                      <span className="label">Order date</span>
                      <span className="value">{formatDate(t.date)}</span>
                    </div>

                    <div className="transaction-meta-row">
                      <span className="label">Payment status</span>
                      <span className="value">
                        <Badge pill bg="success">{paymentStatus}</Badge>
                      </span>
                    </div>

                    <div className="transaction-meta-row">
                      <span className="label">Order ID</span>
                      <span className="value">{orderId}</span>
                    </div>

                    <div className="transaction-meta-row">
                      <span className="label">Transaction ID</span>
                      <span className="value">{transactionId}</span>
                    </div>

                    <div className="transaction-meta-row">
                      <span className="label">Item purchased</span>
                      <span className="value">{`${quantity} ${itemPurchased}${bonusText}`}</span>
                    </div>

                    <div className="transaction-meta-row mb-3">
                      <span className="label">Payment method</span>
                      <span className="value">{paymentMethod}</span>
                    </div>

                    <div className="transaction-total-row">
                      <span className="label">Total payment</span>
                      <span className="amount">{formatPeso(t.price ?? 0)}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </Container>
  )
}

export default TransactionHistory
