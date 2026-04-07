#!/usr/bin/env python3
"""
Simple HTTP Server for Engagement Invitation Website

This script serves the engagement invitation website locally.
Run this script and open http://localhost:8000 in your browser.

Requirements:
- Python 3.x

Usage:
    python server.py

Or make it executable and run:
    chmod +x server.py
    ./server.py
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with better error handling"""

    def do_GET(self):
        """Handle GET requests"""
        try:
            # Call parent method to handle the request
            super().do_GET()
        except Exception as e:
            self.send_error(500, f"Internal Server Error: {str(e)}")

    def log_message(self, format, *args):
        """Override logging to be more informative"""
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), format % args))

def main():
    """Main function to start the server"""
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()

    # Change to the script directory
    os.chdir(script_dir)

    # Set up the server
    port = 8000
    handler = CustomHTTPRequestHandler

    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print("╔══════════════════════════════════════════════════════════════╗")
            print("║                 🎉 ENGAGEMENT INVITATION 🎉                  ║")
            print("╠══════════════════════════════════════════════════════════════╣")
            print(f"║ Server started at: http://localhost:{port}                   ║")
            print("║                                                              ║")
            print("║ 📁 Serving files from:                                       ║")
            print(f"║    {script_dir}                                              ║")
            print("║                                                              ║")
            print("║ 🎵 Background music will autoplay (allow in browser)        ║")
            print("║ ✨ Animated background effects enabled                       ║")
            print("║ ⏰ Live countdown timers active                               ║")
            print("║                                                              ║")
            print("║ Press Ctrl+C to stop the server                              ║")
            print("╚══════════════════════════════════════════════════════════════╝")

            # Start serving
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
        sys.exit(0)

    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python server.py (uses port 8000)")
            print(f"   Or run: python -m http.server 8080")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()