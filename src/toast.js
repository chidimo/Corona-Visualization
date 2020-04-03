import { toast } from 'react-toastify';
import { css } from 'glamor';

export default {
  // Keep the signature of the original toast object
  // Doing so you can pass additionnal options
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
      className: 'toast-success-container',
      progressClassName: css({
        background: '#34A853',
      }),
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      autoClose: 8000,
      className: 'toast-error-container',
      progressClassName: css({
        background: '#EE0022',
      }),
    });
  },
  warn(msg, options = {}) {
    return toast.warn(msg, {
      ...options,
      className: 'toast-warn-container',
      progressClassName: css({
        background: '#ffc107',
      }),
    });
  },
  info(msg, options = {}) {
    return toast.info(msg, {
      ...options,
      className: 'toast-info-container',
      progressClassName: css({
        background: '#17a2b8',
      }),
    });
  },
};
