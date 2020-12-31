import React from 'react';

export default class IfOnline extends React.Component {
  constructor(props) {
    super(props)
    this.state = { onLine: navigator ? navigator.onLine : true }
  }

  componentDidMount() {
    if( ! window ) return

    window.addEventListener('online', this.goOnline)
    window.addEventListener('offline', this.goOffline)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.goOnline)
    window.removeEventListener('offline', this.goOffline)
  }

  goOnline = () => this.setState({ onLine: true })
  goOffline = () => this.setState({ onLine: false })

  render() {
    const { children } = this.props
    const { onLine } = this.state

    if( onLine ) return null

    return <span>{ children }</span>
  }
}




// Usage with Hooks

// import React, { memo, useState, useEffect } from "react";

// const IsOffline = ({ children }) => {
//   const [online, setOnline] = useState(navigator ? navigator.onLine : true);

//   useEffect(() => {
//     if (!window) return;

//     window.addEventListener("online", goOnline);
//     window.addEventListener("offline", goOffline);

//     return () => {
//       window.removeEventListener("online", goOnline);
//       window.removeEventListener("offline", goOffline);
//     };
//   });

//   function goOnline() {
//     setOnline(true);
//   }

//   function goOffline() {
//     setOnline(false);
//   }

//   if (online) {
//     return null;
//   }

//   return <span>{children}</span>;
// };

// export default memo(IsOffline);