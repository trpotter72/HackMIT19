xvfb-run python3 ./flask/server.py &
sudo iptables -t nat -A PREROUTING -p tcp -j REDIRECT --dport 80 --to-port 1200
sudo iptables-save
cd ./stake-together
npm run build
serve -s build -l 1200 &
