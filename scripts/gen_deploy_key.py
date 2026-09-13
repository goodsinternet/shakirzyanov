#!/usr/bin/env python3
"""Регенерация deploy-ключа: публичная часть через штатный кодировщик
cryptography (Encoding.OpenSSH), без комментария. Приватный ключ проверяется
через paramiko (как его будет читать dulwich)."""
from pathlib import Path
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization

BASE = Path("/home/z/my-project/.ssh")
PRIV = BASE / "deploy_ed25519"
PUB = BASE / "deploy_ed25519.pub"

key = Ed25519PrivateKey.generate()

priv_pem = key.private_bytes(
    serialization.Encoding.PEM,
    serialization.PrivateFormat.OpenSSH,
    serialization.NoEncryption(),
)
pub_line = key.public_key().public_bytes(
    serialization.Encoding.OpenSSH,
    serialization.PublicFormat.OpenSSH,
).decode().strip()

BASE.mkdir(parents=True, exist_ok=True)
PRIV.write_bytes(priv_pem)
PUB.write_text(pub_line + "\n")
PRIV.chmod(0o600)

# Самопроверка 1: paramiko читает приватный ключ
import paramiko
pkey = paramiko.Ed25519Key.from_private_key_file(str(PRIV))
fingerprint = pkey.get_fingerprint().hex()
print("paramiko loads private key: OK, fingerprint md5:", fingerprint)

# Самопроверка 2: публичная строка парсится обратно
import base64, struct
b64 = pub_line.split()[1]
blob = base64.b64decode(b64 + "=" * (-len(b64) % 3))
n = struct.unpack(">I", blob[:4])[0]
t = blob[4:4 + n]
print("type:", t.decode(), "| raw len:", struct.unpack(">I", blob[4+n:8+n])[0])
print("PUBLIC KEY:")
print(pub_line)
