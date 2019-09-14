sudo iptables -t nat -A PREROUTING -p tcp -j REDIRECT --dport 80 --to-port 5000
sudo iptables-save
export FLASK_APP=server.py
python3 server.py
