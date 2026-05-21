import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="detail-page" role="alert">
          <h1>Something went wrong.</h1>
          <p>Please refresh the page or return home.</p>
          <a className="button dark" href="/">Back home</a>
        </main>
      );
    }

    return this.props.children;
  }
}
