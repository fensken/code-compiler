import { useState, useEffect, useRef } from "react";

const WS_URL = process.env.WS_URL!;

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [output, setOutput] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      wsRef.current = new WebSocket(WS_URL);

      wsRef.current.onopen = () => {
        setIsConnected(true);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data);
          if (
            response.type === "stdout" ||
            response.type === "stderr" ||
            response.type === "error"
          ) {
            setOutput((prev) => prev + response.data);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
        setTimeout(connectWebSocket, 3000);
      };

      wsRef.current.onerror = () => {
        setOutput((prev) => prev + "WebSocket error occurred\n");
      };
    };

    connectWebSocket();
    return () => wsRef.current?.close();
  }, []);

  const sendMessage = (payload: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(payload));
      } catch (error) {
        console.error("Error sending WebSocket message:", error);
      }
    } else {
      setOutput((prev) => prev + "WebSocket connection not available\n");
    }
  };

  return { isConnected, output, setOutput, sendMessage };
}
