import http.server
import socketserver
import os
import sys
import subprocess

# Ensure UTF-8 output on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

HOST = "127.0.0.1"
PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class DualStackServer(socketserver.TCPServer):
    allow_reuse_address = True

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def open_in_chrome(url):
    chrome_paths = [
        os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%LocalAppData%\Google\Chrome\Application\chrome.exe"),
        "chrome"
    ]
    for path in chrome_paths:
        try:
            subprocess.Popen([path, url])
            print(f"  [✓] Successfully launched Chrome with {url}")
            return
        except Exception:
            continue

    try:
        import webbrowser
        webbrowser.open(url)
    except Exception as e:
        print(f"  [-] Could not open browser: {e}")

def run_server():
    selected_port = PORT
    for attempt_port in range(PORT, PORT + 20):
        try:
            httpd = DualStackServer((HOST, attempt_port), Handler)
            selected_port = attempt_port
            break
        except OSError:
            continue
    else:
        print(f"[-] Could not bind to any port near {PORT}")
        sys.exit(1)

    url = f"http://127.0.0.1:{selected_port}/index.html"
    print("=" * 65)
    print("  ABID SIDDIQUI — RESUME & PORTFOLIO LOCAL SERVER")
    print(f"  Direct URL:  {url}")
    print(f"  Directory:   {DIRECTORY}")
    print("=" * 65)
    print("  Server is live. Press Ctrl+C to stop.")

    open_in_chrome(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer shutting down...")
        httpd.server_close()
        sys.exit(0)

if __name__ == "__main__":
    run_server()
