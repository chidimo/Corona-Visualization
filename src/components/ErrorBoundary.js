import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
  state = {
    error: '',
    hasError: false,
    errRetryMax: 1,
    errRetries: Number(localStorage.getItem('errRetries')) || 0,
  };

  // during initialization, errRetries is set on state
  // as it mounts, it is reset to 0
  // once component catches an error, it reloads and
  // takes the previously saved state and increments it.
  // this continues till the threshold is reached.

  componentDidMount() {
    localStorage.setItem('errRetries', 0);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.log({ error, info });

    const { errRetries, errRetryMax } = this.state;
    if (errRetries < errRetryMax) {
      localStorage.setItem('errRetries', errRetries + 1);
      window.location.reload();
    } else {
      Sentry.withScope((scope) => {
        scope.setExtras(info);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error__boundary--parent">
          <div className="error__boundary--body">
            <p>
              Please{' '}
              <span
                style={{ cursor: 'pointer', color: '#0077FF' }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                refresh
              </span>{' '}
              your browser and make sure you have a working internet connection.
            </p>
            <p>
              We would appreciate some feedback on this issue. It will only take
              a minute. Just click the button below to access the form.
            </p>
            <button
              className="btn btn-edit"
              onClick={() =>
                Sentry.showReportDialog({ eventId: this.state.eventId })
              }
            >
              Send feedback
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
};

export { ErrorBoundary };
