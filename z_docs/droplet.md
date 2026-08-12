# Digital Ocean droplet hosting docs
- Created droplet on personal card 8/11/2026

## SSH
- Generated ~/_local/.ssh/eob (ln to ~/.ssh/eob) and .pub on 8/11/2026
`ssh -i ~/.ssh/eob root@143.198.164.170`

## User: eob
- scripts/startup adds a user so don't have to login with root
`ssh -i ~/.ssh/eob eob@143.198.164.170`

## Docker
- Installed 8/11/2026
```
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl status docker
```