import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import TwoFactorSetup from '../components/TwoFactorSetup';
import { useNavigate } from 'react-router-dom';

const SecurityScreen = () => {
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTwoFaModal, setShowTwoFaModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchSecurityInfo();
  }, [navigate]);

  const fetchSecurityInfo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8000/api/profile/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      
      setTwoFaEnabled(response.data.two_fa_enabled);
    } catch (error) {
      console.error('Error fetching security info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (window.confirm('Are you sure you want to disable Two-Factor Authentication? This will make your account less secure.')) {
      try {
        const token = localStorage.getItem('authToken');
        await axios.post(
          'http://localhost:8000/api/2fa/disable/',
          {},
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        );
        
        setTwoFaEnabled(false);
        setAlert({
          type: 'success',
          message: 'Two-Factor Authentication has been disabled'
        });
      } catch (error) {
        setAlert({
          type: 'danger',
          message: 'Failed to disable Two-Factor Authentication'
        });
      }
    }
  };

  if (loading) {
    return (
      <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Spinner animation='border' />
      </Container>
    );
  }

  return (
    <Container className='py-5'>
      <Row className='mb-4'>
        <Col>
          <h1 className='mb-4'>
            <i className='fas fa-shield-alt me-2 text-primary'></i>Security Settings
          </h1>
        </Col>
      </Row>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className='mb-4 shadow-sm'>
            <Card.Header className='bg-primary text-white'>
              <i className='fas fa-lock me-2'></i>Two-Factor Authentication (2FA)
            </Card.Header>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6 className='mb-2'>Google Authenticator</h6>
                    <p className='text-muted small mb-0'>
                      Add an extra layer of security to your account using Google Authenticator
                    </p>
                  </div>
                  <div className='ms-3'>
                    {twoFaEnabled ? (
                      <>
                        <span className='badge bg-success me-2'>Enabled</span>
                        <Button 
                          variant='danger' 
                          size='sm'
                          onClick={handleDisable2FA}
                        >
                          Disable
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className='badge bg-secondary me-2'>Disabled</span>
                        <Button 
                          variant='primary' 
                          size='sm'
                          onClick={() => setShowTwoFaModal(true)}
                        >
                          Enable
                        </Button>
                      </>
                    )}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className='shadow-sm'>
            <Card.Header className='bg-info text-white'>
              <i className='fas fa-info-circle me-2'></i>What is 2FA?
            </Card.Header>
            <Card.Body>
              <p>
                Two-Factor Authentication (2FA) adds an extra layer of security to your account. 
                When 2FA is enabled, you'll need to enter a code from the Google Authenticator app 
                in addition to your password when logging in.
              </p>
              <h6 className='mt-4 mb-3'>How it works:</h6>
              <ol>
                <li>Download Google Authenticator on your phone</li>
                <li>Enable 2FA in your security settings</li>
                <li>Scan the QR code with the app</li>
                <li>When logging in, enter the 6-digit code from the app</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <TwoFactorSetup 
        show={showTwoFaModal}
        onHide={() => setShowTwoFaModal(false)}
        onSuccess={() => {
          setTwoFaEnabled(true);
          setAlert({
            type: 'success',
            message: 'Two-Factor Authentication enabled successfully!'
          });
        }}
      />
    </Container>
  );
};

export default SecurityScreen;
