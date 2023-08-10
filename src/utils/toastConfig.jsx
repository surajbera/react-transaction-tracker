import { FiXCircle, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const baseStyle = {
  borderRadius: '9px',
  color: '#000',
};

export const errorToast = {
  icon: <FiXCircle size={24} />,
  style: {
    ...baseStyle,
    background: '#fecaca',
  },
};

export const successToast = {
  icon: <FiCheckCircle size={24} />,
  style: {
    ...baseStyle,
    background: '#bbf7d0',
  },
};

export const warningToast = {
  icon: <FiAlertCircle size={24} />,
  style: {
    ...baseStyle,
    background: '#fed7aa',
  },
};

export const infoToast = {
  icon: <FiInfo size={24} />,
  style: {
    ...baseStyle,
    background: '#bae6fd',
  },
};
