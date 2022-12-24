import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import POS from '../components/POS/POS';

const PosPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'superAdmin') {
      window.location.href = '/transactions';
    }
  }, []);

  useEffect(() => {
    if (state && state?.salesman) {
      navigate('/');
    }
  }, []);

  return <POS />;
};

export default PosPage;
