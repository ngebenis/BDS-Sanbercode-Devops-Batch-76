# Panduan Setup Sistem Operasi Ubuntu 24.04  dan Swap File

## 1. Login ke Server via SSH
ssh root@165.22.54.66

---

## 2. Update Repository
apt update

## 3. Upgrade Package
apt upgrade -y

### Output (contoh):
Restarting services...
 systemctl restart cron.service

Service restarts being deferred:
 /etc/needrestart/restart.d/dbus.service
 systemctl restart getty@tty1.service
 systemctl restart serial-getty@ttyS0.service
 systemctl restart systemd-logind.service
 systemctl restart unattended-upgrades.service


## 4. Cek Swap File
free -h

### Contoh Output:
               total        used        free      shared  buff/cache   available
Mem:           458Mi       185Mi        47Mi       4.0Mi       250Mi       273Mi
Swap:             0B          0B          0B


## 5. Membuat Swap File

### a. Buat file swap 2GB
fallocate -l 2G /swapfile

### b. Set permission
chmod 600 /swapfile

### c. Format sebagai swap
mkswap /swapfile

### d. Aktifkan swap
swapon /swapfile

## 6. Membuat Swap Permanen

Edit file:
vi /etc/fstab

Tambahkan baris berikut:
/swapfile none swap sw 0 0

Simpan file `/etc/fstab`.

## 7. Verifikasi Swap
free -h

### Contoh Output:
              total        used        free      shared  buff/cache   available
Mem:          458Mi       163Mi        66Mi       4.0Mi       252Mi       294Mi
Swap:          2.0Gi         0B       2.0Gi

## 8. Selesai

Swap file telah berhasil dibuat dan diaktifkan secara permanen.
